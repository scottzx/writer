import { useEffect, useMemo, useRef, useState } from "react"
import { Bot, Image, Loader2, Mic, Send, Trash2 } from "lucide-react"
import { useStore } from "../../stores"
import { storageService } from "../../services/storageService"
import type { ChatMessage as ChatMessageType } from "../../types/notes"
import { SlashCommandMenu } from "../chat/SlashCommandMenu"
import type { SlashCommand } from "../../types/writing"

// Helper to get headers with user ID
function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  const ucid = localStorage.getItem("newsnow-ucid")
  if (ucid) {
    headers["X-User-ID"] = ucid
  }

  const jwt = localStorage.getItem("jwt")
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`
  }

  return headers
}

export function ChatPanel({ noteId }: { noteId: string }) {
  const { editor, addChatMessage, clearChatMessages } = useStore()
  const set = useStore.setState
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentMessageId, setCurrentMessageId] = useState<string | null>(null)
  const messages = useMemo(() => editor.chatMessages[noteId] || [], [editor.chatMessages, noteId])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Slash command menu state
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ bottom: 0, left: 0 })

  const handleClearConversation = () => {
    clearChatMessages(noteId)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)

    // Show slash menu when typing "/" at the beginning
    if (value === "/") {
      const rect = inputRef.current?.getBoundingClientRect()
      if (rect) {
        // 使用 bottom 定位，让菜单从输入框顶部向上生长
        const viewportHeight = window.innerHeight
        setMenuPosition({
          bottom: viewportHeight - rect.top + 8, // 菜单底部在输入框顶部上方 8px
          left: rect.left,
        })
        setShowSlashMenu(true)
      }
    } else if (showSlashMenu && !value.startsWith("/")) {
      setShowSlashMenu(false)
    }
  }

  const handleSlashCommandSelect = (command: SlashCommand) => {
    const prefix = `/${command.id}`
    setInput(`${prefix} `)
    setShowSlashMenu(false)
    inputRef.current?.focus()
  }

  // 检测输入是否包含斜杠命令
  const detectSlashCommand = (input: string): { isCommand: boolean, commandId?: string, cleanMessage?: string } => {
    const trimmedInput = input.trim()

    // 检查是否以斜杠命令开头
    const parts = trimmedInput.split(" ")
    const commandId = parts[0]?.slice(1) // Remove leading /
    const cleanMessage = parts.slice(1).join(" ")

    if (trimmedInput.startsWith("/") && commandId) {
      return { isCommand: true, commandId, cleanMessage }
    }

    return { isCommand: false }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input
    addChatMessage(noteId, "user", userMessage)
    setInput("")
    setIsLoading(true)

    try {
      // 从 store 获取当前对话历史
      const currentMessages = editor.chatMessages[noteId] || []

      // 检测是否是斜杠命令
      const { isCommand, commandId, cleanMessage } = detectSlashCommand(userMessage)

      // 构建请求参数
      const requestBody: any = {
        conversationHistory: currentMessages,
      }

      if (isCommand && commandId) {
        // 是斜杠命令
        requestBody.commandId = commandId
        if (cleanMessage) {
          requestBody.message = cleanMessage
        }
      } else {
        // 普通消息
        requestBody.message = userMessage
      }

      const response = await fetch("/api/writing-chat", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        try {
          const errorData = await response.json()
          if (errorData.error || errorData.message) {
            errorMessage = errorData.message || errorData.error
          }
        } catch {
          // If response is not JSON, use status text
        }
        throw new Error(errorMessage)
      }

      // 处理流式响应
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ""
      let messageId: string | null = null

      // 创建助手消息并获取其 ID
      const newMessageId = crypto.randomUUID()
      const newMessage: ChatMessageType = {
        id: newMessageId,
        noteId,
        role: "assistant" as const,
        content: "",
        timestamp: Date.now(),
      }

      // 直接更新状态，避免异步问题
      set(state => ({
        editor: {
          ...state.editor,
          chatMessages: {
            ...state.editor.chatMessages,
            [noteId]: [...(state.editor.chatMessages[noteId] || []), newMessage],
          },
        },
      }))
      messageId = newMessageId
      setCurrentMessageId(newMessageId)

      if (reader) {
        let buffer = ""

        while (true) {
          const { done, value } = await reader.read()

          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split("\n")
          buffer = lines.pop() || ""

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)

              if (data === "[DONE]") {
                break
              }

              try {
                const parsed = JSON.parse(data)

                // 处理错误
                if (parsed.error) {
                  throw new Error(parsed.error)
                }

                // 更新消息内容
                if (parsed.chunk && messageId) {
                  assistantMessage += parsed.chunk

                  // 直接更新状态，避免频繁写入 localStorage
                  set(state => ({
                    editor: {
                      ...state.editor,
                      chatMessages: {
                        ...state.editor.chatMessages,
                        [noteId]: state.editor.chatMessages[noteId]?.map(msg =>
                          msg.id === messageId ? { ...msg, content: assistantMessage } : msg,
                        ) || [],
                      },
                    },
                  }))
                }
              } catch (e) {
                console.error("Failed to parse SSE data:", e, data)
              }
            }
          }
        }

        // 流结束后，保存到 localStorage
        const finalMessages = useStore.getState().editor.chatMessages
        storageService.saveChatMessages(finalMessages)
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMsg = error instanceof Error ? error.message : "未知错误"
      addChatMessage(
        noteId,
        "assistant",
        `抱歉，发生了错误：${errorMsg}`,
      )
    } finally {
      setIsLoading(false)
      setCurrentMessageId(null)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !showSlashMenu) {
      e.preventDefault()
      handleSend()
    } else if (e.key === "Escape" && showSlashMenu) {
      setShowSlashMenu(false)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-full bg-surfaceHighlight">
      {/* AI 助手标题 */}
      <div className="p-4 border-b border-border">
        <div className="bg-gradient-to-br from-surface to-[#0d1518] border border-border rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <h3 className="text-white text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                AI 写作助手
              </h3>
              <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-bold uppercase">
                已激活
              </span>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearConversation}
                  className="p-1 rounded hover:bg-white/10 text-textSecondary hover:text-white transition-colors"
                  title="清空对话"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
          <p className="text-xs text-textSecondary relative z-10">
            帮助您优化写作风格和内容。
          </p>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0
          ? (
              <div className="text-center text-textSecondary text-sm mt-8">
                <Bot size={32} className="mx-auto mb-2 opacity-50" />
                <p>开始与 AI 写作助手对话...</p>
                <p className="text-xs mt-1 opacity-70">
                  询问如何改进文章、获取写作建议等
                </p>
              </div>
            )
          : (
              messages.map(msg => (
                <ChatMessageItem key={msg.id} message={msg} />
              ))
            )}
        {isLoading && !currentMessageId && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-primary/20">
              <Loader2 size={18} className="text-primary animate-spin" />
            </div>
            <div className="border rounded-lg p-3 max-w-[80%] bg-surface border-border">
              <p className="text-sm text-textSecondary">正在思考...</p>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* 输入区域 */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="relative mb-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="输入 / 选择命令，或直接提问..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            disabled={isLoading}
            className="w-full bg-background border border-border rounded-lg py-3 pl-4 pr-10 text-sm text-white placeholder-textSecondary focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-1 text-textSecondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading
              ? (
                  <Loader2 size={16} className="animate-spin" />
                )
              : (
                  <Send size={16} />
                )}
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              type="button"
              className="p-1.5 rounded hover:bg-background text-textSecondary hover:text-white transition-colors"
              title="语音输入(开发中)"
              disabled
            >
              <Mic size={16} />
            </button>
            <button
              type="button"
              className="p-1.5 rounded hover:bg-background text-textSecondary hover:text-white transition-colors"
              title="图片上传(开发中)"
              disabled
            >
              <Image size={16} />
            </button>
          </div>
          <span className="text-[10px] text-textSecondary">
            Claude Sonnet 4.5
          </span>
        </div>
      </div>

      {/* Slash Command Menu */}
      {showSlashMenu && (
        <SlashCommandMenu
          onSelect={handleSlashCommandSelect}
          onClose={() => setShowSlashMenu(false)}
          position={menuPosition}
        />
      )}
    </div>
  )
}

function ChatMessageItem({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user"

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
        isUser ? "bg-indigo-500/20" : "bg-primary/20"
      }`}
      >
        {isUser
          ? (
              <span className="text-xs font-bold text-indigo-400">ME</span>
            )
          : (
              <Bot size={18} className="text-primary" />
            )}
      </div>
      <div className={`border rounded-lg p-3 max-w-[80%] ${
        isUser
          ? "bg-indigo-500/10 border-indigo-500/20 rounded-tr-none"
          : "bg-surface border-border rounded-tl-none"
      }`}
      >
        <p className="text-sm text-white whitespace-pre-wrap">{message.content}</p>
        <span className="text-[10px] text-textSecondary mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  )
}

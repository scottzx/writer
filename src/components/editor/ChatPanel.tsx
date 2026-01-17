import { useEffect, useMemo, useRef, useState } from "react"
import { Bot, Image, Loader2, Mic, Send } from "lucide-react"
import { useStore } from "../../stores"
import { storageService } from "../../services/storageService"
import type { ChatMessage as ChatMessageType } from "../../types/notes"

export function ChatPanel({ noteId }: { noteId: string }) {
  const { editor, addChatMessage } = useStore()
  const set = useStore.setState
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentMessageId, setCurrentMessageId] = useState<string | null>(null)
  const messages = useMemo(() => editor.chatMessages[noteId] || [], [editor.chatMessages, noteId])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input
    addChatMessage(noteId, "user", userMessage)
    setInput("")
    setIsLoading(true)

    try {
      // 调用 API（Agent SDK 会自动管理会话上下文）
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noteId,
          message: userMessage,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
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
      addChatMessage(
        noteId,
        "assistant",
        "抱歉，发生了错误。请稍后再试。",
      )
    } finally {
      setIsLoading(false)
      setCurrentMessageId(null)
    }
  }

  return (
    <div className="flex flex-col h-full bg-surfaceHighlight">
      {/* AI 助手标题 */}
      <div className="p-4 border-b border-border">
        <div className="bg-gradient-to-br from-surface to-[#0d1518] border border-border rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 relative z-10">
            <h3 className="text-white text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              AI 写作助手
            </h3>
            <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-bold uppercase">
              已激活
            </span>
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
            type="text"
            placeholder="询问 AI 写作助手..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
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

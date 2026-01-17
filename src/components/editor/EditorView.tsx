import { useStore } from "../../stores"
import { RichTextEditor } from "./RichTextEditor"
import { DocumentOutline } from "./DocumentOutline"
import { ChatPanel } from "./ChatPanel"

export function EditorView({ noteId }: { noteId: string }) {
  const { editor, updateNote } = useStore()
  const activeNote = editor.notes.find(n => n.id === noteId)

  if (!activeNote) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-white text-lg mb-2">笔记不存在</p>
          <p className="text-textSecondary text-sm">请选择其他笔记或创建新笔记</p>
        </div>
      </div>
    )
  }

  const handleContentChange = (html: string) => {
    // 计算字数(移除 HTML 标签)
    const textContent = html.replace(/<[^>]*>/g, "")
    const wordCount = textContent.length

    updateNote(noteId, {
      content: html,
      wordCount,
      updatedAt: Date.now(),
    })
  }

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* 左侧: 文档大纲 */}
      <div className="w-64 bg-surface border-r border-border hidden lg:flex flex-col">
        <DocumentOutline content={activeNote.content} />
      </div>

      {/* 中间: 编辑器 */}
      <div className="flex-1 flex flex-col">
        <RichTextEditor
          content={activeNote.content}
          onChange={handleContentChange}
          placeholder="开始写作..."
        />
      </div>

      {/* 右侧: AI 聊天面板 */}
      <div className="w-80 border-l border-border flex flex-col">
        <ChatPanel noteId={noteId} />
      </div>
    </div>
  )
}

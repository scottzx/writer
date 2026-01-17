import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import CharacterCount from "@tiptap/extension-character-count"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import { Bold, Image as ImageIcon, Italic, Link as LinkIcon, List, ListOrdered, Redo, Underline, Undo } from "lucide-react"

export function RichTextEditor({
  content,
  onChange,
  placeholder = "开始写作...",
}: {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        // Exclude default Link extension to avoid duplicate
        link: false,
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
      CharacterCount,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline hover:text-primaryHover cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[500px] px-4 py-3",
      },
    },
  })

  if (!editor) return null

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
  }: {
    onClick: () => void
    isActive?: boolean
    children: React.ReactNode
    title?: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        isActive ? "bg-primary text-background" : "hover:bg-border text-textSecondary hover:text-white"
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="flex flex-col h-full bg-background">
      {/* 工具栏 */}
      <div className="border-b border-border bg-surface p-2 flex gap-1 items-center flex-wrap">
        {/* 标题按钮 */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
          title="一级标题"
        >
          <span className="font-bold text-sm px-2">H1</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          title="二级标题"
        >
          <span className="font-bold text-sm px-2">H2</span>
        </ToolbarButton>

        <div className="w-px h-4 bg-border mx-1" />

        {/* 格式化按钮 */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="粗体"
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="斜体"
        >
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="删除线"
        >
          <Underline size={16} />
        </ToolbarButton>

        <div className="w-px h-4 bg-border mx-1" />

        {/* 列表按钮 */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="无序列表"
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="有序列表"
        >
          <ListOrdered size={16} />
        </ToolbarButton>

        <div className="w-px h-4 bg-border mx-1" />

        {/* 链接和图片 */}
        <ToolbarButton
          onClick={() => {
            // TODO: Replace with custom modal dialog
            const url = ""
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
          isActive={editor.isActive("link")}
          title="插入链接"
        >
          <LinkIcon size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            // TODO: Replace with custom modal dialog
            const url = ""
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          }}
          title="插入图片"
        >
          <ImageIcon size={16} />
        </ToolbarButton>

        <div className="w-px h-4 bg-border mx-1" />

        {/* 撤销/重做 */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="撤销"
        >
          <Undo size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="重做"
        >
          <Redo size={16} />
        </ToolbarButton>
      </div>

      {/* 编辑区域 */}
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      {/* 状态栏 */}
      <div className="border-t border-border bg-surface px-4 py-2 text-xs text-textSecondary flex justify-between">
        <span>
          {editor.storage.characterCount.characters()}
          {" "}
          字符
        </span>
        <span>
          {editor.storage.characterCount.words()}
          {" "}
          词
        </span>
      </div>
    </div>
  )
}

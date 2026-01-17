import { Clock, FileText, Layout, Plus, Search } from "lucide-react"
import { useStore } from "../../stores"
import type { Note } from "../../types/notes"

export function ProjectList({ onSelect }: { onSelect: (id: string) => void }) {
  const { editor, setSearchQuery, setFilterStatus, deleteNote } = useStore()
  const { notes, searchQuery, filterStatus } = editor

  // 过滤和搜索逻辑
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || note.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDelete = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation()
    // TODO: Replace with custom modal dialog
    // For now, just delete without confirmation
    deleteNote(noteId)
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">项目笔记库</h1>
            <p className="text-textSecondary">集中管理您的所有创作项目与文稿。</p>
          </div>
          <button
            type="button"
            onClick={() => onSelect("new")}
            className="bg-primary hover:bg-primaryHover text-background px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            {" "}
            新建文档
          </button>
        </div>

        {/* 搜索和过滤 */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
            <input
              type="text"
              placeholder="搜索笔记..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2 text-white placeholder-textSecondary focus:border-primary focus:outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as any)}
            className="bg-surface border border-border rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
          >
            <option value="all">全部状态</option>
            <option value="draft">草稿</option>
            <option value="writing">撰写中</option>
            <option value="reviewed">已审阅</option>
            <option value="published">已发布</option>
          </select>
        </div>

        {/* 笔记卡片网格 */}
        {filteredNotes.length === 0
          ? (
              <div className="text-center py-16">
                <FileText size={48} className="text-textSecondary mx-auto mb-4" />
                <p className="text-textSecondary text-lg mb-2">暂无笔记</p>
                <p className="text-textSecondary text-sm">点击"新建文档"开始创作</p>
              </div>
            )
          : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map(note => (
                  <NoteCard key={note.id} note={note} onSelect={onSelect} onDelete={handleDelete} />
                ))}
              </div>
            )}
      </div>
    </div>
  )
}

function NoteCard({
  note,
  onSelect,
  onDelete,
}: {
  note: Note
  onSelect: (id: string) => void
  onDelete: (e: React.MouseEvent, id: string) => void
}) {
  const statusConfig = {
    draft: { label: "草稿", className: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
    writing: { label: "撰写中", className: "bg-primary/10 text-primary border-primary/20" },
    reviewed: { label: "已审阅", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    published: { label: "已发布", className: "bg-green-500/10 text-green-400 border-green-500/20" },
  }

  const config = statusConfig[note.status]

  return (
    <div
      onClick={() => onSelect(note.id)}
      className="bg-surface border border-border hover:border-primary/50 rounded-xl p-5 cursor-pointer group transition-all hover:bg-surfaceHighlight/50 relative"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center">
          <FileText size={20} className="text-white" />
        </div>
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${config.className}`}>
          {config.label}
        </span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
        {note.title}
      </h3>
      {note.content && (
        <p className="text-sm text-textSecondary line-clamp-2 mb-4">
          {note.content.replace(/<[^>]*>/g, "").substring(0, 100)}
        </p>
      )}
      <div className="flex items-center justify-between text-xs text-textSecondary mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {" "}
            {new Date(note.updatedAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Layout size={12} />
            {" "}
            {note.wordCount}
            {" "}
            字
          </span>
        </div>
        <button
          type="button"
          onClick={e => onDelete(e, note.id)}
          className="opacity-0 group-hover:opacity-100 text-textSecondary hover:text-red-400 transition-all"
          title="删除笔记"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

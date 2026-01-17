import { useMemo, useState } from "react"
import { ChevronDown, ChevronRight, File, Folder, FolderOpen, Search } from "lucide-react"
import { useStore } from "../../stores"
import type { Note } from "../../types/notes"

/**
 * 文件树组件
 * 显示文件夹和笔记的层级结构
 */
export function FileTree() {
  const { editor } = useStore()
  const { notes, folders, activeNoteId } = editor
  const [searchQuery, setSearchQuery] = useState("")

  // 构建树形结构
  const treeData = useMemo(() => {
    // 过滤笔记
    const filteredNotes = searchQuery
      ? notes.filter(note =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : notes

    // 按文件夹分组
    const folderMap = new Map<string | null, Note[]>()
    filteredNotes.forEach((note) => {
      const key = note.folderId || null
      if (!folderMap.has(key)) {
        folderMap.set(key, [])
      }
      folderMap.get(key)!.push(note)
    })

    // 获取根级笔记
    const rootNotes = folderMap.get(null) || []

    // 构建文件夹树
    const rootFolders = folders.filter(f => !f.parentId)

    return {
      rootNotes,
      rootFolders: rootFolders.map(folder => ({
        folder,
        notes: folderMap.get(folder.id) || [],
        subfolders: buildSubtree(folder.id, folders, folderMap),
      })),
    }
  }, [notes, folders, searchQuery, buildSubtree])

  // 辅助函数:递归构建子树
  function buildSubtree(
    parentId: string,
    allFolders: typeof folders,
    notesMap: Map<string | null, Note[]>,
  ) {
    const childFolders = allFolders.filter(f => f.parentId === parentId)
    return childFolders.map(folder => ({
      folder,
      notes: notesMap.get(folder.id) || [],
      subfolders: buildSubtree(folder.id, allFolders, notesMap),
    }))
  }

  return (
    <div className="flex flex-col h-full">
      {/* 搜索框 */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
          <input
            type="text"
            placeholder="搜索笔记..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-lg py-2 pl-9 pr-3 text-sm text-white placeholder-textSecondary focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* 文件树内容 */}
      <div className="flex-1 overflow-y-auto p-2">
        {/* 根级笔记 */}
        {treeData.rootNotes.length > 0 && (
          <div className="mb-2">
            {treeData.rootNotes.map(note => (
              <NoteNode
                key={note.id}
                note={note}
                isActive={note.id === activeNoteId}
                level={0}
              />
            ))}
          </div>
        )}

        {/* 文件夹 */}
        {treeData.rootFolders.map(item => (
          <FolderTreeItem
            key={item.folder.id}
            folder={item.folder}
            notes={item.notes}
            subfolders={item.subfolders}
            level={0}
            activeNoteId={activeNoteId}
          />
        ))}

        {/* 空状态 */}
        {notes.length === 0 && (
          <div className="text-center text-textSecondary text-sm py-8">
            <p>还没有笔记</p>
            <p className="text-xs mt-1">点击下方按钮创建第一个笔记</p>
          </div>
        )}

        {/* 搜索无结果 */}
        {searchQuery && treeData.rootNotes.length === 0 && treeData.rootFolders.length === 0 && (
          <div className="text-center text-textSecondary text-sm py-8">
            没有找到匹配的笔记
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 笔记节点组件
 */
function NoteNode({ note, isActive, level }: { note: Note, isActive: boolean, level: number }) {
  const { setActiveNote } = useStore()

  const handleClick = () => {
    setActiveNote(note.id)
  }

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors
        hover:bg-surfaceHighlight group
        ${isActive ? "bg-primary/20 text-white" : "text-textSecondary hover:text-white"}
      `}
      style={{ marginLeft: `${level * 16}px` }}
    >
      <File size={16} className="shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{note.title}</div>
        <div className="text-xs text-textSecondary truncate">
          {new Date(note.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

/**
 * 文件夹树项组件
 */
function FolderTreeItem({
  folder,
  notes,
  subfolders,
  level,
  activeNoteId,
}: {
  folder: { id: string, name: string }
  notes: Note[]
  subfolders: { id: string, name: string }[]
  level: number
  activeNoteId: string | null
}) {
  const { editor, toggleFolder } = useStore()
  const isExpanded = editor.expandedFolders.has(folder.id)

  const handleToggle = () => {
    toggleFolder(folder.id)
  }

  return (
    <div className="mb-1">
      {/* 文件夹标题 */}
      <div
        onClick={handleToggle}
        className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors hover:bg-surfaceHighlight group"
        style={{ marginLeft: `${level * 16}px` }}
      >
        {isExpanded
          ? (
              <ChevronDown size={16} className="shrink-0 text-textSecondary" />
            )
          : (
              <ChevronRight size={16} className="shrink-0 text-textSecondary" />
            )}
        {isExpanded
          ? (
              <FolderOpen size={16} className="shrink-0 text-primary" />
            )
          : (
              <Folder size={16} className="shrink-0 text-textSecondary" />
            )}
        <span className="flex-1 text-sm font-medium truncate">{folder.name}</span>
        <span className="text-xs text-textSecondary">
          {notes.length + subfolders.length}
        </span>
      </div>

      {/* 文件夹内容 */}
      {isExpanded && (
        <div className="mt-0.5">
          {/* 笔记 */}
          {notes.map(note => (
            <NoteNode
              key={note.id}
              note={note}
              isActive={note.id === activeNoteId}
              level={level + 1}
            />
          ))}

          {/* 子文件夹 */}
          {subfolders.map(subfolder => (
            <FolderTreeItem
              key={subfolder.folder.id}
              folder={subfolder.folder}
              notes={subfolder.notes}
              subfolders={subfolder.subfolders}
              level={level + 1}
              activeNoteId={activeNoteId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

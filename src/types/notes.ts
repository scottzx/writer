// 笔记状态类型
export type NoteStatus = "draft" | "writing" | "reviewed" | "published"
export type MessageRole = "user" | "assistant" | "system"

// 笔记数据结构
export interface Note {
  id: string
  title: string
  content: string // HTML 富文本内容
  folderId: string | null
  tags: string[]
  status: NoteStatus
  wordCount: number
  createdAt: number
  updatedAt: number
  lastAutoSave: number | null
}

// 文件夹结构
export interface Folder {
  id: string
  name: string
  parentId: string | null
  createdAt: number
  icon?: string
  color?: string
}

// 聊天消息
export interface ChatMessage {
  id: string
  noteId: string
  role: MessageRole
  content: string
  timestamp: number
}

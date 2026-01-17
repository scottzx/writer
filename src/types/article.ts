// 文章类型定义
export interface Article {
  id: string
  title: string
  content: string // HTML 内容
  fileType: "md" | "docx"
  wordCount: number
  createdAt: number
  updatedAt: number
}

// 聊天请求接口
export interface ChatRequest {
  message: string
  conversationHistory?: ChatMessage[] // 新增：可选的对话历史
}

// 聊天消息接口
export interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp?: number
}

// 聊天响应接口
export interface ChatResponseChunk {
  chunk: string
}

// 错误响应接口
export interface ErrorResponse {
  error: string
  message?: string
}

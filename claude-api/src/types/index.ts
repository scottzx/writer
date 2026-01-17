// 聊天请求接口
export interface ChatRequest {
  message: string
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

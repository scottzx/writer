import { getClaudeAgentService } from "../services/claude-agent-service"

interface ChatRequest {
  noteId: string
  message: string
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event) as ChatRequest
    const { noteId, message } = body

    // 验证请求
    if (!noteId || !message || typeof message !== "string") {
      throw createError({
        statusCode: 400,
        message: "Invalid request: noteId and message are required",
      })
    }

    // 设置 SSE 响应头
    setResponseHeaders(event, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    })

    // 获取 Agent 服务
    const agentService = getClaudeAgentService()

    // 发送消息并流式响应
    const stream = agentService.sendMessage(message)

    // 发送流式数据
    for await (const chunk of stream) {
      event.node.res.write(`data: ${JSON.stringify({ chunk })}\n\n`)
    }

    // 发送结束标记
    event.node.res.write("data: [DONE]\n\n")
    event.node.res.end()
  } catch (error: any) {
    console.error("Chat API error:", error)

    // 如果还未发送响应头，返回错误 JSON
    if (!event.node.res.headersSent) {
      throw createError({
        statusCode: 500,
        message: error.message || "Internal server error",
      })
    } else {
      // 否则通过 SSE 发送错误
      event.node.res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`)
      event.node.res.end()
    }
  }
})

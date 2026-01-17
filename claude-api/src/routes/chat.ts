import { type Request, type Response, Router } from "express"
import { getClaudeAgentService } from "../services/claude-agent.service.js"
import type { ChatRequest } from "../types/index.js"
import logger from "../utils/logger.js"

const router: Router = Router()

/**
 * POST /chat
 * 聊天接口，使用 SSE 流式响应
 */
router.post("/chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body as ChatRequest

    // 验证请求
    if (!message || typeof message !== "string") {
      res.status(400).json({
        error: "Invalid request",
        message: "message field is required and must be a string",
      })
      return
    }

    logger.info("Chat request received", { messageLength: message.length })

    // 设置 SSE 响应头
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")
    res.setHeader("X-Accel-Buffering", "no") // 禁用 Nginx 缓冲

    // 获取 Agent 服务
    const agentService = getClaudeAgentService()

    // 发送消息并流式响应
    const stream = agentService.sendMessage(message)

    // 发送流式数据
    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify({ chunk })}\n\n`)
    }

    // 发送结束标记
    res.write("data: [DONE]\n\n")
    res.end()

    logger.info("Chat response completed")
  } catch (error: any) {
    logger.error("Chat API error:", error)

    // 如果还未发送响应头，返回错误 JSON
    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal server error",
        message: error.message || "An unexpected error occurred",
      })
    } else {
      // 否则通过 SSE 发送错误
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`)
      res.end()
    }
  }
})

export default router

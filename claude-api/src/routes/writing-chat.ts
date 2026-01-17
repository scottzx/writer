import { type Request, type Response, Router } from "express"
import { getWritingAgentService } from "../services/writing-agent.service.js"
import { getEventExportService } from "../services/event-export.service.js"
import type { ChatMessage, EventDetails } from "../../../src/types/writing.js"
import logger from "../utils/logger.js"

interface RequestBody {
  workflowId?: string
  eventData?: EventDetails
  commandId?: string
  message?: string
  conversationHistory: ChatMessage[]
}

const router: Router = Router()

/**
 * POST /api/writing-chat
 * 写作聊天接口，支持斜杠命令和普通聊天
 */
router.post("/writing-chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as RequestBody

    // 首次交互时保存事件数据（如果提供了）
    if (body.workflowId && body.eventData) {
      const exportService = getEventExportService()
      await exportService.saveEventDetails(body.workflowId, body.eventData)
    }

    logger.info("Writing chat request received", {
      workflowId: body.workflowId,
      hasEventData: !!body.eventData,
      hasCommandId: !!body.commandId,
      hasMessage: !!body.message,
      historyLength: body.conversationHistory.length,
    })

    // 设置 SSE 响应头
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")
    res.setHeader("X-Accel-Buffering", "no")

    const agentService = getWritingAgentService()
    let stream: AsyncGenerator<string>

    if (body.commandId) {
      // 执行斜杠命令
      stream = agentService.executeCommand(
        body.commandId,
        body.eventData,
        body.conversationHistory,
      )
    } else if (body.message) {
      // 普通聊天
      stream = agentService.chat(
        body.message,
        body.eventData,
        body.conversationHistory,
      )
    } else {
      res.status(400).json({ error: "Invalid request" })
      return
    }

    // 流式响应
    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify({ chunk })}\n\n`)
    }

    res.write("data: [DONE]\n\n")
    res.end()

    logger.info("Writing chat response completed")
  } catch (error: any) {
    logger.error("Writing chat API error:", error)

    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal server error",
        message: error.message,
      })
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`)
      res.end()
    }
  }
})

export default router

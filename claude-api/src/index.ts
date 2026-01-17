import express, { type Express } from "express"
import { config } from "dotenv"
import { requestLogger } from "./middleware/requestLogger.js"
import { corsMiddleware } from "./middleware/cors.js"
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js"
import chatRouter from "./routes/chat.js"
import logger from "./utils/logger.js"

// 加载环境变量
config()

const app: Express = express()
const PORT = process.env.PORT || 3001

// 中间件
app.use(corsMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)

// 健康检查端点
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// API 路由
app.use("/api", chatRouter)

// 404 处理
app.use(notFoundHandler)

// 错误处理
app.use(errorHandler)

// 启动服务器
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
  logger.info(`Environment: ${process.env.NODE_ENV || "development"}`)
  logger.info(`Health check: http://localhost:${PORT}/health`)
})

// 优雅关闭
process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received: closing HTTP server")
  process.exit(0)
})

process.on("SIGINT", () => {
  logger.info("SIGINT signal received: closing HTTP server")
  process.exit(0)
})

export default app

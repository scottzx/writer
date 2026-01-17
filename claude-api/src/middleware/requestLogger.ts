import type { NextFunction, Request, Response } from "express"
import logger from "../utils/logger.js"

/**
 * 请求日志中间件
 */
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now()

  // 记录请求
  logger.info("Incoming request", {
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
  })

  // 记录响应
  res.on("finish", () => {
    const duration = Date.now() - start
    logger.info("Request completed", {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    })
  })

  next()
}

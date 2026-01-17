import type { NextFunction, Request, Response } from "express"
import logger from "../utils/logger.js"

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

/**
 * 全局错误处理中间件
 */
export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  logger.error("Error occurred:", {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  })

  res.status(statusCode).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "production" ? message : err.stack,
  })
}

/**
 * 404 处理中间件
 */
export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    error: "Not found",
    message: `Route ${req.method} ${req.path} not found`,
  })
}

import { Buffer } from "node:buffer"
import type { NextFunction, Response } from "express"

/**
 * 用户 ID 中间件
 * 从请求头中提取 X-User-ID 或 JWT，并注入到 req.user
 */
export function userIdMiddleware(req: any, res: Response, next: NextFunction): void {
  // 先检查 JWT Authorization header
  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith("Bearer ")) {
    // TODO: 验证 JWT 并提取用户信息
    // 这里简化处理，实际应该验证 JWT 签名
    // 暂时从 JWT 中提取用户 ID
    try {
      const token = authHeader.substring(7)
      const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString())
      if (payload.sub) {
        req.user = { id: payload.sub }
        return next()
      }
    } catch {
      // JWT 验证失败，继续检查 X-User-ID
    }
  }

  // 检查 X-User-ID header
  const userIdHeader = req.headers["x-user-id"]

  if (userIdHeader && typeof userIdHeader === "string") {
    // Accept format: user_<UUID> where UUID can contain hyphens
    const isValidUserId = /^user_[\w-]+$/.test(userIdHeader)

    if (isValidUserId) {
      req.user = { id: userIdHeader }
      return next()
    }
  }

  // 如果都没有，返回 401
  res.status(401).json({
    error: "Unauthorized",
    message: "User ID not found. Provide X-User-ID header or valid JWT token",
  })
}

export default userIdMiddleware

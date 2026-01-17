import process from "node:process"
import { jwtVerify } from "jose"

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  if (!url.pathname.startsWith("/api")) return

  // 检查是否配置了登录功能
  const hasLoginConfig = ["JWT_SECRET", "G_CLIENT_ID", "G_CLIENT_SECRET"].every(k => process.env[k])

  if (!hasLoginConfig) {
    // 未配置登录功能，标记为禁用
    event.context.disabledLogin = true
    return
  }

  // 已配置登录功能，验证 JWT
  if (["/api/s", "/api/me"].find(p => url.pathname.startsWith(p))) {
    const token = getHeader(event, "Authorization")?.replace(/Bearer\s*/, "")?.trim()
    if (token) {
      try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET)) as { payload?: { id: string, type: string } }
        if (payload?.id) {
          event.context.user = {
            id: payload.id,
            type: payload.type,
          }
        }
      } catch {
        if (url.pathname.startsWith("/api/me"))
          throw createError({ statusCode: 401, message: "JWT verification failed" })
        else logger.warn("JWT verification failed")
      }
    } else if (url.pathname.startsWith("/api/me")) {
      throw createError({ statusCode: 401, message: "JWT verification failed" })
    }
  }
})

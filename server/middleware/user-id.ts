/**
 * 用户ID中间件
 * 从请求头中提取用户ID并注入到事件上下文中
 */
export default defineEventHandler((event) => {
  // 跳过非API请求
  const url = getRequestURL(event)
  if (!url.pathname.startsWith("/api")) return

  // 从请求头获取用户ID
  const userId = getHeader(event, "X-User-ID")

  if (userId) {
    // 验证用户ID格式
    const isValidUserId = /^user_\w+$/.test(userId)

    if (isValidUserId) {
      // 注入用户上下文
      event.context.user = {
        id: userId,
        type: "anonymous",
      }
    }
  }
})

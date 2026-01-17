import cors from "cors"

/**
 * CORS 配置
 */
export const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || "*", // 生产环境应设置具体域名
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
})

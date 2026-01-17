import winston from "winston"

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  defaultMeta: { service: "claude-writing-assistant" },
  transports: [
    // 控制台输出
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          let msg = `${timestamp} [${level}]: ${message}`
          if (Object.keys(meta).length > 0) {
            msg += ` ${JSON.stringify(meta)}`
          }
          return msg
        }),
      ),
    }),
  ],
})

// 生产环境添加文件日志
if (process.env.NODE_ENV === "production") {
  logger.add(new winston.transports.File({ filename: "logs/error.log", level: "error" }))
  logger.add(new winston.transports.File({ filename: "logs/combined.log" }))
}

export default logger

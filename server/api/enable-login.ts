import process from "node:process"

export default defineEventHandler(async () => {
  const hasLoginConfig = process.env.G_CLIENT_ID && process.env.G_CLIENT_SECRET && process.env.JWT_SECRET

  return {
    enable: !!hasLoginConfig,
    url: hasLoginConfig
      ? `https://github.com/login/oauth/authorize?client_id=${process.env.G_CLIENT_ID}`
      : null,
  }
})

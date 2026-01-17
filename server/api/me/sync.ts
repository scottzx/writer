import process from "node:process"
import { UserTable } from "#/database/user"
import { db as cloudBaseDb, isCloudBaseEnabled } from "#/database/cloudbase-adapter"

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.user
    // 根据环境选择数据库实例
    const db = isCloudBaseEnabled() ? cloudBaseDb : useDatabase()
    const userTable = new UserTable(db)
    if (process.env.INIT_TABLE !== "false") await userTable.init()
    if (event.method === "GET") {
      const { data, updated } = await userTable.getData(id)
      return {
        data: data ? JSON.parse(data) : undefined,
        updatedTime: updated,
      }
    } else if (event.method === "POST") {
      const body = await readBody(event)
      verifyPrimitiveMetadata(body)
      const { updatedTime, data } = body
      await userTable.setData(id, JSON.stringify(data), updatedTime)
      return {
        success: true,
        updatedTime,
      }
    }
  } catch (e) {
    logger.error(e)
    throw createError({
      statusCode: 500,
      message: e instanceof Error ? e.message : "Internal Server Error",
    })
  }
})

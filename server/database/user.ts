import type { Database, type RdbClient, isCloudBaseEnabled } from "./cloudbase-adapter"
import type { UserInfo } from "#/types"

export class UserTable {
  private db: Database | RdbClient
  private useCloudBase: boolean

  constructor(db: Database | RdbClient) {
    this.db = db
    this.useCloudBase = isCloudBaseEnabled()
  }

  async init() {
    if (this.useCloudBase) {
      // MySQL 表已在外部通过 MCP 工具创建
      logger.success(`init user table (CloudBase MySQL)`)
      return
    }

    // SQLite 模式：创建表
    await (this.db as Database).prepare(`
      CREATE TABLE IF NOT EXISTS user (
        id TEXT PRIMARY KEY,
        email TEXT,
        data TEXT,
        type TEXT,
        created INTEGER,
        updated INTEGER
      );
    `).run()
    await (this.db as Database).prepare(`
      CREATE INDEX IF NOT EXISTS idx_user_id ON user(id);
    `).run()
    logger.success(`init user table`)
  }

  async addUser(id: string, email: string, type: "github") {
    const u = await this.getUser(id)
    const now = Date.now()

    if (this.useCloudBase) {
      // CloudBase MySQL: 使用 Supabase 风格 API
      if (!u) {
        const { error } = await (this.db as RdbClient)
          .from("user")
          .insert({ id, email, data: "", type, created: now, updated: now })
        if (error) throw new Error(`add user ${id} failed: ${error.message}`)
        logger.success(`add user ${id}`)
      } else if (u.email !== email && u.type !== type) {
        const { error } = await (this.db as RdbClient)
          .from("user")
          .update({ email, updated: now })
          .eq("id", id)
        if (error) throw new Error(`update user ${id} failed: ${error.message}`)
        logger.success(`update user ${id} email`)
      } else {
        logger.info(`user ${id} already exists`)
      }
    } else {
      // SQLite 模式：使用 SQL
      if (!u) {
        await (this.db as Database).prepare(`INSERT INTO user (id, email, data, type, created, updated) VALUES (?, ?, ?, ?, ?, ?)`).run(id, email, "", type, now, now)
        logger.success(`add user ${id}`)
      } else if (u.email !== email && u.type !== type) {
        await (this.db as Database).prepare(`UPDATE user SET email = ?, updated = ? WHERE id = ?`).run(email, now, id)
        logger.success(`update user ${id} email`)
      } else {
        logger.info(`user ${id} already exists`)
      }
    }
  }

  async getUser(id: string): Promise<UserInfo | undefined> {
    if (this.useCloudBase) {
      // CloudBase MySQL: 使用 Supabase 风格 API
      const { data, error } = await (this.db as RdbClient)
        .from("user")
        .select("id, email, data, created, updated")
        .eq("id", id)
        .single()
      if (error) {
        if (error.message.includes("fetch")) return undefined
        throw new Error(`get user ${id} failed: ${error.message}`)
      }
      return data as UserInfo
    } else {
      // SQLite 模式
      return await (this.db as Database).prepare(`SELECT id, email, data, created, updated FROM user WHERE id = ?`).get(id) as UserInfo
    }
  }

  async setData(key: string, value: string, updatedTime = Date.now()) {
    if (this.useCloudBase) {
      // CloudBase MySQL: 使用 Supabase 风格 API
      const { error } = await (this.db as RdbClient)
        .from("user")
        .update({ data: value, updated: updatedTime })
        .eq("id", key)
      if (error) throw new Error(`set user ${key} data failed: ${error.message}`)
    } else {
      // SQLite 模式
      const state = await (this.db as Database).prepare(
        `UPDATE user SET data = ?, updated = ? WHERE id = ?`,
      ).run(value, updatedTime, key)
      if (!state.success) throw new Error(`set user ${key} data failed`)
    }
    logger.success(`set ${key} data`)
  }

  async getData(id: string) {
    if (this.useCloudBase) {
      // CloudBase MySQL: 使用 Supabase 风格 API
      const { data, error } = await (this.db as RdbClient)
        .from("user")
        .select("data, updated")
        .eq("id", id)
        .single()
      if (error || !data) throw new Error(`user ${id} not found: ${error?.message}`)
      logger.success(`get ${id} data`)
      return { data: data.data as string, updated: data.updated as number }
    } else {
      // SQLite 模式
      const row: any = await (this.db as Database).prepare(`SELECT data, updated FROM user WHERE id = ?`).get(id)
      if (!row) throw new Error(`user ${id} not found`)
      logger.success(`get ${id} data`)
      return row as {
        data: string
        updated: number
      }
    }
  }

  async deleteUser(key: string) {
    if (this.useCloudBase) {
      // CloudBase MySQL: 使用 Supabase 风格 API
      const { error } = await (this.db as RdbClient)
        .from("user")
        .delete()
        .eq("id", key)
      if (error) throw new Error(`delete user ${key} failed: ${error.message}`)
    } else {
      // SQLite 模式
      const state = await (this.db as Database).prepare(`DELETE FROM user WHERE id = ?`).run(key)
      if (!state.success) throw new Error(`delete user ${key} failed`)
    }
    logger.success(`delete user ${key}`)
  }
}

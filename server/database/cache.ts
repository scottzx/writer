import process from "node:process"
import type { NewsItem } from "@shared/types"
import type { CacheInfo, CacheRow } from "../types"
import type { Database, type RdbClient, db as cloudBaseDb, isCloudBaseEnabled } from "./cloudbase-adapter"

export class Cache {
  private db: Database | RdbClient
  private useCloudBase: boolean

  constructor(db: Database | RdbClient) {
    this.db = db
    this.useCloudBase = isCloudBaseEnabled()
  }

  async init() {
    if (this.useCloudBase) {
      // MySQL 表已在外部通过 MCP 工具创建
      logger.success(`init cache table (CloudBase MySQL)`)
      return
    }

    // SQLite 模式：创建表
    await (this.db as Database).prepare(`
      CREATE TABLE IF NOT EXISTS cache (
        id TEXT PRIMARY KEY,
        updated INTEGER,
        data TEXT
      );
    `).run()
    logger.success(`init cache table`)
  }

  async set(key: string, value: NewsItem[]) {
    const now = Date.now()

    if (this.useCloudBase) {
      // CloudBase MySQL: 使用 Supabase 风格 API
      // 先检查是否存在
      const { data: existing } = await (this.db as RdbClient)
        .from("cache")
        .select("id")
        .eq("id", key)
        .single()

      if (existing) {
        // 存在则更新
        const { error } = await (this.db as RdbClient)
          .from("cache")
          .update({ data: JSON.stringify(value), updated: now })
          .eq("id", key)
        if (error) throw new Error(`set ${key} cache failed: ${error.message}`)
      } else {
        // 不存在则插入
        const { error } = await (this.db as RdbClient)
          .from("cache")
          .insert({ id: key, data: JSON.stringify(value), updated: now })
        if (error) throw new Error(`set ${key} cache failed: ${error.message}`)
      }
    } else {
      // SQLite 模式
      await (this.db as Database).prepare(
        `INSERT OR REPLACE INTO cache (id, data, updated) VALUES (?, ?, ?)`,
      ).run(key, JSON.stringify(value), now)
    }
    logger.success(`set ${key} cache`)
  }

  async get(key: string): Promise<CacheInfo | undefined> {
    if (this.useCloudBase) {
      // CloudBase MySQL: 使用 Supabase 风格 API
      const { data, error } = await (this.db as RdbClient)
        .from("cache")
        .select("id, data, updated")
        .eq("id", key)
        .single()
      if (error) {
        if (error.message.includes("fetch")) return undefined
        throw new Error(`get ${key} cache failed: ${error.message}`)
      }
      if (!data) return undefined
      logger.success(`get ${key} cache`)
      return {
        id: data.id,
        updated: data.updated,
        items: JSON.parse(data.data),
      }
    } else {
      // SQLite 模式
      const row = (await (this.db as Database).prepare(`SELECT id, data, updated FROM cache WHERE id = ?`).get(key)) as CacheRow | undefined
      if (row) {
        logger.success(`get ${key} cache`)
        return {
          id: row.id,
          updated: row.updated,
          items: JSON.parse(row.data),
        }
      }
    }
    return undefined
  }

  async getEntire(keys: string[]): Promise<CacheInfo[]> {
    if (this.useCloudBase) {
      // CloudBase MySQL: 使用 Supabase 风格 API 的 in() 方法
      const { data, error } = await (this.db as RdbClient)
        .from("cache")
        .select("id, data, updated")
        .in("id", keys)

      if (error) throw new Error(`get entire cache failed: ${error.message}`)

      if (data && data.length > 0) {
        logger.success(`get entire (...) cache`)
        return data.map((row: any) => ({
          id: row.id,
          updated: row.updated,
          items: JSON.parse(row.data) as NewsItem[],
        }))
      }
      return []
    } else {
      // SQLite 模式
      const keysStr = keys.map(k => `id = '${k}'`).join(" or ")
      const res = await (this.db as Database).prepare(`SELECT id, data, updated FROM cache WHERE ${keysStr}`).all()
      const rows = (res as any).results ?? res

      if (rows?.length) {
        logger.success(`get entire (...) cache`)
        return rows.map((row: any) => ({
          id: row.id,
          updated: row.updated,
          items: JSON.parse(row.data) as NewsItem[],
        }))
      }
      return []
    }
  }

  async delete(key: string) {
    if (this.useCloudBase) {
      // CloudBase MySQL: 使用 Supabase 风格 API
      const { error } = await (this.db as RdbClient)
        .from("cache")
        .delete()
        .eq("id", key)
      if (error) throw new Error(`delete ${key} cache failed: ${error.message}`)
    } else {
      // SQLite 模式
      return await (this.db as Database).prepare(`DELETE FROM cache WHERE id = ?`).run(key)
    }
  }
}

export async function getCacheTable() {
  try {
    if (process.env.CLOUDBASE_ENV_ID) {
      // CloudBase 模式
      if (process.env.ENABLE_CACHE === "false") return
      const cacheTable = new Cache(cloudBaseDb)
      if (process.env.INIT_TABLE !== "false") await cacheTable.init()
      return cacheTable
    }

    // SQLite 模式使用 Nitro database
    const sqliteDb = useDatabase()
    if (process.env.ENABLE_CACHE === "false") return
    const cacheTable = new Cache(sqliteDb)
    if (process.env.INIT_TABLE !== "false") await cacheTable.init()
    return cacheTable
  } catch (e) {
    logger.error("failed to init database ", e)
  }
}

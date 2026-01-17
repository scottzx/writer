/**
 * CloudBase MySQL 数据库适配器
 * 使用 @cloudbase/node-sdk 的 rdb() 方法访问 MySQL 数据库
 * API 风格为 Supabase 风格（链式调用）
 */

import process from "node:process"
import cloudbase from "@cloudbase/node-sdk"
import type { Database } from "db0"

// CloudBase 环境配置
const CLOUDBASE_ENV_ID = process.env.CLOUDBASE_ENV_ID || "dreammate-0grv5fzr79f3b0e0"

// 初始化 CloudBase 应用（同步，不要用动态 import）
const app = cloudbase.init({
  env: CLOUDBASE_ENV_ID,
})

// Supabase 风格的查询构建器类型
interface QueryBuilder {
  eq: (column: string, value: any) => QueryBuilder & {
    single: () => Promise<{ data?: any, error?: { message: string } }>
  }
  in: (column: string, values: any[]) => Promise<{ data?: any[], error?: { message: string } }>
  single: () => Promise<{ data?: any, error?: { message: string } }>
}

interface UpdateBuilder {
  eq: (column: string, value: any) => Promise<{ error?: { message: string } }>
}

interface DeleteBuilder {
  eq: (column: string, value: any) => Promise<{ error?: { message: string } }>
}

interface TableBuilder {
  select: (columns?: string) => QueryBuilder
  insert: (data: any) => Promise<{ error?: { message: string } }>
  update: (data: any) => UpdateBuilder
  delete: () => DeleteBuilder
}

// CloudBase rdb() 返回类型（Supabase 风格）
export interface RdbClient {
  from: (table: string) => TableBuilder
}

/**
 * CloudBase Relational Database 客户端
 * 使用 Supabase 风格的 API
 */
export const db = (app as any).rdb() as any

/**
 * 判断是否使用 CloudBase
 */
export function isCloudBaseEnabled(): boolean {
  return !!process.env.CLOUDBASE_ENV_ID
}

// 导出 Database 类型供其他文件使用
export type { Database }

import { projectFileSystem } from "../services/fileSystem.js"
import type { Note } from "../../../src/types/notes"

/**
 * 项目管理API
 * GET /api/projects - 获取用户所有项目列表
 * POST /api/projects - 创建新项目
 */
export default defineEventHandler(async (event) => {
  // 获取用户ID (从middleware注入)
  const userId = event.context.user?.id

  if (!userId) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized: User ID not found",
    })
  }

  // 验证用户ID格式
  const isValidUserId = /^user_\w+$/.test(userId)
  if (!isValidUserId) {
    throw createError({
      statusCode: 400,
      message: "Invalid user ID format",
    })
  }

  const method = event.method

  try {
    if (method === "GET") {
      // 获取用户所有项目
      const projects = await projectFileSystem.listProjects(userId)
      return {
        success: true,
        data: projects,
      }
    }

    if (method === "POST") {
      // 创建新项目
      const body = await readBody(event)

      // 验证请求体
      if (!body || typeof body !== "object") {
        throw createError({
          statusCode: 400,
          message: "Invalid request body",
        })
      }

      // 生成项目ID
      const projectId = body.id || crypto.randomUUID()

      // 创建笔记对象
      const newNote: Note = {
        id: projectId,
        title: body.title || "未命名文档",
        content: body.content || "",
        folderId: body.folderId || null,
        tags: body.tags || [],
        status: body.status || "draft",
        wordCount: body.wordCount || 0,
        createdAt: body.createdAt || Date.now(),
        updatedAt: body.updatedAt || Date.now(),
        lastAutoSave: body.lastAutoSave || null,
      }

      // 验证projectId格式
      if (!/^[a-f0-9-]+$/.test(projectId)) {
        throw createError({
          statusCode: 400,
          message: "Invalid project ID format",
        })
      }

      // 检查项目是否已存在
      if (projectFileSystem.projectExists(userId, projectId)) {
        throw createError({
          statusCode: 409,
          message: "Project already exists",
        })
      }

      // 创建项目
      await projectFileSystem.createProject(userId, projectId, newNote)

      return {
        success: true,
        data: newNote,
      }
    }

    // 不支持的HTTP方法
    throw createError({
      statusCode: 405,
      message: "Method not allowed",
    })
  } catch (error: any) {
    // 如果是已经处理的错误,直接抛出
    if (error.statusCode) {
      throw error
    }

    // 记录未处理的错误
    console.error("Projects API error:", error)

    throw createError({
      statusCode: 500,
      message: error.message || "Internal server error",
    })
  }
})

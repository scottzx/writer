import { projectFileSystem } from "../../services/fileSystem.js"

/**
 * 单个项目API
 * GET /api/projects/:id - 获取单个项目
 * PUT /api/projects/:id - 更新项目
 * DELETE /api/projects/:id - 删除项目
 */
export default defineEventHandler(async (event) => {
  // 获取用户ID
  const userId = event.context.user?.id

  if (!userId) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized: User ID not found",
    })
  }

  // 获取项目ID
  const projectId = getRouterParam(event, "id")

  if (!projectId) {
    throw createError({
      statusCode: 400,
      message: "Project ID is required",
    })
  }

  // 验证ID格式
  if (!/^[a-f0-9-]+$/.test(projectId)) {
    throw createError({
      statusCode: 400,
      message: "Invalid project ID format",
    })
  }

  const method = event.method

  try {
    if (method === "GET") {
      // 获取单个项目
      const project = await projectFileSystem.readProject(userId, projectId)

      if (!project) {
        throw createError({
          statusCode: 404,
          message: "Project not found",
        })
      }

      return {
        success: true,
        data: project,
      }
    }

    if (method === "PUT") {
      // 更新项目
      const body = await readBody(event)

      if (!body || typeof body !== "object") {
        throw createError({
          statusCode: 400,
          message: "Invalid request body",
        })
      }

      // 检查项目是否存在
      if (!projectFileSystem.projectExists(userId, projectId)) {
        throw createError({
          statusCode: 404,
          message: "Project not found",
        })
      }

      // 更新项目
      await projectFileSystem.updateProject(userId, projectId, body)

      return {
        success: true,
        data: { id: projectId, ...body },
      }
    }

    if (method === "DELETE") {
      // 删除项目
      if (!projectFileSystem.projectExists(userId, projectId)) {
        throw createError({
          statusCode: 404,
          message: "Project not found",
        })
      }

      await projectFileSystem.deleteProject(userId, projectId)

      return {
        success: true,
        message: "Project deleted successfully",
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
    console.error("Project API error:", error)

    throw createError({
      statusCode: 500,
      message: error.message || "Internal server error",
    })
  }
})

import { type Request, type Response, Router } from "express"
import { getFileSystemService } from "../services/file-system.service.js"
import logger from "../utils/logger.js"

const router = Router()

/**
 * GET /api/projects
 * 列出用户的所有项目
 */
router.get("/projects", async (req: Request, res: Response): Promise<void> => {
  try {
    // 从请求中获取用户 ID（由中间件注入）
    const userId = (req as any).user?.id

    if (!userId) {
      res.status(401).json({
        error: "Unauthorized",
        message: "User ID not found in request",
      })
      return
    }

    // 验证用户 ID 格式
    const isValidUserId = /^user_\w+$/.test(userId)
    if (!isValidUserId) {
      res.status(400).json({
        error: "Invalid user ID format",
        message: "User ID must match pattern: user_<uuid>",
      })
      return
    }

    logger.info(`Listing projects for user: ${userId}`)

    // 获取文件系统服务
    const fileSystemService = getFileSystemService()

    // 列出所有项目
    const projects = await fileSystemService.listProjects(userId)

    res.json({
      success: true,
      data: projects,
    })
  } catch (error: any) {
    logger.error("Failed to list projects:", error)
    res.status(500).json({
      error: "Failed to list projects",
      message: error.message || "Internal server error",
    })
  }
})

/**
 * POST /api/projects
 * 创建新项目
 */
router.post("/projects", async (req: Request, res: Response): Promise<void> => {
  try {
    // 从请求中获取用户 ID
    const userId = (req as any).user?.id

    if (!userId) {
      res.status(401).json({
        error: "Unauthorized",
        message: "User ID not found in request",
      })
      return
    }

    // 验证用户 ID 格式
    const isValidUserId = /^user_\w+$/.test(userId)
    if (!isValidUserId) {
      res.status(400).json({
        error: "Invalid user ID format",
        message: "User ID must match pattern: user_<uuid>",
      })
      return
    }

    const { id, title, content, folderId, tags, status, wordCount, createdAt, updatedAt } = req.body

    // 验证必需字段
    if (!title || typeof title !== "string") {
      res.status(400).json({
        error: "Invalid request",
        message: "title is required and must be a string",
      })
      return
    }

    // 生成项目 ID（如果没有提供）
    const projectId = id || `project_${Date.now()}`

    logger.info(`Creating project: ${projectId} for user: ${userId}`)

    // 获取文件系统服务
    const fileSystemService = getFileSystemService()

    // 创建项目
    await fileSystemService.createProject(userId, projectId, {
      id: projectId,
      title,
      content: content || "",
      folderId: folderId || null,
      tags: tags || [],
      status: status || "draft",
      wordCount: wordCount || 0,
      createdAt: createdAt || Date.now(),
      updatedAt: updatedAt || Date.now(),
      lastAutoSave: null,
    })

    res.status(201).json({
      success: true,
      data: {
        id: projectId,
        title,
        status,
        createdAt: Date.now(),
      },
    })
  } catch (error: any) {
    logger.error("Failed to create project:", error)
    res.status(500).json({
      error: "Failed to create project",
      message: error.message || "Internal server error",
    })
  }
})

/**
 * GET /api/projects/:id
 * 获取单个项目详情
 */
router.get("/projects/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const userId = (req as any).user?.id

    if (!userId) {
      res.status(401).json({
        error: "Unauthorized",
        message: "User ID not found in request",
      })
      return
    }

    logger.info(`Getting project: ${id} for user: ${userId}`)

    const fileSystemService = getFileSystemService()

    const project = await fileSystemService.readProject(userId, id)

    if (!project) {
      res.status(404).json({
        error: "Project not found",
        message: `Project ${id} not found`,
      })
      return
    }

    res.json({
      success: true,
      data: {
        ...project.meta,
        content: project.content,
      },
    })
  } catch (error: any) {
    logger.error("Failed to get project:", error)
    res.status(500).json({
      error: "Failed to get project",
      message: error.message || "Internal server error",
    })
  }
})

/**
 * PUT /api/projects/:id
 * 更新项目
 */
router.put("/projects/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const userId = (req as any).user?.id

    if (!userId) {
      res.status(401).json({
        error: "Unauthorized",
        message: "User ID not found in request",
      })
      return
    }

    const { title, content, folderId, tags, status, wordCount, updatedAt } = req.body

    logger.info(`Updating project: ${id} for user: ${userId}`)

    const fileSystemService = getFileSystemService()

    // 读取现有项目数据
    const existingProject = await fileSystemService.readProject(userId, id)

    if (!existingProject) {
      res.status(404).json({
        error: "Project not found",
        message: `Project ${id} not found`,
      })
      return
    }

    // 合并更新
    const updatedProject = {
      ...existingProject.meta,
      ...(title && { title }),
      ...(content !== undefined && { content }),
      ...(folderId !== undefined && { folderId }),
      ...(tags && { tags }),
      ...(status && { status }),
      ...(wordCount !== undefined && { wordCount }),
      ...(updatedAt && { updatedAt: updatedAt || Date.now() }),
    }

    // 保存到文件系统
    await fileSystemService.updateProject(userId, id, updatedProject)

    res.json({
      success: true,
      data: updatedProject,
    })
  } catch (error: any) {
    logger.error("Failed to update project:", error)
    res.status(500).json({
      error: "Failed to update project",
      message: error.message || "Internal server error",
    })
  }
})

/**
 * DELETE /api/projects/:id
 * 删除项目
 */
router.delete("/projects/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const userId = (req as any).user?.id

    if (!userId) {
      res.status(401).json({
        error: "Unauthorized",
        message: "User ID not found in request",
      })
      return
    }

    logger.info(`Deleting project: ${id} for user: ${userId}`)

    const fileSystemService = getFileSystemService()

    // 检查项目是否存在
    const exists = fileSystemService.projectExists(userId, id)

    if (!exists) {
      res.status(404).json({
        error: "Project not found",
        message: `Project ${id} not found`,
      })
      return
    }

    // 删除项目
    await fileSystemService.deleteProject(userId, id)

    res.json({
      success: true,
      message: `Project ${id} deleted successfully`,
    })
  } catch (error: any) {
    logger.error("Failed to delete project:", error)
    res.status(500).json({
      error: "Failed to delete project",
      message: error.message || "Internal server error",
    })
  }
})

export default router

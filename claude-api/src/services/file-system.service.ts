import { promises as fs } from "node:fs"
import path from "node:path"
import logger from "../utils/logger.js"

/**
 * 文件系统服务 - 处理项目的文件操作
 */
export class FileSystemService {
  private basePath: string

  constructor() {
    // 设置基础路径为 ~/hacktour
    this.basePath = path.join(process.env.HOME || "", "hacktour")
  }

  /**
   * 获取用户项目根路径
   */
  private getUserProjectsPath(userId: string): string {
    return path.join(this.basePath, userId, "projects")
  }

  /**
   * 获取项目路径
   */
  private getProjectPath(userId: string, projectId: string): string {
    return path.join(this.getUserProjectsPath(userId), projectId)
  }

  /**
   * 确保目录存在
   */
  private async ensureDir(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true })
    } catch {
      // 目录已存在，忽略错误
    }
  }

  /**
   * HTML 转 Markdown
   */
  private htmlToMarkdown(html: string): string {
    return html
      .replace(/<strong>/g, "**")
      .replace(/<\/strong>/g, "**")
      .replace(/<em>/g, "*")
      .replace(/<\/em>/g, "*")
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<[^>]+(?!>|<br|<\/br>)/g, "") // 移除其他标签
      .trim()
  }

  /**
   * 创建项目
   */
  async createProject(
    userId: string,
    projectId: string,
    note: {
      id: string
      title: string
      content: string
      folderId: string | null
      tags: string[]
      status: string
      wordCount: number
      createdAt: number
      updatedAt: number
      lastAutoSave: number | null
    },
  ): Promise<void> {
    try {
      const projectPath = this.getProjectPath(userId, projectId)

      // 确保项目目录存在
      await this.ensureDir(projectPath)

      // 保存元数据
      const metaPath = path.join(projectPath, "meta.json")
      const meta = {
        id: note.id,
        title: note.title,
        folderId: note.folderId || null,
        tags: note.tags || [],
        status: note.status || "draft",
        wordCount: note.wordCount || 0,
        createdAt: note.createdAt || Date.now(),
        updatedAt: note.updatedAt || Date.now(),
        lastAutoSave: note.lastAutoSave || null,
      }
      await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), "utf-8")

      // 保存内容为 Markdown
      const contentPath = path.join(projectPath, "index.md")
      const content = this.htmlToMarkdown(note.content || "")
      await fs.writeFile(contentPath, content, "utf-8")

      logger.info(`Project created: ${projectId} for user: ${userId}`)
    } catch (error) {
      logger.error("Failed to create project:", error)
      throw error
    }
  }

  /**
   * 读取项目
   */
  async readProject(
    userId: string,
    projectId: string,
  ): Promise<{
    meta: any
    content: string
  } | null> {
    try {
      const projectPath = this.getProjectPath(userId, projectId)

      // 检查项目是否存在
      try {
        await fs.access(projectPath)
      } catch {
        return null
      }

      // 读取元数据
      const metaPath = path.join(projectPath, "meta.json")
      const metaContent = await fs.readFile(metaPath, "utf-8")
      const meta = JSON.parse(metaContent)

      // 读取内容
      const contentPath = path.join(projectPath, "index.md")
      const content = await fs.readFile(contentPath, "utf-8")

      logger.info(`Project read: ${projectId} for user: ${userId}`)
      return { meta, content }
    } catch (error) {
      logger.error("Failed to read project:", error)
      return null
    }
  }

  /**
   * 更新项目
   */
  async updateProject(
    userId: string,
    projectId: string,
    note: {
      id: string
      title: string
      content: string
      folderId: string | null
      tags: string[]
      status: string
      wordCount: number
      createdAt: number
      updatedAt: number
    },
  ): Promise<void> {
    try {
      // 创建项目本质上和创建一样，完全覆盖
      await this.createProject(userId, projectId, note)

      logger.info(`Project updated: ${projectId} for user: ${userId}`)
    } catch (error) {
      logger.error("Failed to update project:", error)
      throw error
    }
  }

  /**
   * 删除项目
   */
  async deleteProject(userId: string, projectId: string): Promise<void> {
    try {
      const projectPath = this.getProjectPath(userId, projectId)

      // 递归删除项目目录
      await fs.rm(projectPath, { recursive: true, force: true })

      logger.info(`Project deleted: ${projectId} for user: ${userId}`)
    } catch (error) {
      logger.error("Failed to delete project:", error)
      throw error
    }
  }

  /**
   * 列出用户的所有项目
   */
  async listProjects(userId: string): Promise<
    Array<{
      id: string
      title: string
      status: string
      updatedAt: number
      createdAt: number
    }>
  > {
    try {
      const projectsPath = this.getUserProjectsPath(userId)
      const dirs = await fs.readdir(projectsPath, { withFileTypes: false })

      const projects = []

      for (const dir of dirs) {
        const projectPath = path.join(projectsPath, dir)
        const metaPath = path.join(projectPath, "meta.json")

        try {
          const metaContent = await fs.readFile(metaPath, "utf-8")
          const meta = JSON.parse(metaContent)
          projects.push({
            id: meta.id,
            title: meta.title,
            status: meta.status,
            updatedAt: meta.updatedAt,
            createdAt: meta.createdAt,
          })
        } catch (error) {
          // 忽略无法读取的项目
          logger.warn(`Failed to read project ${dir}:`, error)
        }
      }

      logger.info(`Listed ${projects.length} projects for user: ${userId}`)
      return projects
    } catch (error) {
      logger.error("Failed to list projects:", error)
      throw error
    }
  }

  /**
   * 检查项目是否存在
   */
  projectExists(userId: string, projectId: string): boolean {
    try {
      const projectPath = this.getProjectPath(userId, projectId)
      fs.accessSync(projectPath)
      return true
    } catch {
      return false
    }
  }
}

// 单例模式
let fileSystemService: FileSystemService | null = null

export function getFileSystemService(): FileSystemService {
  if (!fileSystemService) {
    fileSystemService = new FileSystemService()
  }
  return fileSystemService
}

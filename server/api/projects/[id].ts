import fs from "node:fs"
import path from "node:path"
import process from "node:process"

/**
 * 文件系统项目管理服务 (内联版本,用于[id].ts)
 */
class ProjectFileSystem {
  private getBasePath(): string {
    return `${process.env.HOME}/hacktour`
  }

  private getUserProjectsPath(userId: string): string {
    return `${this.getBasePath()}/${userId}/projects`
  }

  private getProjectPath(userId: string, projectId: string): string {
    return `${this.getUserProjectsPath(userId)}/${projectId}`
  }

  private ensureDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  }

  async createProject(userId: string, projectId: string, note: any): Promise<void> {
    const projectPath = this.getProjectPath(userId, projectId)
    this.ensureDir(projectPath)

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
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2))

    // 保存内容为 Markdown
    const contentPath = path.join(projectPath, "index.md")
    const content = this.htmlToMarkdown(note.content || "")
    fs.writeFileSync(contentPath, content)
  }

  async readProject(userId: string, projectId: string): Promise<any | null> {
    const projectPath = this.getProjectPath(userId, projectId)

    if (!fs.existsSync(projectPath)) {
      return null
    }

    try {
      const metaPath = path.join(projectPath, "meta.json")
      const contentPath = path.join(projectPath, "index.md")

      const metaContent = fs.readFileSync(metaPath, "utf-8")
      const mdContent = fs.readFileSync(contentPath, "utf-8")

      const meta = JSON.parse(metaContent)

      return {
        ...meta,
        content: this.markdownToHtml(mdContent),
      }
    } catch (error) {
      console.error("Error reading project:", error)
      return null
    }
  }

  async updateProject(userId: string, projectId: string, note: any): Promise<void> {
    await this.createProject(userId, projectId, note)
  }

  async deleteProject(userId: string, projectId: string): Promise<void> {
    const projectPath = this.getProjectPath(userId, projectId)

    if (fs.existsSync(projectPath)) {
      fs.rmSync(projectPath, { recursive: true, force: true })
    }
  }

  projectExists(userId: string, projectId: string): boolean {
    const projectPath = this.getProjectPath(userId, projectId)
    return fs.existsSync(projectPath)
  }

  private htmlToMarkdown(html: string): string {
    let md = html
    md = md.replace(/<script[^>]*>.*?<\/script>/gis, "")
    md = md.replace(/<style[^>]*>.*?<\/style>/gis, "")
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
    md = md.replace(/<br\s*\/?>/gi, "\n")
    md = md.replace(/<[^>]+>/g, "")
    md = md.replace(/&nbsp;/g, " ")
    md = md.replace(/&lt;/g, "<")
    md = md.replace(/&gt;/g, ">")
    md = md.replace(/&amp;/g, "&")
    return md.trim()
  }

  private markdownToHtml(md: string): string {
    let html = md
    html = html.replace(/&/g, "&amp;")
    html = html.replace(/</g, "&lt;")
    html = html.replace(/>/g, "&gt;")
    html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>")
    html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>")
    html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>")
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>")
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>")
    html = html.replace(/\n/g, "<br />")
    return html
  }
}

const projectFileSystem = new ProjectFileSystem()

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

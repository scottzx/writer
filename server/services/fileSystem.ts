import fs from "node:fs"
import path from "node:path"
import os from "node:os"

/**
 * 文件系统项目管理服务
 * 管理用户项目的文件存储
 */
class ProjectFileSystem {
  private getBasePath(): string {
    return path.join(os.homedir(), "hacktour")
  }

  private getUserProjectsPath(userId: string): string {
    return path.join(this.getBasePath(), userId, "projects")
  }

  private getProjectPath(userId: string, projectId: string): string {
    return path.join(this.getUserProjectsPath(userId), projectId)
  }

  private ensureDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  }

  /**
   * 创建新项目
   */
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

  /**
   * 读取项目
   */
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

  /**
   * 更新项目
   */
  async updateProject(userId: string, projectId: string, note: any): Promise<void> {
    await this.createProject(userId, projectId, note)
  }

  /**
   * 删除项目
   */
  async deleteProject(userId: string, projectId: string): Promise<void> {
    const projectPath = this.getProjectPath(userId, projectId)

    if (fs.existsSync(projectPath)) {
      fs.rmSync(projectPath, { recursive: true, force: true })
    }
  }

  /**
   * 列出用户所有项目
   */
  async listProjects(userId: string): Promise<any[]> {
    const projectsPath = this.getUserProjectsPath(userId)

    if (!fs.existsSync(projectsPath)) {
      return []
    }

    try {
      const projectDirs = fs.readdirSync(projectsPath, { withFileTypes: true })
      const projects: any[] = []

      for (const dir of projectDirs) {
        if (dir.isDirectory()) {
          const project = await this.readProject(userId, dir.name)
          if (project) {
            projects.push(project)
          }
        }
      }

      // 按更新时间倒序排列
      return projects.sort((a, b) => b.updatedAt - a.updatedAt)
    } catch (error) {
      console.error("Error listing projects:", error)
      return []
    }
  }

  /**
   * 检查项目是否存在
   */
  projectExists(userId: string, projectId: string): boolean {
    const projectPath = this.getProjectPath(userId, projectId)
    return fs.existsSync(projectPath)
  }

  /**
   * HTML 转 Markdown (简化版本)
   */
  private htmlToMarkdown(html: string): string {
    let md = html

    // 移除 script 和 style 标签
    md = md.replace(/<script[^>]*>.*?<\/script>/gis, "")
    md = md.replace(/<style[^>]*>.*?<\/style>/gis, "")

    // 标题转换
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n")
    md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n\n")
    md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n\n")

    // 粗体和斜体
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")

    // 删除线
    md = md.replace(/<s[^>]*>(.*?)<\/s>/gi, "~~$1~~")
    md = md.replace(/<strike[^>]*>(.*?)<\/strike>/gi, "~~$1~~")
    md = md.replace(/<del[^>]*>(.*?)<\/del>/gi, "~~$1~~")

    // 代码块
    md = md.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, "```\n$1\n```\n\n")
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")

    // 链接
    md = md.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)")

    // 图片
    md = md.replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, "![$2]($1)")
    md = md.replace(/<img[^>]*src=["']([^"']*)["'][^>]*>/gi, "![]($1)")

    // 列表
    md = md.replace(/<ul[^>]*>/gi, "")
    md = md.replace(/<\/ul>/gi, "\n")
    md = md.replace(/<ol[^>]*>/gi, "")
    md = md.replace(/<\/ol>/gi, "\n")
    md = md.replace(/<li[^>]*>/gi, "- ")
    md = md.replace(/<\/li>/gi, "\n")

    // 段落和换行
    md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
    md = md.replace(/<br\s*\/?>/gi, "\n")
    md = md.replace(/<div[^>]*>(.*?)<\/div>/gi, "$1\n")

    // 块引用
    md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, "> $1\n\n")

    // 水平线
    md = md.replace(/<hr\s*\/?>/gi, "---\n\n")

    // 清理多余空行
    md = md.replace(/\n{3,}/g, "\n\n")

    // 移除剩余的HTML标签
    md = md.replace(/<[^>]+>/g, "")

    // 解码HTML实体
    md = md.replace(/&nbsp;/g, " ")
    md = md.replace(/&lt;/g, "<")
    md = md.replace(/&gt;/g, ">")
    md = md.replace(/&amp;/g, "&")
    md = md.replace(/&quot;/g, "\"")
    md = md.replace(/&#39;/g, "'")

    return md.trim()
  }

  /**
   * Markdown 转 HTML (简化版本)
   */
  private markdownToHtml(md: string): string {
    let html = md

    // 转义HTML特殊字符
    html = html.replace(/&/g, "&amp;")
    html = html.replace(/</g, "&lt;")
    html = html.replace(/>/g, "&gt;")

    // 代码块 (需要在其他处理之前)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")

    // 标题
    html = html.replace(/^###### (.*$)/gm, "<h6>$1</h6>")
    html = html.replace(/^##### (.*$)/gm, "<h5>$1</h5>")
    html = html.replace(/^#### (.*$)/gm, "<h4>$1</h4>")
    html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>")
    html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>")
    html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>")

    // 粗体和斜体
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>")

    // 删除线
    html = html.replace(/~~(.*?)~~/g, "<del>$1</del>")

    // 行内代码
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>")

    // 链接
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href=\"$2\">$1</a>")

    // 图片
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "<img src=\"$2\" alt=\"$1\" />")

    // 块引用
    html = html.replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")

    // 水平线
    html = html.replace(/^---$/gm, "<hr />")

    // 无序列表
    html = html.replace(/^- (.*$)/gm, "<li>$1</li>")

    // 有序列表
    html = html.replace(/^\d+\. (.*$)/gm, "<li>$1</li>")

    // 段落和换行
    html = html.replace(/\n\n/g, "</p><p>")
    html = html.replace(/\n/g, "<br />")

    // 包裹在p标签中
    html = `<p>${html}</p>`

    // 清理空p标签
    html = html.replace(/<p><\/p>/g, "")
    html = html.replace(/<p>(<h[1-6]>)/g, "$1")
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, "$1")
    html = html.replace(/<p>(<pre>)/g, "$1")
    html = html.replace(/(<\/pre>)<\/p>/g, "$1")
    html = html.replace(/<p>(<blockquote>)/g, "$1")
    html = html.replace(/(<\/blockquote>)<\/p>/g, "$1")

    return html
  }
}

export const projectFileSystem = new ProjectFileSystem()

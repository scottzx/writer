import { promises as fs } from "node:fs"
import path from "node:path"
import type { EventDetails } from "../../../src/types/writing"

/**
 * 事件导出服务 - 负责将事件数据保存为 markdown 文件
 */
export class EventExportService {
  private baseDir = "workflow-data"

  /**
   * 保存事件详情为 markdown 文件
   */
  async saveEventDetails(workflowId: string, eventData: EventDetails): Promise<string> {
    const dir = path.join(this.baseDir, workflowId)
    await fs.mkdir(dir, { recursive: true })

    const markdown = this.eventToMarkdown(eventData)
    const filePath = path.join(dir, "event.md")
    await fs.writeFile(filePath, markdown, "utf-8")

    return filePath
  }

  /**
   * 将事件详情转换为 markdown 格式
   */
  private eventToMarkdown(event: EventDetails): string {
    return `# ${event.title}

**优先级**: ${event.priority}
**状态**: ${event.status.type}

## 历史背景

${event.background}

## 关键参与者

${event.participants.map(p => `- ${p}`).join("\n")}

## 影响分析

${event.impacts.technical ? `### 技术层面\n${event.impacts.technical}\n` : ""}
${event.impacts.social ? `### 社会层面\n${event.impacts.social}\n` : ""}
${event.impacts.economic ? `### 经济层面\n${event.impacts.economic}\n` : ""}

## 事件状态

**${event.status.type}**: ${event.status.description}

## 时间线

${event.timeline.map(item => `
### ${item.year} (${item.impact === "High" ? "高" : "中"}影响力)

**${item.title}**

${item.desc}
`).join("\n")}

---
*导出时间: ${new Date().toLocaleString("zh-CN")}*
`
  }

  /**
   * 保存用户导出的内容
   */
  async saveExport(workflowId: string, filename: string, content: string): Promise<string> {
    const dir = path.join(this.baseDir, workflowId, "exports")
    await fs.mkdir(dir, { recursive: true })
    const filePath = path.join(dir, filename)
    await fs.writeFile(filePath, content, "utf-8")
    return filePath
  }
}

// 单例模式
let instance: EventExportService | null = null

export function getEventExportService(): EventExportService {
  if (!instance) {
    instance = new EventExportService()
  }
  return instance
}

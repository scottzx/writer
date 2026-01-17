import { promises as fs } from "node:fs"
import path from "node:path"
import { query } from "@anthropic-ai/claude-agent-sdk"
import type { ChatMessage, EventDetails, SlashCommand } from "../../../src/types/writing.js"
import logger from "../utils/logger.js"

/**
 * 加载 markdown 文件内容
 */
async function loadPromptFile(filename: string): Promise<string> {
  // Use __dirname-like approach for ES modules
  // The prompt folder is at the same level as src directory
  const filePath = path.join(process.cwd(), "claude-api", "prompt", filename)

  try {
    const content = await fs.readFile(filePath, "utf-8")
    logger.info(`Loaded prompt file: ${filename} from ${filePath}`)
    return content
  } catch (error) {
    logger.error(`Failed to load prompt file: ${filename} at ${filePath}`, error)
    // Return a fallback prompt if file not found
    return `# ${filename} 提示词\n\n请根据用户需求提供专业的写作建议。`
  }
}

/**
 * 5 个斜杠命令的配置（从文件加载）
 */
const SLASH_COMMANDS: SlashCommand[] = [
  {
    id: "background",
    name: "背景分析",
    icon: "🔍",
    description: "深入分析事件背景，挖掘深层信息",
    systemPrompt: "", // 将在 init 中加载
  },
  {
    id: "brief",
    name: "定角度",
    icon: "📐",
    description: "构思立场鲜明的切入角度（博弈对立版）",
    systemPrompt: "", // 将在 init 中加载
  },
  {
    id: "title",
    name: "选标题",
    icon: "📝",
    description: "生成 5 个不同风格的标题",
    systemPrompt: "", // 将在 init 中加载
  },
  {
    id: "body",
    name: "文章写作",
    icon: "✍️",
    description: "撰写完整时评文章（融合终极版）",
    systemPrompt: "", // 将在 init 中加载
  },
  {
    id: "review",
    name: "复写审阅",
    icon: "👮‍♂️",
    description: "时评守门人，残酷去油去水手术",
    systemPrompt: "", // 将在 init 中加载
  },
]

/**
 * 写作智能体服务 - 处理斜杠命令和普通聊天
 */
export class WritingAgentService {
  private isInitialized = false

  /**
   * 初始化服务（加载所有提示词文件）
   */
  private async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // 并行加载所有提示词文件
      const [
        backgroundPrompt,
        briefPrompt,
        titlePrompt,
        bodyPrompt,
        reviewPrompt,
      ] = await Promise.all([
        loadPromptFile("background.md"),
        loadPromptFile("brief.md"),
        loadPromptFile("title.md"),
        loadPromptFile("body.md"),
        loadPromptFile("review.md"),
      ])

      // 更新命令配置
      SLASH_COMMANDS[0].systemPrompt = backgroundPrompt
      SLASH_COMMANDS[1].systemPrompt = briefPrompt
      SLASH_COMMANDS[2].systemPrompt = titlePrompt
      SLASH_COMMANDS[3].systemPrompt = bodyPrompt
      SLASH_COMMANDS[4].systemPrompt = reviewPrompt

      this.isInitialized = true
      logger.info("Writing agent service initialized with all prompt files")
    } catch (error) {
      logger.error("Failed to initialize writing agent service", error)
      throw error
    }
  }

  /**
   * 确保已初始化
   */
  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize()
    }
  }

  /**
   * 执行斜杠命令
   */
  async *executeCommand(
    commandId: string,
    eventData?: EventDetails,
    conversationHistory: ChatMessage[] = [],
    message?: string,
  ): AsyncGenerator<string, void, unknown> {
    await this.ensureInitialized()

    const command = SLASH_COMMANDS.find(c => c.id === commandId)
    if (!command) throw new Error("Invalid command")

    const prompt = this.buildPromptWithContext(command, eventData, conversationHistory, message)

    logger.info("Executing writing command", { commandId, hasEventData: !!eventData, historyLength: conversationHistory.length, hasMessage: !!message })

    const q = query({
      prompt,
      options: {
        model: "claude-sonnet-4-5-20250929",
        systemPrompt: command.systemPrompt,
      },
    })

    for await (const msg of q) {
      if (msg.type === "assistant") {
        const text = msg.message.content
          .filter((block: any) => block.type === "text")
          .map((block: any) => block.text)
          .join("")
        if (text) yield text
      }
    }

    logger.info("Writing command completed", { commandId })
  }

  /**
   * 普通聊天
   */
  async *chat(
    message: string,
    eventData?: EventDetails,
    conversationHistory: ChatMessage[] = [],
  ): AsyncGenerator<string, void, unknown> {
    await this.ensureInitialized()

    // 构建包含对话历史的提示词
    let prompt = eventData
      ? "你是专业的写作助手，基于事件素材与用户进行对话交流。\n\n"
      : "你是专业的写作助手，帮助用户改进写作。\n\n"

    // 添加对话历史
    if (conversationHistory.length > 0) {
      prompt += "## 对话历史\n\n"
      // 只保留最近的5条历史，避免超出上下文窗口
      const recentHistory = conversationHistory.slice(-5)
      recentHistory.forEach((msg) => {
        prompt += `${msg.role === "user" ? "用户" : "助手"}: ${msg.content}\n\n`
      })
      prompt += "\n"
    }

    // 添加事件上下文和当前消息
    if (eventData) {
      prompt += this.formatEventContext(eventData)
      prompt += `\n\n用户消息：${message}\n\n请基于以上信息回复用户。`
    } else {
      prompt += `用户消息：${message}\n\n请提供专业的写作建议。`
    }

    const q = query({
      prompt,
      options: {
        model: "claude-sonnet-4-5-20250929",
        systemPrompt: eventData
          ? "你是专业的写作助手，基于事件素材与用户进行对话交流。"
          : "你是专业的写作助手，帮助用户改进写作风格和内容。",
      },
    })

    for await (const msg of q) {
      if (msg.type === "assistant") {
        const text = msg.message.content
          .filter((block: any) => block.type === "text")
          .map((block: any) => block.text)
          .join("")
        if (text) yield text
      }
    }
  }

  /**
   * 构建带上下文的提示词（用于命令执行）
   */
  private buildPromptWithContext(
    command: SlashCommand,
    eventData?: EventDetails,
    history: ChatMessage[] = [],
    message?: string,
  ): string {
    let prompt = `${command.systemPrompt}\n\n`

    // 添加对话历史
    if (history.length > 0) {
      prompt += "## 对话历史\n\n"
      history.slice(-5).forEach((msg) => {
        prompt += `${msg.role === "user" ? "用户" : "助手"}: ${msg.content}\n\n`
      })
      prompt += "\n"
    }

    // 添加用户补充说明（如果提供）
    if (message) {
      prompt += `## 用户要求\n\n${message}\n\n`
    }

    // 添加事件上下文（如果有）
    if (eventData) {
      prompt += this.formatEventContext(eventData)
      prompt += "\n请基于以上信息，完成你的任务。"
    } else {
      prompt += "请根据用户需求完成任务。"
    }

    return prompt
  }

  /**
   * 格式化事件上下文
   */
  private formatEventContext(event: EventDetails): string {
    return `## 事件素材

### 标题
${event.title}

### 背景
${event.background}

### 参与者
${event.participants.join(", ")}

### 时间线要点
${event.timeline.map(t => `- ${t.year}: ${t.title}`).join("\n")}
`
  }
}

// 单例模式
let instance: WritingAgentService | null = null

export function getWritingAgentService(): WritingAgentService {
  if (!instance) {
    instance = new WritingAgentService()
  }
  return instance
}

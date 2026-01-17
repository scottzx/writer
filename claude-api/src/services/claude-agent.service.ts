import { query } from "@anthropic-ai/claude-agent-sdk"
import type { ChatMessage } from "../types/index.js"

export class ClaudeAgentService {
  /**
   * 发送消息并获取流式响应
   */
  async *sendMessage(message: string, conversationHistory: ChatMessage[] = []): AsyncGenerator<string, void, unknown> {
    // 构建包含对话历史的完整提示词
    let fullPrompt = ""

    // 添加对话历史（最近5条）
    if (conversationHistory.length > 0) {
      fullPrompt += "## 对话历史\n\n"
      const recentHistory = conversationHistory.slice(-5)
      recentHistory.forEach((msg) => {
        fullPrompt += `${msg.role === "user" ? "用户" : "助手"}: ${msg.content}\n\n`
      })
      fullPrompt += "\n"
    }

    // 添加当前消息
    fullPrompt += `## 当前消息\n\n${message}`

    const q = query({
      prompt: fullPrompt,
      options: {
        model: "claude-sonnet-4-5-20250929",
        systemPrompt: this.getSystemPrompt(),
      },
    })

    // 接收流式响应
    for await (const msg of q) {
      if (msg.type === "assistant") {
        // 提取文本内容
        const text = msg.message.content
          .filter((block: any) => block.type === "text")
          .map((block: any) => block.text)
          .join("")

        if (text) {
          yield text
        }
      }
    }
  }

  /**
   * 获取系统提示词
   */
  private getSystemPrompt(): string {
    return `你是一个专业的写作助手，专门帮助用户优化时事评论文章。你的任务是：

1. **内容优化**: 帮助改进文章的表达、逻辑和结构
2. **风格建议**: 根据用户喜好提供写作风格建议
3. **事实核查**: 提醒用户注意事实准确性
4. **创意激发**: 在用户卡住时提供写作灵感

请用友好、专业的语气与用户交流，并：
- 提供具体可行的建议
- 解释你的建议理由
- 尊重用户的创作意图
- 用中文回复

如果用户询问新闻事件或需要信息，你可以建议用户使用新闻中心获取最新信息。`
  }
}

// 单例模式
let agentServiceInstance: ClaudeAgentService | null = null

export function getClaudeAgentService(): ClaudeAgentService {
  if (!agentServiceInstance) {
    agentServiceInstance = new ClaudeAgentService()
  }
  return agentServiceInstance
}

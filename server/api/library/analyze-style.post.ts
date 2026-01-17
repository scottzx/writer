import { readFileSync } from "node:fs"
import { join } from "node:path"
import { getClaudeAgentService } from "../../services/claude-agent-service"

interface AnalyzeStyleRequest {
  articles: Array<{
    title: string
    content: string
  }>
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event) as AnalyzeStyleRequest
    const { articles } = body

    if (!articles || articles.length < 10) {
      throw createError({
        statusCode: 400,
        message: "至少需要 10 篇文章才能分析写作风格",
      })
    }

    // 读取 prompt 模板
    let promptTemplate: string
    try {
      promptTemplate = readFileSync(
        join(process.cwd(), "server/prompts/writing-style-prompt.txt"),
        "utf-8",
      )
    } catch {
      // 如果文件不存在，使用内联 prompt
      promptTemplate = getDefaultPrompt()
    }

    // 准备文章内容（限制总长度避免 token 过多）
    const articlesText = articles
      .map((a, i) => `### 文章 ${i + 1}: ${a.title}\n\n${stripHtml(a.content).slice(0, 2000)}`)
      .join("\n\n---\n\n")

    const prompt = promptTemplate.replace("{articles}", articlesText)

    // 调用 Claude 分析
    const agentService = getClaudeAgentService()
    let fullResponse = ""

    for await (const chunk of agentService.sendMessageWithPrompt(prompt)) {
      fullResponse += chunk
    }

    // 解析 JSON 响应
    const jsonMatch = fullResponse.match(/```json\n?([\s\S]*?)\n?```/)
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[1])
      return result
    }

    // 如果没有 JSON 块，尝试直接解析
    try {
      return JSON.parse(fullResponse)
    } catch {
      // 返回默认结构
      return {
        summary: {
          persona: "分析完成，但未能提取结构化数据",
          syntaxRhythm: ["请重新分析"],
          lexicon: ["请重新分析"],
          tone: "待分析",
          structure: {
            opening: "待分析",
            ending: "待分析",
          },
        },
        fullAnalysis: fullResponse,
      }
    }
  } catch (error: any) {
    console.error("Writing style analysis error:", error)
    throw createError({
      statusCode: 500,
      message: error.message || "分析失败",
    })
  }
})

// 去除 HTML 标签
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim()
}

// 默认 prompt
function getDefaultPrompt(): string {
  return `你是一位精通文本分析的"法医语言学家和风格模仿大师"。请分析以下文章，提取作者的写作风格。

请返回 JSON 格式：
{
  "summary": {
    "persona": "一句话定义文风",
    "syntaxRhythm": ["句式指令1", "句式指令2"],
    "lexicon": ["用词指令1", "用词指令2"],
    "tone": "情绪基调",
    "structure": {
      "opening": "开头风格",
      "ending": "结尾风格"
    }
  },
  "fullAnalysis": "完整的风格分析 Markdown"
}

待分析文章：

{articles}`
}

/**
 * 写作助手相关类型定义
 */

export interface EventDetails {
  title: string
  priority: string
  background: string
  participants: string[]
  impacts: {
    technical?: string
    social?: string
    economic?: string
  }
  status: {
    type: string
    description: string
  }
  timeline: {
    year: string
    impact: string
    title: string
    desc: string
    active?: boolean
  }[]
}

export interface SlashCommand {
  id: string
  name: string
  icon: string
  description: string
  systemPrompt: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

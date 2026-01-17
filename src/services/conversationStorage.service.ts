/**
 * 对话队列管理服务
 * 使用 localStorage 为每个项目维护独立的对话历史
 */

import type { ChatMessage } from "../types/writing"

interface ConversationData {
  projectId: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

/**
 * 对话存储服务类
 */
class ConversationStorageService {
  private readonly STORAGE_PREFIX = "newsnow-conversations-"

  /**
   * 获取项目的对话历史
   */
  getConversation(projectId: string): ChatMessage[] {
    try {
      const key = this.STORAGE_PREFIX + projectId
      const data = localStorage.getItem(key)
      if (!data) return []
      const conversation: ConversationData = JSON.parse(data)
      return conversation.messages
    } catch (error) {
      console.error(`Failed to load conversation for ${projectId}:`, error)
      return []
    }
  }

  /**
   * 保存项目的对话历史
   */
  saveConversation(projectId: string, messages: ChatMessage[]): void {
    try {
      const key = this.STORAGE_PREFIX + projectId
      const existing = this.getConversationRaw(projectId)
      const data: ConversationData = {
        projectId,
        messages,
        createdAt: existing?.createdAt || Date.now(),
        updatedAt: Date.now(),
      }
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error(`Failed to save conversation for ${projectId}:`, error)
    }
  }

  /**
   * 向对话中添加单条消息
   */
  addMessage(projectId: string, message: ChatMessage): void {
    const messages = this.getConversation(projectId)
    messages.push(message)
    this.saveConversation(projectId, messages)
  }

  /**
   * 清空项目的对话历史
   */
  clearConversation(projectId: string): void {
    try {
      const key = this.STORAGE_PREFIX + projectId
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Failed to clear conversation for ${projectId}:`, error)
    }
  }

  /**
   * 获取所有对话的元数据
   */
  getAllConversations(): ConversationData[] {
    try {
      const conversations: ConversationData[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith(this.STORAGE_PREFIX)) {
          const data = localStorage.getItem(key)
          if (data) {
            conversations.push(JSON.parse(data))
          }
        }
      }
      return conversations.sort((a, b) => b.updatedAt - a.updatedAt)
    } catch (error) {
      console.error("Failed to load all conversations:", error)
      return []
    }
  }

  /**
   * 获取对话的原始数据（内部使用）
   */
  private getConversationRaw(projectId: string): ConversationData | null {
    try {
      const key = this.STORAGE_PREFIX + projectId
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error(`Failed to load raw conversation for ${projectId}:`, error)
      return null
    }
  }
}

// 导出单例
export const conversationStorage = new ConversationStorageService()

import type { ChatMessage, Folder, Note } from "../types/notes"
import type { Article } from "../types/article"
import type { WritingStyle } from "../types/writingStyle"

const KEYS = {
  NOTES: "newsnow-notes",
  FOLDERS: "newsnow-folders",
  CHAT_MESSAGES: "newsnow-chat-messages",
  ARTICLES: "newsnow-articles",
  WRITING_STYLE: "newsnow-writing-style",
}

export const storageService = {
  // Notes CRUD
  getNotes: (): Note[] => {
    try {
      const data = localStorage.getItem(KEYS.NOTES)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error("Failed to load notes from localStorage:", error)
      return []
    }
  },

  saveNotes: (notes: Note[]): void => {
    try {
      localStorage.setItem(KEYS.NOTES, JSON.stringify(notes))
    } catch (error) {
      console.error("Failed to save notes to localStorage:", error)
    }
  },

  // Folders CRUD
  getFolders: (): Folder[] => {
    try {
      const data = localStorage.getItem(KEYS.FOLDERS)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error("Failed to load folders from localStorage:", error)
      return []
    }
  },

  saveFolders: (folders: Folder[]): void => {
    try {
      localStorage.setItem(KEYS.FOLDERS, JSON.stringify(folders))
    } catch (error) {
      console.error("Failed to save folders to localStorage:", error)
    }
  },

  // Chat Messages CRUD
  getChatMessages: (): Record<string, ChatMessage[]> => {
    try {
      const data = localStorage.getItem(KEYS.CHAT_MESSAGES)
      return data ? JSON.parse(data) : {}
    } catch (error) {
      console.error("Failed to load chat messages from localStorage:", error)
      return {}
    }
  },

  saveChatMessages: (messages: Record<string, ChatMessage[]>): void => {
    try {
      localStorage.setItem(KEYS.CHAT_MESSAGES, JSON.stringify(messages))
    } catch (error) {
      console.error("Failed to save chat messages to localStorage:", error)
    }
  },

  // Articles CRUD
  getArticles: (): Article[] => {
    try {
      const data = localStorage.getItem(KEYS.ARTICLES)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error("Failed to load articles from localStorage:", error)
      return []
    }
  },

  saveArticles: (articles: Article[]): void => {
    try {
      localStorage.setItem(KEYS.ARTICLES, JSON.stringify(articles))
    } catch (error) {
      console.error("Failed to save articles to localStorage:", error)
    }
  },

  // Writing Style CRUD
  getWritingStyle: (): WritingStyle | null => {
    try {
      const data = localStorage.getItem(KEYS.WRITING_STYLE)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error("Failed to load writing style from localStorage:", error)
      return null
    }
  },

  saveWritingStyle: (style: WritingStyle | null): void => {
    try {
      if (style) {
        localStorage.setItem(KEYS.WRITING_STYLE, JSON.stringify(style))
      } else {
        localStorage.removeItem(KEYS.WRITING_STYLE)
      }
    } catch (error) {
      console.error("Failed to save writing style to localStorage:", error)
    }
  },
}

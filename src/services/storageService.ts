import type { ChatMessage, Folder, Note } from "../types/notes"

const KEYS = {
  NOTES: "newsnow-notes",
  FOLDERS: "newsnow-folders",
  CHAT_MESSAGES: "newsnow-chat-messages",
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
}

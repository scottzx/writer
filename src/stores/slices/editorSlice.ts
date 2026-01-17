import type { StateCreator } from "zustand"
import type { ChatMessage, Folder, Note, NoteStatus } from "../../types/notes"
import { storageService } from "../../services/storageService"
import { myFetch } from "../../utils"

export interface EditorSlice {
  editor: {
    notes: Note[]
    folders: Folder[]
    activeNoteId: string | null
    activeFolderId: string | null
    activeTab: "EDITOR" | "STYLE" | "DIFF"
    chatMessages: Record<string, ChatMessage[]>
    isChatOpen: boolean
    searchQuery: string
    filterStatus: NoteStatus | "all"
  }

  // Actions
  loadNotes: () => void
  loadFolders: () => void
  loadChatMessages: () => void
  createNote: (note: Partial<Note>) => string
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  createFolder: (name: string, parentId?: string) => string
  deleteFolder: (id: string) => void
  setActiveNote: (id: string | null) => void
  setActiveFolder: (id: string | null) => void
  setActiveTab: (tab: "EDITOR" | "STYLE" | "DIFF") => void
  addChatMessage: (noteId: string, role: ChatMessage["role"], content: string) => void
  updateChatMessage: (noteId: string, messageId: string, content: string) => void
  clearChatMessages: (noteId: string) => void
  setSearchQuery: (query: string) => void
  setFilterStatus: (status: NoteStatus | "all") => void
}

export const createEditorSlice: StateCreator<EditorSlice> = (set, _get) => ({
  editor: {
    notes: [],
    folders: [],
    activeNoteId: null,
    activeFolderId: null,
    activeTab: "EDITOR",
    chatMessages: {},
    isChatOpen: true,
    searchQuery: "",
    filterStatus: "all",
  },

  loadNotes: () => {
    const notes = storageService.getNotes()
    set(state => ({ editor: { ...state.editor, notes } }))
  },

  loadFolders: () => {
    const folders = storageService.getFolders()
    set(state => ({ editor: { ...state.editor, folders } }))
  },

  loadChatMessages: () => {
    const chatMessages = storageService.getChatMessages()
    set(state => ({ editor: { ...state.editor, chatMessages } }))
  },

  createNote: (noteData: Partial<Note>) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: noteData.title || "未命名文档",
      content: noteData.content || "",
      folderId: noteData.folderId || null,
      tags: noteData.tags || [],
      status: noteData.status || "draft",
      wordCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      lastAutoSave: null,
    }

    // 先调用文件系统 API
    myFetch("/api/projects", {
      method: "POST",
      body: newNote,
    })
      .then(() => {
        // API 成功后保存到 localStorage
        set((state) => {
          const notes = [newNote, ...state.editor.notes]
          storageService.saveNotes(notes)
          return { editor: { ...state.editor, notes } }
        })
      })
      .catch((error) => {
        // API 失败，阻止操作并显示错误
        console.error("Failed to create project in file system:", error)
        throw error
      })

    return newNote.id
  },

  updateNote: (id: string, updates: Partial<Note>) => {
    // 先获取更新后的 note 对象
    let updatedNote: Note | null = null

    set((state) => {
      const notes = state.editor.notes.map(note =>
        note.id === id ? { ...note, ...updates, updatedAt: Date.now() } : note,
      )
      storageService.saveNotes(notes)
      updatedNote = notes.find(n => n.id === id) || null
      return { editor: { ...state.editor, notes } }
    })

    // 调用文件系统 API
    if (updatedNote) {
      myFetch(`/api/projects/${id}`, {
        method: "PUT",
        body: updatedNote,
      })
        .catch((error) => {
          // API 失败，显示错误但保留 localStorage 的更新
          console.error("Failed to update project in file system:", error)
        })
    }
  },

  deleteNote: (id: string) => {
    // 先调用文件系统 API
    myFetch(`/api/projects/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // API 成功后，从 localStorage 删除
        set((state) => {
          const notes = state.editor.notes.filter(note => note.id !== id)
          const chatMessages = { ...state.editor.chatMessages }
          delete chatMessages[id]

          storageService.saveNotes(notes)
          storageService.saveChatMessages(chatMessages)

          return {
            editor: {
              ...state.editor,
              notes,
              chatMessages,
              activeNoteId: state.editor.activeNoteId === id ? null : state.editor.activeNoteId,
            },
          }
        })
      })
      .catch((error) => {
        // API 失败，阻止操作并显示错误
        console.error("Failed to delete project from file system:", error)
        throw error
      })
  },

  createFolder: (name: string, parentId?: string) => {
    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name,
      parentId: parentId || null,
      createdAt: Date.now(),
    }

    set((state) => {
      const folders = [...state.editor.folders, newFolder]
      storageService.saveFolders(folders)
      return { editor: { ...state.editor, folders } }
    })

    return newFolder.id
  },

  deleteFolder: (id: string) => {
    set((state) => {
      const folders = state.editor.folders.filter(folder => folder.id !== id)
      storageService.saveFolders(folders)
      return { editor: { ...state.editor, folders } }
    })
  },

  setActiveNote: (id: string | null) => {
    set(state => ({ editor: { ...state.editor, activeNoteId: id } }))
  },

  setActiveFolder: (id: string | null) => {
    set(state => ({ editor: { ...state.editor, activeFolderId: id } }))
  },

  setActiveTab: (tab: "EDITOR" | "STYLE" | "DIFF") => {
    set(state => ({ editor: { ...state.editor, activeTab: tab } }))
  },

  addChatMessage: (noteId: string, role: ChatMessage["role"], content: string) => {
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      noteId,
      role,
      content,
      timestamp: Date.now(),
    }

    set((state) => {
      const chatMessages = {
        ...state.editor.chatMessages,
        [noteId]: [...(state.editor.chatMessages[noteId] || []), newMessage],
      }
      storageService.saveChatMessages(chatMessages)
      return { editor: { ...state.editor, chatMessages } }
    })
  },

  clearChatMessages: (noteId: string) => {
    set((state) => {
      const chatMessages = { ...state.editor.chatMessages }
      delete chatMessages[noteId]
      storageService.saveChatMessages(chatMessages)
      return { editor: { ...state.editor, chatMessages } }
    })
  },

  updateChatMessage: (noteId: string, messageId: string, content: string) => {
    set((state) => {
      const chatMessages = { ...state.editor.chatMessages }
      const messages = chatMessages[noteId] || []

      chatMessages[noteId] = messages.map(msg =>
        msg.id === messageId ? { ...msg, content } : msg,
      )

      storageService.saveChatMessages(chatMessages)
      return { editor: { ...state.editor, chatMessages } }
    })
  },

  setSearchQuery: (query: string) => {
    set(state => ({ editor: { ...state.editor, searchQuery: query } }))
  },

  setFilterStatus: (status: NoteStatus | "all") => {
    set(state => ({ editor: { ...state.editor, filterStatus: status } }))
  },
})

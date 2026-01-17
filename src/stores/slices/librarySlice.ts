import type { StateCreator } from "zustand"
import type { Article } from "../../types/article"
import { storageService } from "../../services/storageService"

export interface LibrarySlice {
  library: {
    articles: Article[]
    selectedArticleId: string | null
    isUploadModalOpen: boolean
  }

  // Actions
  loadArticles: () => void
  addArticle: (article: Omit<Article, "id" | "createdAt" | "updatedAt">) => string
  updateArticle: (id: string, updates: Partial<Article>) => void
  deleteArticle: (id: string) => void
  setSelectedArticle: (id: string | null) => void
  setUploadModalOpen: (open: boolean) => void
}

export const createLibrarySlice: StateCreator<LibrarySlice> = (set, _get) => ({
  library: {
    articles: [],
    selectedArticleId: null,
    isUploadModalOpen: false,
  },

  loadArticles: () => {
    const articles = storageService.getArticles()
    set(state => ({ library: { ...state.library, articles } }))
  },

  addArticle: (articleData) => {
    const newArticle: Article = {
      id: crypto.randomUUID(),
      title: articleData.title,
      content: articleData.content,
      fileType: articleData.fileType,
      wordCount: articleData.wordCount,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    set((state) => {
      const articles = [newArticle, ...state.library.articles]
      storageService.saveArticles(articles)
      return { library: { ...state.library, articles } }
    })

    return newArticle.id
  },

  updateArticle: (id: string, updates: Partial<Article>) => {
    set((state) => {
      const articles = state.library.articles.map(article =>
        article.id === id ? { ...article, ...updates, updatedAt: Date.now() } : article,
      )
      storageService.saveArticles(articles)
      return { library: { ...state.library, articles } }
    })
  },

  deleteArticle: (id: string) => {
    set((state) => {
      const articles = state.library.articles.filter(article => article.id !== id)
      storageService.saveArticles(articles)
      return {
        library: {
          ...state.library,
          articles,
          selectedArticleId: state.library.selectedArticleId === id ? null : state.library.selectedArticleId,
        },
      }
    })
  },

  setSelectedArticle: (id: string | null) => {
    set(state => ({ library: { ...state.library, selectedArticleId: id } }))
  },

  setUploadModalOpen: (open: boolean) => {
    set(state => ({ library: { ...state.library, isUploadModalOpen: open } }))
  },
})

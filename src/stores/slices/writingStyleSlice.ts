import type { StateCreator } from "zustand"
import type { WritingStyle } from "../../types/writingStyle"
import { AUTO_UPDATE_INTERVAL, MIN_ARTICLES_FOR_ANALYSIS } from "../../types/writingStyle"
import { storageService } from "../../services/storageService"

export interface WritingStyleSlice {
  writingStyle: {
    data: WritingStyle | null
    isAnalyzing: boolean
    error: string | null
  }

  // Actions
  loadWritingStyle: () => void
  analyzeWritingStyle: () => Promise<void>
  clearWritingStyle: () => void
  checkAutoUpdate: () => void
}

export const createWritingStyleSlice: StateCreator<WritingStyleSlice> = (set, get) => ({
  writingStyle: {
    data: null,
    isAnalyzing: false,
    error: null,
  },

  loadWritingStyle: () => {
    const data = storageService.getWritingStyle()
    set(state => ({ writingStyle: { ...state.writingStyle, data } }))
  },

  analyzeWritingStyle: async () => {
    set(state => ({ writingStyle: { ...state.writingStyle, isAnalyzing: true, error: null } }))

    try {
      // 获取所有文章
      const articles = storageService.getArticles()

      if (articles.length < MIN_ARTICLES_FOR_ANALYSIS) {
        throw new Error(`至少需要 ${MIN_ARTICLES_FOR_ANALYSIS} 篇文章才能分析写作风格`)
      }

      // 调用后端 API 分析
      const response = await fetch("/api/library/analyze-style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articles: articles.map(a => ({
            title: a.title,
            content: a.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("分析请求失败")
      }

      const result = await response.json()

      const writingStyle: WritingStyle = {
        id: crypto.randomUUID(),
        analyzedArticleIds: articles.map(a => a.id),
        analyzedArticleCount: articles.length,
        summary: result.summary,
        fullContent: result.fullAnalysis,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        nextAutoUpdate: Date.now() + AUTO_UPDATE_INTERVAL,
      }

      storageService.saveWritingStyle(writingStyle)
      set(state => ({ writingStyle: { ...state.writingStyle, data: writingStyle, isAnalyzing: false } }))
    } catch (error: any) {
      set(state => ({
        writingStyle: { ...state.writingStyle, isAnalyzing: false, error: error.message },
      }))
    }
  },

  clearWritingStyle: () => {
    storageService.saveWritingStyle(null)
    set(state => ({ writingStyle: { ...state.writingStyle, data: null } }))
  },

  checkAutoUpdate: () => {
    const { data } = get().writingStyle
    if (data && Date.now() >= data.nextAutoUpdate) {
      // 触发自动更新
      get().analyzeWritingStyle()
    }
  },
})

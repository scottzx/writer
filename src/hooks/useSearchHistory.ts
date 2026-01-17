import { useEffect, useState } from "react"

const SEARCH_HISTORY_KEY = "news_search_history"
const MAX_HISTORY_ITEMS = 10

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([])

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SEARCH_HISTORY_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setHistory(Array.isArray(parsed) ? parsed : [])
      }
    } catch (error) {
      console.error("Failed to load search history:", error)
    }
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history))
    } catch (error) {
      console.error("Failed to save search history:", error)
    }
  }, [history])

  const addSearchTerm = (term: string) => {
    if (!term || term.trim() === "") return

    const trimmedTerm = term.trim()

    setHistory((prev) => {
      // Remove if already exists
      const filtered = prev.filter(t => t !== trimmedTerm)
      // Add to front
      const updated = [trimmedTerm, ...filtered]
      // Keep only MAX_HISTORY_ITEMS
      return updated.slice(0, MAX_HISTORY_ITEMS)
    })
  }

  const removeSearchTerm = (term: string) => {
    setHistory(prev => prev.filter(t => t !== term))
  }

  const clearHistory = () => {
    setHistory([])
  }

  return {
    history,
    addSearchTerm,
    removeSearchTerm,
    clearHistory,
  }
}

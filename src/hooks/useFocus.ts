import type { SourceID } from "@shared/types"
import { useCallback, useMemo } from "react"
import { useStore } from "~/stores"

// 直接选择 metadata.data.focus，不使用 shallow
// 确保 focus 始终是数组（在 metadataSlice 初始化时已保证）
export function useFocus() {
  const focusSources = useStore(state => state.metadata.data.focus)
  const setFocusSources = useStore(state => state.setFocusSources)

  const toggleFocus = useCallback((id: SourceID) => {
    setFocusSources(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }, [setFocusSources])

  const isFocused = useCallback((id: SourceID) => focusSources.includes(id), [focusSources])

  return {
    toggleFocus,
    isFocused,
    focusSources,
  }
}

export function useFocusWith(id: SourceID) {
  const focusSources = useStore(state => state.metadata.data.focus)
  const setFocusSources = useStore(state => state.setFocusSources)

  const toggleFocus = useCallback(() => {
    setFocusSources(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }, [setFocusSources, id])

  const isFocused = useMemo(() => focusSources.includes(id), [id, focusSources])

  return {
    toggleFocus,
    isFocused,
  }
}

// 获取当前栏目（focus）的新闻源
export function useCurrentSources() {
  const currentColumnID = useStore(state => state.currentColumnID)
  const currentSources = useStore(state => state.metadata.data[currentColumnID] || [])

  return useMemo(() => ({
    currentColumnID,
    currentSources,
  }), [currentColumnID, currentSources])
}

import type { SourceID } from "@shared/types"
import { useCallback, useMemo } from "react"
import { shallow } from "zustand/shallow"
import { useStore } from "~/stores"

// Stable selectors (defined outside components)
const selectFocusSources = (state: ReturnType<typeof useStore.getState>) => state.metadata.data.focus
const selectSetFocusSources = (state: ReturnType<typeof useStore.getState>) => state.setFocusSources

// 直接选择 metadata.data.focus，使用 shallow comparison
// 确保 focus 始终是数组（在 metadataSlice 初始化时已保证）
export function useFocus() {
  const focusSources = useStore(selectFocusSources, shallow)
  const setFocusSources = useStore(selectSetFocusSources)

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
  const focusSources = useStore(selectFocusSources, shallow)
  const setFocusSources = useStore(selectSetFocusSources)

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
  // 直接订阅 state，用 useMemo 提取数据
  const metadata = useStore(state => state.metadata)
  const currentColumnID = useStore(state => state.currentColumnID)

  const currentSources = useMemo(
    () => metadata.data[currentColumnID] || [],
    [metadata, currentColumnID],
  )

  return useMemo(() => ({
    currentColumnID,
    currentSources,
  }), [currentColumnID, currentSources])
}

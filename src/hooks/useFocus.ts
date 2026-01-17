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

// Stable selectors for useCurrentSources (defined outside component)
const selectCurrentColumnID = (state: ReturnType<typeof useStore.getState>) => state.currentColumnID

// Selector that depends on currentColumnID - defined as function to be used inline
function makeSelectCurrentSources() {
  return (state: ReturnType<typeof useStore.getState>) =>
    state.metadata.data[state.currentColumnID] || []
}

// 获取当前栏目（focus）的新闻源
export function useCurrentSources() {
  const currentColumnID = useStore(selectCurrentColumnID)
  const selectCurrentSources = useMemo(makeSelectCurrentSources, [])
  const currentSources = useStore(selectCurrentSources, shallow)

  return useMemo(() => ({
    currentColumnID,
    currentSources,
  }), [currentColumnID, currentSources])
}

import type { SourceID } from "@shared/types"
import { useCallback, useMemo } from "react"
import { useStore } from "~/stores"

export function useFocus() {
  const focusSources = useStore(state => state.getFocusSources())
  const setFocusSources = useStore(state => state.setFocusSources)

  const toggleFocus = useCallback((id: SourceID) => {
    setFocusSources(focusSources.includes(id) ? focusSources.filter(i => i !== id) : [...focusSources, id])
  }, [setFocusSources, focusSources])

  const isFocused = useCallback((id: SourceID) => focusSources.includes(id), [focusSources])

  return {
    toggleFocus,
    isFocused,
  }
}

export function useFocusWith(id: SourceID) {
  const focusSources = useStore(state => state.getFocusSources())
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

import { useCallback } from "react"
import { useStore } from "~/stores"

export function useSearchBar() {
  const opened = useStore(state => state.ui.searchBarOpened)
  const setSearchBarOpened = useStore(state => state.setSearchBarOpened)

  const toggle = useCallback((status?: boolean) => {
    if (status !== undefined) setSearchBarOpened(status)
    else setSearchBarOpened(v => !v)
  }, [setSearchBarOpened])

  return {
    opened,
    toggle,
  }
}

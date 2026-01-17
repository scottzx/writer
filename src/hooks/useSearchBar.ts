import { useCallback } from "react"
import { useStore } from "~/stores"

export function useSearchBar() {
  const searchBarOpen = useStore(state => state.searchBarOpen)
  const setSearchBarOpen = useStore(state => state.setSearchBarOpen)
  const toggleSearchBar = useStore(state => state.toggleSearchBar)

  const toggle = useCallback((status?: boolean) => {
    if (status !== undefined) {
      setSearchBarOpen(status)
    } else {
      toggleSearchBar()
    }
  }, [setSearchBarOpen, toggleSearchBar])

  return {
    opened: searchBarOpen,
    toggle,
  }
}

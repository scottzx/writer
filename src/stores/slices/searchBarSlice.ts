import type { StateCreator } from "zustand"

export interface SearchBarSlice {
  searchBarOpen: boolean
  setSearchBarOpen: (open: boolean) => void
  toggleSearchBar: () => void
}

export const createSearchBarSlice: StateCreator<SearchBarSlice> = (set, _get) => ({
  searchBarOpen: false,

  setSearchBarOpen: open => set({ searchBarOpen: open }),

  toggleSearchBar: () => set(state => ({ searchBarOpen: !state.searchBarOpen })),
})

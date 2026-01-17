import type { StateCreator } from "zustand"

export interface GoToTopState {
  ok: boolean
  el: HTMLElement | undefined
  fn: (() => void) | undefined
}

export interface GoToTopSlice {
  goToTop: GoToTopState
  setGoToTop: (state: GoToTopState) => void
  setGoToTopEl: (el: HTMLElement | undefined) => void
  resetGoToTop: () => void
}

export const createGoToTopSlice: StateCreator<GoToTopSlice> = set => ({
  goToTop: {
    ok: false,
    el: undefined,
    fn: undefined,
  },

  setGoToTop: state => set({ goToTop: state }),

  setGoToTopEl: el => set(state => ({
    goToTop: { ...state.goToTop, el },
  })),

  resetGoToTop: () => set({
    goToTop: {
      ok: false,
      el: undefined,
      fn: undefined,
    },
  }),
})

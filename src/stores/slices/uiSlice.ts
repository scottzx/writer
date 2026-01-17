import type { StateCreator } from "zustand"

export interface ToastItem {
  id: number
  type?: "success" | "error" | "warning" | "info"
  msg: string
  duration?: number
  action?: {
    label: string
    onClick: () => MaybePromise<void>
  }
  onDismiss?: () => MaybePromise<void>
}

export type ColorScheme = "dark" | "light" | "auto"

export interface UISlice {
  ui: {
    colorScheme: ColorScheme
    searchBarOpened: boolean
    toasts: ToastItem[]
    goToTop: {
      ok: boolean
      el: HTMLElement | undefined
      fn: (() => void) | undefined
    }
  }
  setColorScheme: (scheme: ColorScheme) => void
  setSearchBarOpened: (opened: boolean | ((prev: boolean) => boolean)) => void
  addToast: (toast: Omit<ToastItem, "id">) => void
  removeToast: (id: number) => void
  setGoToTop: (goToTop: Partial<UISlice["ui"]["goToTop"]>) => void
}

export const createUISlice: StateCreator<UISlice> = set => ({
  ui: {
    colorScheme: "dark",
    searchBarOpened: false,
    toasts: [],
    goToTop: {
      ok: false,
      el: undefined,
      fn: undefined,
    },
  },

  setColorScheme: colorScheme => set(state => ({
    ui: { ...state.ui, colorScheme },
  })),

  setSearchBarOpened: opened => set(state => ({
    ui: {
      ...state.ui,
      searchBarOpened: typeof opened === "function" ? opened(state.ui.searchBarOpened) : opened,
    },
  })),

  addToast: toast => set(state => ({
    ui: {
      ...state.ui,
      toasts: [
        { ...toast, id: Date.now() },
        ...state.ui.toasts,
      ],
    },
  })),

  removeToast: id => set(state => ({
    ui: {
      ...state.ui,
      toasts: state.ui.toasts.filter(t => t.id !== id),
    },
  })),

  setGoToTop: goToTop => set(state => ({
    ui: {
      ...state.ui,
      goToTop: { ...state.ui.goToTop, ...goToTop },
    },
  })),
})

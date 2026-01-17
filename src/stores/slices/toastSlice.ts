import type { StateCreator } from "zustand"

export type MaybePromise<T> = T | Promise<T>

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

export interface ToastSlice {
  toasts: ToastItem[]
  addToast: (toast: Omit<ToastItem, "id">) => void
  removeToast: (id: number) => void
}

export const createToastSlice: StateCreator<ToastSlice> = (set, _get) => ({
  toasts: [],

  addToast: (toast) => {
    const newToast: ToastItem = {
      id: Date.now(),
      ...toast,
    }
    set(state => ({
      toasts: [newToast, ...state.toasts],
    }))
  },

  removeToast: (id) => {
    set(state => ({
      toasts: state.toasts.filter(t => t.id !== id),
    }))
  },
})

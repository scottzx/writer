import { useCallback } from "react"
import { useStore } from "~/stores"

export function useToast() {
  const addToast = useStore(state => state.addToast)

  return useCallback((msg: string, props?: Omit<import("~/stores").ToastItem, "id" | "msg">) => {
    addToast({ msg, ...props })
  }, [addToast])
}

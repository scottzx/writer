import { useMemo } from "react"
import { useMedia, useUpdateEffect } from "react-use"
import { useStore } from "~/stores"

export declare type ColorScheme = "dark" | "light" | "auto"

export function useDark() {
  const colorScheme = useStore(state => state.ui.colorScheme)
  const setColorScheme = useStore(state => state.setColorScheme)
  const prefersDarkMode = useMedia("(prefers-color-scheme: dark)")
  const isDark = useMemo(() => colorScheme === "auto" ? prefersDarkMode : colorScheme === "dark", [colorScheme, prefersDarkMode])

  useUpdateEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const setDark = (value: ColorScheme) => {
    setColorScheme(value)
  }

  const toggleDark = () => {
    setColorScheme(isDark ? "light" : "dark")
  }

  return { isDark, setDark, toggleDark }
}

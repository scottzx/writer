import { useEffect, useState } from "react"
import { useMount } from "react-use"
import { useStore } from "~/stores"

/**
 * changed every minute
 */
function useVisibility() {
  const [visible, setVisible] = useState(true)
  useMount(() => {
    const handleVisibilityChange = () => {
      setVisible(document.visibilityState === "visible")
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  })
  return visible
}

export function useRelativeTime(timestamp: string | number) {
  const [time, setTime] = useState<string>()
  const timer = useStore(state => state.timer)
  const startTimer = useStore(state => state.startTimer)
  const visible = useVisibility()

  // Start timer on mount (only once globally)
  useMount(() => {
    const cleanup = startTimer()
    return cleanup
  })

  useEffect(() => {
    if (visible) {
      const t = relativeTime(timestamp)
      if (t) {
        setTime(t)
      }
    }
  }, [timestamp, timer, visible])

  return time
}

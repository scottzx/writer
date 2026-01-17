import { useCallback, useMemo, useRef, useState } from "react"
import { useMount, useWindowSize } from "react-use"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import type { ToastItem } from "~/stores"
import { useStore } from "~/stores"
import { Timer } from "~/utils"

const WIDTH = 320
export function Toast() {
  const { width } = useWindowSize()
  const toasts = useStore(state => state.toasts)
  const center = useMemo(() => {
    const t = (width - WIDTH) / 2
    return t > width * 0.9 ? width * 0.9 : t
  }, [width])
  const [parent] = useAutoAnimate({ duration: 200 })
  return (
    <ol
      ref={parent}
      style={{
        width: WIDTH,
        left: center,
      }}
      className="absolute top-4 z-99 flex flex-col gap-2"
    >
      {
        toasts.map(k => <Item key={k.id} info={k} />)
      }
    </ol>
  )
}

const colors = {
  success: "green",
  error: "red",
  warning: "orange",
  info: "blue",
}

function Item({ info }: { info: ToastItem }) {
  const color = colors[info.type ?? "info"]
  const removeToast = useStore(state => state.removeToast)
  const hidden = useCallback((dismiss = true) => {
    removeToast(info.id)
    if (dismiss) {
      info.onDismiss?.()
    }
  }, [info, removeToast])
  const timer = useRef<Timer>()

  useMount(() => {
    timer.current = new Timer(() => {
      hidden()
    }, info.duration ?? 5000)
    return () => timer.current?.clear()
  })

  const [hoverd, setHoverd] = useState(false)
  useEffect(() => {
    if (hoverd) {
      timer.current?.pause()
    } else {
      timer.current?.resume()
    }
  }, [hoverd])

  return (
    <li
      className={$(
        "bg-base rounded-lg shadow-xl relative",
      )}
      onMouseEnter={() => setHoverd(true)}
      onMouseLeave={() => setHoverd(false)}
    >
      <div className={$(
        `bg-${color}-500 dark:bg-${color} bg-op-40! p2 backdrop-blur-5 rounded-lg w-full`,
        "flex items-center gap-2",
      )}
      >
        {
          hoverd
            ? <button type="button" className={`i-ph:x-circle color-${color}-500 i-ph:info`} onClick={() => hidden(false)} />
            : <span className={`i-ph:info color-${color}-500 `} />
        }
        <div className="flex justify-between w-full">
          <span className="op-90 dark:op-100">
            {info.msg}
          </span>
          {info.action && (
            <button
              type="button"
              className={`text-sm color-${color}-500 bg-base op-80 bg-op-50! px-1 rounded min-w-10 hover:bg-op-70!`}
              onClick={info.action.onClick}
            >
              {info.action.label}
            </button>
          )}
        </div>
      </div>
    </li>
  )
}

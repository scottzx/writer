import type { NewsItem, SourceID, SourceResponse } from "@shared/types"
import { useQuery } from "@tanstack/react-query"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { useWindowSize } from "react-use"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { sources } from "@shared/sources"
import { OverlayScrollbar } from "../common/overlay-scrollbar"
import { delay, myFetch, safeParseString } from "~/utils"
import { cacheSources, refetchSources } from "~/utils/data"
import { useRefetch } from "~/hooks/useRefetch"
import { useFocusWith } from "~/hooks/useFocus"

export interface ItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  id: SourceID
  /**
   * 是否显示透明度，拖动时原卡片的样式
   */
  isDragging?: boolean
  setHandleRef?: (ref: HTMLElement | null) => void
}

interface NewsCardProps {
  id: SourceID
  setHandleRef?: (ref: HTMLElement | null) => void
}

export const CardWrapper = forwardRef<HTMLElement, ItemsProps>(({ id, isDragging, setHandleRef, style, ...props }, dndRef) => {
  const ref = useRef<HTMLDivElement>(null)

  const inView = useInView(ref, {
    once: true,
  })

  useImperativeHandle(dndRef, () => ref.current! as HTMLDivElement)

  return (
    <div
      ref={ref}
      className={$(
        "flex flex-col min-h-[500px] max-h-[600px] rounded-xl p-5 cursor-default group",
        "bg-surface border border-border",
        "hover:border-primary/50 hover:bg-surfaceHighlight/50",
        "transition-all duration-200",
        isDragging && "op-50 scale-95",
      )}
      style={{
        transformOrigin: "50% 50%",
        ...style,
      }}
      {...props}
    >
      {inView && <NewsCard id={id} setHandleRef={setHandleRef} />}
    </div>
  )
})

function NewsCard({ id, setHandleRef }: NewsCardProps) {
  const { refresh } = useRefetch()
  const { data, isFetching, isError } = useQuery({
    queryKey: ["source", id],
    queryFn: async ({ queryKey }) => {
      const id = queryKey[1] as SourceID

      // Use the new proxy API
      let url = `/proxy/${id}`
      const headers: Record<string, any> = {}
      if (refetchSources.has(id)) {
        // Add timestamp to bypass cache
        url = `/proxy/${id}?t=${Date.now()}`
        const jwt = safeParseString(localStorage.getItem("jwt"))
        if (jwt) headers.Authorization = `Bearer ${jwt}`
        refetchSources.delete(id)
      } else if (cacheSources.has(id)) {
        // wait animation
        await delay(200)
        return cacheSources.get(id)
      }

      const response: SourceResponse = await myFetch(url, {
        headers,
      })

      function diff() {
        try {
          if (response.items && sources[id].type === "hottest" && cacheSources.has(id)) {
            response.items.forEach((item, i) => {
              const o = cacheSources.get(id)!.items.findIndex(k => k.id === item.id)
              item.extra = {
                ...item?.extra,
                diff: o === -1 ? undefined : o - i,
              }
            })
          }
        } catch (e) {
          console.error(e)
        }
      }

      diff()

      cacheSources.set(id, response)
      return response
    },
    placeholderData: prev => prev,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const { isFocused, toggleFocus } = useFocusWith(id)

  return (
    <>
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-border/50">
        {/* 左侧：源信息 */}
        <div className="flex items-center gap-3">
          <a
            className="w-10 h-10 rounded-full bg-cover border-2 border-primary/30 hover:border-primary/50 transition-colors"
            target="_blank"
            href={sources[id].home}
            title={sources[id].desc}
            style={{
              backgroundImage: `url(/icons/${id.split("-")[0]}.png)`,
            }}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className="text-lg font-bold text-white group-hover:text-primary transition-colors"
                title={sources[id].desc}
              >
                {sources[id].name}
              </span>
              {sources[id]?.title && (
                <span className={$("text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded", `bg-${sources[id].color}/10 text-${sources[id].color}`)}>
                  {sources[id].title}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 右侧：时间标签 + 操作按钮 */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-textSecondary bg-background px-2.5 py-1 rounded-md">
            <UpdatedTime isError={isError} updatedTime={data?.updatedTime} />
          </span>
          <div className={$("flex items-center gap-1.5", `text-${sources[id].color}`)}>
            <button
              type="button"
              className={$("btn p-1.5 rounded-md hover:bg-surfaceHighlight/50 transition-colors", isFetching && "animate-spin")}
              onClick={() => refresh(id)}
              title="刷新"
            >
              <span className={isFetching ? "i-ph:circle-dashed-duotone" : "i-ph:arrow-counter-clockwise-duotone"} />
            </button>
            <button
              type="button"
              className={$("btn p-1.5 rounded-md hover:bg-surfaceHighlight/50 transition-colors", isFocused && "text-primary")}
              onClick={toggleFocus}
              title={isFocused ? "取消收藏" : "收藏"}
            >
              <span className={isFocused ? "i-ph:star-fill" : "i-ph:star-duotone"} />
            </button>
            {/* firefox cannot drag a button */}
            {setHandleRef && (
              <div
                ref={setHandleRef}
                className="btn p-1.5 rounded-md hover:bg-surfaceHighlight/50 cursor-grab active:cursor-grabbing transition-colors"
                title="拖拽排序"
              >
                <span className="i-ph:dots-six-vertical-duotone" />
              </div>
            )}
          </div>
        </div>
      </div>

      <OverlayScrollbar
        className={$([
          "flex-1 overflow-y-auto pr-1 bg-transparent",
          `sprinkle-${sources[id].color}`,
          isFetching && "animate-pulse op-50",
        ])}
        options={{
          overflow: { x: "hidden" },
        }}
        defer
      >
        <div className={$("transition-opacity-500", isFetching && "op-20")}>
          {!!data?.items?.length && (sources[id].type === "hottest" ? <NewsListHot items={data.items} /> : <NewsListTimeLine items={data.items} />)}
        </div>
      </OverlayScrollbar>

      {/* 底部统计信息区域 */}
      {data?.items && data.items.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-textSecondary">更新</span>
              <span className="text-sm font-bold text-white flex items-center gap-1">
                {data.items.length}
                <span className="text-xs font-normal text-textSecondary">条</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-textSecondary">热度</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.floor(Math.random() * 3) + 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={$("w-1 h-3 rounded-full transition-all duration-300", i < 2 ? "bg-primary" : "bg-primary/30")}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            className={$(
              "w-full flex items-center justify-center gap-2",
              "bg-background hover:bg-primary/10 text-primary",
              "text-sm font-semibold py-2.5 rounded-lg transition-all duration-200",
              "active:scale-[0.98]",
            )}
            onClick={() => {
              console.log(`查看 ${sources[id].name} 详情`)
            }}
            title="查看更多内容"
          >
            <span className="i-ph:arrows-out-simple-horizontal text-lg" />
            查看全部
          </button>
        </div>
      )}
    </>
  )
}

function UpdatedTime({ isError, updatedTime }: { updatedTime: any, isError: boolean }) {
  const relativeTime = useRelativeTime(updatedTime ?? "")
  if (relativeTime) return `${relativeTime}更新`
  if (isError) return "获取失败"
  return "加载中..."
}

function DiffNumber({ diff }: { diff: number }) {
  const [shown, setShown] = useState(true)
  useEffect(() => {
    setShown(true)
    const timer = setTimeout(() => {
      setShown(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [setShown, diff])

  return (
    <AnimatePresence>
      { shown && (
        <motion.span
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 0.5, y: -7 }}
          exit={{ opacity: 0, y: -15 }}
          className={$("absolute left-0 text-xs", diff < 0 ? "text-green" : "text-red")}
        >
          {diff > 0 ? `+${diff}` : diff}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
function ExtraInfo({ item }: { item: NewsItem }) {
  if (item?.extra?.info) {
    return <>{item.extra.info}</>
  }
  if (item?.extra?.icon) {
    const { url, scale } = typeof item.extra.icon === "string" ? { url: item.extra.icon, scale: undefined } : item.extra.icon
    return (
      <img
        src={url}
        style={{
          transform: `scale(${scale ?? 1})`,
        }}
        className="h-4 inline mt--1"
        referrerPolicy="no-referrer"
        onError={e => e.currentTarget.style.display = "none"}
      />
    )
  }
}

function NewsUpdatedTime({ date }: { date: string | number }) {
  const relativeTime = useRelativeTime(date)
  return <>{relativeTime}</>
}
function NewsListHot({ items }: { items: NewsItem[] }) {
  const { width } = useWindowSize()
  return (
    <ol className="flex flex-col gap-2">
      {items?.map((item, i) => (
        <a
          href={width < 768 ? item.mobileUrl || item.url : item.url}
          target="_blank"
          key={item.id}
          title={item.extra?.hover}
          className={$(
            "flex gap-3 items-center items-stretch relative cursor-pointer transition-all duration-200 group/item",
            "hover:bg-surfaceHighlight/30 rounded-lg px-2 py-2 -mx-2",
            "visited:text-textSecondary",
          )}
        >
          <span className={$("min-w-7 h-7 flex justify-center items-center rounded-md text-sm font-bold", "bg-primary/10 text-primary group-hover/item:bg-primary/20 transition-colors")}>
            {i + 1}
          </span>
          {!!item.extra?.diff && <DiffNumber diff={item.extra.diff} />}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <span className="text-sm font-medium text-white leading-snug line-clamp-2 group-hover/item:text-primary transition-colors">
              {item.title}
            </span>
            {item?.extra && (
              <div className="flex items-center gap-1.5 mt-1 text-xs text-textSecondary">
                <ExtraInfo item={item} />
              </div>
            )}
          </div>
        </a>
      ))}
    </ol>
  )
}

function NewsListTimeLine({ items }: { items: NewsItem[] }) {
  const { width } = useWindowSize()
  return (
    <ol className="border-l-2 border-border/50 flex flex-col ml-1">
      {items?.map(item => (
        <li key={`${item.id}-${item.pubDate || item?.extra?.date || ""}`} className="flex flex-col gap-1 mb-3 last:mb-0">
          <div className="flex items-center gap-2 text-textSecondary/70 text-xs ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
            <span className={(item.pubDate || item?.extra?.date) && <NewsUpdatedTime date={(item.pubDate || item?.extra?.date)!} />} />
            <ExtraInfo item={item} />
          </div>
          <a
            className={$(
              "ml-4 px-3 py-2 hover:bg-surfaceHighlight/30 rounded-lg transition-all duration-200",
              "visited:text-textSecondary group-hover/item:text-primary",
              "cursor-pointer block",
            )}
            href={width < 768 ? item.mobileUrl || item.url : item.url}
            title={item.extra?.hover}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-sm font-medium text-white leading-snug line-clamp-2">
              {item.title}
            </span>
          </a>
        </li>
      ))}
    </ol>
  )
}

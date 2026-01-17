import type { PropsWithChildren } from "react"
import type { SourceID } from "@shared/types"
import type { BaseEventPayload, ElementDragType } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types"
import { useCallback, useEffect, useMemo } from "react"
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge"
import { createPortal } from "react-dom"
import { useThrottleFn } from "ahooks"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { motion } from "framer-motion"
import { useWindowSize } from "react-use"
import { isMobile } from "react-device-detect"
import { sources } from "@shared/sources"
import { shallow } from "zustand/shallow"
import { DndContext } from "../common/dnd"
import { useSortable } from "../common/dnd/useSortable"
import { OverlayScrollbar } from "../common/overlay-scrollbar"
import type { ItemsProps } from "./card"
import { CardWrapper } from "./card"
import { useStore } from "~/stores"
import { useEntireQuery } from "~/hooks/query"
import { isiOS } from "~/utils"

const AnimationDuration = 200
const WIDTH = 350

// Stable selectors (defined outside component)
const selectCurrentSources = (state: ReturnType<typeof useStore.getState>) => state.metadata.data[state.currentColumnID] || []

export function Dnd() {
  const items = useStore(selectCurrentSources, shallow)
  const setItems = useStore(state => state.setCurrentSources)
  const goToTop = useStore(state => state.goToTop)
  const [parent] = useAutoAnimate({ duration: AnimationDuration })
  useEntireQuery(items)
  const { width } = useWindowSize()
  const minWidth = useMemo(() => {
    // double padding = 32
    return Math.min(width - 32, WIDTH)
  }, [width])

  if (!items.length) return null

  return (
    <DndWrapper items={items} setItems={setItems} goToTop={goToTop} isSingleColumn={isMobile}>
      {/* 外部容器：提供统一的布局和样式 */}
      <div className="w-full">
        <OverlayScrollbar defer className="overflow-x-auto">
          <motion.ol
            className={isMobile
              ? "flex px-4 gap-4 pb-4 scroll-smooth snap-x snap-mandatory"
              : "grid w-full gap-6"}
            ref={parent}
            style={isMobile
              ? {
                  // 横向滚动布局
                }
              : {
                  gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
                }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.1,
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {items.map((id, index) => (
              <motion.li
                key={id}
                className={$(isMobile && "flex-shrink-0", isMobile && index === items.length - 1 && "mr-4")}
                style={isMobile ? { width: `${width - 32 > WIDTH ? WIDTH : width - 32}px`, flexShrink: 0 } : undefined}
                transition={{
                  type: "tween",
                  duration: AnimationDuration / 1000,
                }}
                variants={{
                  hidden: {
                    y: 20,
                    opacity: 0,
                  },
                  visible: {
                    y: 0,
                    opacity: 1,
                  },
                }}
              >
                <SortableCardWrapper id={id} />
              </motion.li>
            ))}
          </motion.ol>
        </OverlayScrollbar>
        {isMobile && (
          <div className="flex justify-center">
            <span className="text-sm text-gray-500 text-center">左右滑动查看更多</span>
          </div>
        )}
      </div>
    </DndWrapper>
  )
}

function DndWrapper({ items, setItems, goToTop, isSingleColumn, children }: PropsWithChildren<{
  items: SourceID[]
  setItems: (items: SourceID[] | ((prev: SourceID[]) => SourceID[])) => void
  goToTop: { ok: boolean, el?: HTMLElement }
  isSingleColumn: boolean
}>) {
  const onDropTargetChange = useCallback(({ location, source }: BaseEventPayload<ElementDragType>) => {
    const traget = location.current.dropTargets[0]
    if (!traget?.data || !source?.data) return
    const closestEdgeOfTarget = extractClosestEdge(traget.data)
    const fromIndex = items.indexOf(source.data.id as SourceID)
    const toIndex = items.indexOf(traget.data.id as SourceID)
    if (fromIndex === toIndex || fromIndex === -1 || toIndex === -1) return
    const update = reorderWithEdge({
      list: items,
      startIndex: fromIndex,
      indexOfTarget: toIndex,
      closestEdgeOfTarget,
      axis: isSingleColumn ? "horizontal" : "vertical",
    })
    setItems(update)
  }, [items, setItems, isSingleColumn])
  // 避免动画干扰
  const { run } = useThrottleFn(onDropTargetChange, {
    leading: true,
    trailing: true,
    wait: AnimationDuration,
  })
  return (
    <DndContext onDropTargetChange={run} autoscroll={goToTop.el ? { element: goToTop.el } : undefined}>
      {children}
    </DndContext>
  )
}

function CardOverlay({ id }: { id: SourceID }) {
  return (
    <div className={$(
      "flex flex-col p-5 backdrop-blur-sm",
      "bg-surface border border-border border-primary/50",
      !isiOS() && "rounded-xl shadow-xl",
    )}
    >
      <div className={$("flex justify-between items-center")}>
        <div className="flex gap-3 items-center">
          <div
            className="w-10 h-10 rounded-full bg-cover border-2 border-primary/30"
            style={{
              backgroundImage: `url(/icons/${id.split("-")[0]}.png)`,
            }}
          />
          <span className="flex flex-col">
            <span className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">
                {sources[id].name}
              </span>
              {sources[id]?.title && (
                <span className={$("text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded", `bg-${sources[id].color}/10 text-${sources[id].color}`)}>
                  {sources[id].title}
                </span>
              )}
            </span>
            <span className="text-xs text-textSecondary">拖拽中</span>
          </span>
        </div>
        <div className={$("flex items-center gap-1.5", `text-${sources[id].color}`)}>
          <button
            type="button"
            className="btn p-1.5 rounded-md cursor-grabbing"
          >
            <span className="i-ph:dots-six-vertical-duotone" />
          </button>
        </div>
      </div>
    </div>
  )
}

function SortableCardWrapper({ id }: ItemsProps) {
  const {
    isDragging,
    setNodeRef,
    setHandleRef,
    OverlayContainer,
  } = useSortable({ id })

  useEffect(() => {
    if (OverlayContainer) {
      OverlayContainer!.className += $("bg-surface", !isiOS() && "rounded-xl shadow-xl")
    }
  }, [OverlayContainer])

  return (
    <>
      <CardWrapper
        ref={setNodeRef}
        id={id}
        isDragging={isDragging}
        setHandleRef={setHandleRef}
      />
      {OverlayContainer && createPortal(<CardOverlay id={id} />, OverlayContainer)}
    </>
  )
}

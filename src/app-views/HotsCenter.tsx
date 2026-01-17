import { useState } from "react"
import type { FixedColumnID } from "@shared/types"
import { SearchBar } from "~/components/common/search-bar"
import { Toast } from "~/components/common/toast"
import { GoToTop } from "~/components/common/GoToTop"
import { Dnd } from "~/components/column/dnd"
import { ColumnNav } from "~/components/column/ColumnNav"
import { useCurrentSources, useFocus } from "~/hooks/useFocus"
import { useStore } from "~/stores"

/**
 * 热点聚合页面
 * 从 src_back 迁移过来的新闻聚合功能，支持：
 * - 多个新闻源的卡片展示
 * - 拖拽排序（DnD）
 * - 搜索栏（Cmd+K）
 * - Toast 通知
 */
export default function HotsCenter() {
  const { focusSources } = useFocus()
  const { currentSources } = useCurrentSources()
  const setCurrentColumnID = useStore(state => state.setCurrentColumnID)
  const [currentColumn, setCurrentColumn] = useState<FixedColumnID>("hottest")

  return (
    <div className="flex-1 overflow-hidden bg-background relative">
      {/* Search Bar - Cmd+K 唤起 */}
      <SearchBar />

      {/* Toast 通知 */}
      <Toast />

      {/* GoToTop 回到顶部 */}
      <GoToTop />

      {/* 主内容区 - 使用迁移过来的 Dnd 组件 */}
      <div className="h-full flex flex-col">
        {/* 头部信息 */}
        <div className="px-6 pt-6 pb-2">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-2">热点聚合</h1>
            <p className="text-textSecondary text-sm">
              从各大平台实时抓取热门内容，支持拖拽排序、收藏、搜索等功能
            </p>

            {/* 列导航 - 更多、关注、最热、实时 */}
            <ColumnNav
              currentColumn={currentColumn}
              onColumnChange={(column) => {
                setCurrentColumn(column)
                setCurrentColumnID(column)
              }}
              onMoreClick={() => {
                // 可以扩展为打开更多选项
                console.log("More clicked")
              }}
            />

            <div className="flex gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2 text-textSecondary">
                <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs">⌘K</kbd>
                <span>打开搜索</span>
              </div>
              <div className="flex items-center gap-2 text-textSecondary">
                <span className="i-ph-dots-six-vertical-duotone text-lg" />
                <span>拖拽排序</span>
              </div>
            </div>

            {/* 显示当前收藏的新闻源 */}
            {focusSources.length > 0 && currentColumn === "focus"
              ? (
                  <div className="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        已收藏
                        {" "}
                        {focusSources.length}
                        {" "}
                        个新闻源
                      </span>
                    </div>
                  </div>
                )
              : null}
          </div>
        </div>

        {/* 新闻内容区 - 使用 Dnd 组件 */}
        <div className="flex-1 overflow-hidden">
          {currentSources.length > 0
            ? (
                <Dnd />
              )
            : (
                <div className="flex flex-col items-center justify-center h-full text-textSecondary">
                  <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mb-4">
                    <span className="i-ph-star-duotone text-3xl" />
                  </div>
                  <p className="mb-4">还没有收藏任何新闻源</p>
                  <p className="text-sm">按 ⌘K 打开搜索，选择你感兴趣的新闻源</p>
                </div>
              )}
        </div>
      </div>
    </div>
  )
}

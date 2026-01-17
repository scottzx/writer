import React from "react"
import { Navigate } from "react-router-dom"
/* eslint-disable react-refresh/only-export-components */

import NewsCenter from "../app-views/NewsCenter"
import HotsCenter from "../app-views/HotsCenter"
import TimelineAnalysis from "../app-views/TimelineAnalysis"
import ResearchCenter from "../app-views/ResearchCenter"
import EditorWorkspace from "../app-views/EditorWorkspace"
import { ViewState } from "../app-types"

// 路由路径与 ViewState 的映射
export const routePaths: Record<ViewState, string> = {
  [ViewState.NEWS]: "/news",
  [ViewState.HOTS]: "/hots", // 新增：热点聚合
  [ViewState.TIMELINE]: "/timeline",
  [ViewState.RESEARCH]: "/research",
  [ViewState.OUTLINE]: "/outline",
  [ViewState.EDITOR]: "/editor",
  [ViewState.STYLE_DNA]: "/style-dna",
  [ViewState.PUBLISH]: "/publish",
  [ViewState.DIFF]: "/diff",
  [ViewState.ASSETS]: "/assets",
}

// 根据路径获取 ViewState
export function getViewStateFromPath(path: string): ViewState | null {
  const removeHash = (hash: string) => hash.replace(/^#/, "")
  const cleanPath = removeHash(path)
  const entry = Object.entries(routePaths).find(([_, value]) => value === cleanPath)
  return entry ? (entry[0] as ViewState) : null
}

// 开发中的页面组件
function UnderDevelopment({ label }: { label: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background text-textSecondary h-full">
      <div className="p-8 text-center bg-surface border border-border rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-2">功能开发中</h2>
        <p className="mb-4">
          "
          {label}
          " 模块即将上线
        </p>
        <div className="w-16 h-1 bg-primary/20 rounded-full mx-auto overflow-hidden">
          <div className="w-1/2 h-full bg-primary animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

// 获取视图标签
function getLabelForView(view: ViewState): string {
  switch (view) {
    case ViewState.STYLE_DNA: return "风格 DNA"
    case ViewState.PUBLISH: return "发布管理"
    case ViewState.DIFF: return "差异比对"
    case ViewState.ASSETS: return "素材库"
    case ViewState.OUTLINE: return "大纲生成"
    default: return view
  }
}

// 路由配置元素
export const routes = [
  {
    path: "/",
    element: <Navigate to={routePaths[ViewState.NEWS]} replace />,
  },
  {
    path: routePaths[ViewState.NEWS],
    element: <NewsCenter />,
  },
  {
    path: routePaths[ViewState.HOTS],
    element: <HotsCenter />,
  },
  {
    path: routePaths[ViewState.TIMELINE],
    element: <TimelineAnalysis />,
  },
  {
    path: routePaths[ViewState.RESEARCH],
    element: <ResearchCenter />,
  },
  {
    path: routePaths[ViewState.EDITOR],
    element: <EditorWorkspace />,
  },
  {
    path: routePaths[ViewState.STYLE_DNA],
    element: <UnderDevelopment label={getLabelForView(ViewState.STYLE_DNA)} />,
  },
  {
    path: routePaths[ViewState.PUBLISH],
    element: <UnderDevelopment label={getLabelForView(ViewState.PUBLISH)} />,
  },
  {
    path: routePaths[ViewState.DIFF],
    element: <UnderDevelopment label={getLabelForView(ViewState.DIFF)} />,
  },
  {
    path: routePaths[ViewState.ASSETS],
    element: <UnderDevelopment label={getLabelForView(ViewState.ASSETS)} />,
  },
  {
    path: routePaths[ViewState.OUTLINE],
    element: <UnderDevelopment label={getLabelForView(ViewState.OUTLINE)} />,
  },
]

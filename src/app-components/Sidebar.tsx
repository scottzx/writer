import React from "react"
import { useNavigate } from "react-router-dom"
import { Flame, LayoutDashboard, Library, Lightbulb, Newspaper, Settings, X } from "lucide-react"
import { ViewState } from "../app-types"
import { routePaths } from "../router"

interface SidebarProps {
  currentView?: ViewState
  onToggle: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onToggle }) => {
  const navigate = useNavigate()

  const inspirationItems = [
    { id: ViewState.NEWS, label: "新闻中心", icon: Newspaper },
    { id: ViewState.HOTS, label: "热点聚合", icon: Flame }, // 新增：热点聚合入口
    // { id: ViewState.RESEARCH, label: "深度研究", icon: Search }, // 暂时隐藏
  ]

  const creativeItems = [
    { id: ViewState.EDITOR, label: "项目笔记库", icon: Library }, // 整合了编辑器、风格DNA、差异比对
    // { id: ViewState.PUBLISH, label: "发布管理", icon: Smartphone }, // 暂时隐藏发布管理
  ]

  return (
    <aside className="w-64 bg-surface border-r border-border flex flex-col h-screen shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
          <LayoutDashboard size={20} />
        </div>
        <h1 className="font-bold text-lg tracking-tight">TrendEngine</h1>
        <button
          type="button"
          onClick={onToggle}
          className="ml-auto p-1 rounded-lg hover:bg-surfaceHighlight transition-colors text-textSecondary hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 px-4 space-y-6 overflow-y-auto">

        {/* 灵感中心 Group */}
        <div>
          <div className="flex items-center gap-2 px-2 mb-2 text-textSecondary">
            <Lightbulb size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">灵感中心</span>
          </div>
          <div className="space-y-1">
            {inspirationItems.map((item) => {
              const isActive = currentView === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(routePaths[item.id])}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? "text-white bg-primary/5"
                      : "text-textSecondary hover:text-white hover:bg-surfaceHighlight"
                  }`}
                  style={
                    isActive
                      ? {
                          borderLeft: "3px solid rgb(var(--color-primary))",
                          paddingLeft: "calc(0.75rem - 3px)",
                        }
                      : {}
                  }
                >
                  <item.icon size={isActive ? 20 : 18} className={isActive ? "text-primary" : ""} />
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 创作空间 Group */}
        <div>
          <div className="flex items-center gap-2 px-2 mb-2 text-textSecondary">
            <Library size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">创作空间</span>
          </div>
          <div className="space-y-1">
            {creativeItems.map((item) => {
              const isActive = currentView === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(routePaths[item.id])}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? "text-white bg-primary/5"
                      : "text-textSecondary hover:text-white hover:bg-surfaceHighlight"
                  }`}
                  style={
                    isActive
                      ? {
                          borderLeft: "3px solid rgb(var(--color-primary))",
                          paddingLeft: "calc(0.75rem - 3px)",
                        }
                      : {}
                  }
                >
                  <item.icon size={isActive ? 20 : 18} className={isActive ? "text-primary" : ""} />
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surfaceHighlight cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Alex Chen</p>
            <p className="text-xs text-textSecondary truncate">专业版计划</p>
          </div>
          <Settings size={16} className="text-textSecondary" />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

import { useState } from "react"
import { FileText, List } from "lucide-react"
import { FileTree } from "./FileTree"
import { DocumentOutline } from "./DocumentOutline"

type LeftPanelTab = "files" | "outline"

interface LeftPanelProps {
  noteId: string
  content: string
}

/**
 * 左侧面板容器组件
 * 管理文件树和文档大纲的切换
 */
export function LeftPanel({ content }: LeftPanelProps) {
  const [activeTab, setActiveTab] = useState<LeftPanelTab>("files")

  return (
    <div className="w-64 bg-surface border-r border-border hidden lg:flex flex-col">
      {/* 标签切换 */}
      <div className="flex border-b border-border">
        <button
          type="button"
          onClick={() => setActiveTab("files")}
          className={`
            flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors
            ${activeTab === "files"
      ? "text-primary border-b-2 border-primary bg-primary/5"
      : "text-textSecondary hover:text-white hover:bg-surfaceHighlight"
    }
          `}
        >
          <FileText size={16} />
          文件树
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("outline")}
          className={`
            flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors
            ${activeTab === "outline"
      ? "text-primary border-b-2 border-primary bg-primary/5"
      : "text-textSecondary hover:text-white hover:bg-surfaceHighlight"
    }
          `}
        >
          <List size={16} />
          大纲
        </button>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "files" ? <FileTree /> : <DocumentOutline content={content} />}
      </div>
    </div>
  )
}

import React, { useEffect, useState } from "react"
import {
  Activity,
  ArrowLeft,
  GitCompare,
  PenTool,
  Share,
  Upload,
} from "lucide-react"
import { useStore } from "../stores"
import { ProjectList } from "../components/editor/ProjectList"
import { EditorView } from "../components/editor/EditorView"

// --- Sub-Components: Tab Views ---

function StyleDNAView() {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">风格 DNA 分析</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-sm font-bold text-textSecondary uppercase mb-4">核心基调雷达</h3>
            <div className="h-48 flex items-center justify-center relative">
              {/* Mock Radar Chart Visual */}
              <div className="w-32 h-32 border-2 border-primary/30 rounded-full flex items-center justify-center relative">
                <div className="w-20 h-20 border-2 border-primary/50 rounded-full"></div>
                <div className="absolute inset-0 bg-primary/10 rotate-45 transform skew-x-12 blur-xl"></div>
                <div className="absolute top-0 text-xs text-primary font-bold -mt-5">专业性</div>
                <div className="absolute bottom-0 text-xs text-textSecondary -mb-5">娱乐性</div>
                <div className="absolute left-0 text-xs text-textSecondary -ml-8">主观</div>
                <div className="absolute right-0 text-xs text-primary -mr-8">客观</div>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-textSecondary uppercase mb-2">特征维度得分</h3>
            <div>
              <div className="flex justify-between text-sm mb-1 text-white">
                <span>逻辑密度</span>
                {" "}
                <span>8.5/10</span>
              </div>
              <div className="w-full bg-background h-2 rounded-full">
                <div className="w-[85%] bg-blue-500 h-2 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1 text-white">
                <span>情感共鸣</span>
                {" "}
                <span>4.2/10</span>
              </div>
              <div className="w-full bg-background h-2 rounded-full">
                <div className="w-[42%] bg-purple-500 h-2 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1 text-white">
                <span>词汇丰富度</span>
                {" "}
                <span>9.1/10</span>
              </div>
              <div className="w-full bg-background h-2 rounded-full">
                <div className="w-[91%] bg-green-500 h-2 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-sm font-bold text-textSecondary uppercase mb-4">受众画像匹配度</h3>
          <div className="flex gap-4">
            <div className="flex-1 bg-background/50 p-4 rounded-lg border border-primary/30 text-center">
              <div className="text-2xl font-bold text-primary mb-1">92%</div>
              <div className="text-xs text-textSecondary">科技发烧友</div>
            </div>
            <div className="flex-1 bg-background/50 p-4 rounded-lg border border-border text-center">
              <div className="text-2xl font-bold text-white mb-1">65%</div>
              <div className="text-xs text-textSecondary">普通大众</div>
            </div>
            <div className="flex-1 bg-background/50 p-4 rounded-lg border border-border text-center">
              <div className="text-2xl font-bold text-white mb-1">40%</div>
              <div className="text-xs text-textSecondary">青少年学生</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DiffView() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-textSecondary uppercase">当前版本</span>
            <span className="font-bold text-white">v3.2 (自动保存)</span>
          </div>
          <ArrowLeft className="text-textSecondary" size={16} />
          <div className="flex flex-col">
            <span className="text-xs text-textSecondary uppercase">对比版本</span>
            <select className="bg-background border border-border text-sm rounded p-1 text-white">
              <option>v3.0 - 2024/05/20 10:00</option>
              <option>v2.5 - 2024/05/19 18:30</option>
              <option>v1.0 - 初始草稿</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-xs text-green-400">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {" "}
            新增内容
          </div>
          <div className="flex items-center gap-1 text-xs text-red-400">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            {" "}
            删除内容
          </div>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Old Version */}
        <div className="flex-1 border-r border-border p-8 overflow-y-auto bg-surface/30">
          <h3 className="font-mono text-xs text-textSecondary mb-4">v3.0 源文档</h3>
          <p className="text-gray-400 leading-relaxed font-mono text-sm">
            量子计算的承诺长期以来一直徘徊在技术进步的地平线上。
            <span className="bg-red-900/50 text-red-200 decoration-red-500 line-through">
              这是一个遥不可及的梦想。
            </span>
            然而,随着我们深入 21 世纪,这个海市蜃楼正在凝结成一个有形的现实。
          </p>
        </div>
        {/* Right: New Version */}
        <div className="flex-1 p-8 overflow-y-auto bg-background">
          <h3 className="font-mono text-xs text-textSecondary mb-4">v3.2 当前文档</h3>
          <p className="text-gray-300 leading-relaxed font-mono text-sm">
            量子计算的承诺长期以来一直徘徊在技术进步的地平线上。
            <span className="bg-green-900/50 text-green-200">像是一个闪烁着无限算力却又触不可及的海市蜃楼。</span>
            然而,随着我们深入 21 世纪,这个海市蜃楼正在凝结成一个有形的、
            <span className="bg-green-900/50 text-green-200">尽管复杂的</span>
            现实。
          </p>
        </div>
      </div>
    </div>
  )
}

// --- Main Container ---

function EditorWorkspace() {
  const {
    editor,
    loadNotes,
    loadFolders,
    loadChatMessages,
    createNote,
    setActiveNote,
    setActiveTab,
  } = useStore()

  const [localActiveNoteId, setLocalActiveNoteId] = useState<string | null>(null)
  const activeTab = editor.activeTab
  const activeNote = editor.notes.find(n => n.id === localActiveNoteId)

  // 初始化加载数据
  useEffect(() => {
    loadNotes()
    loadFolders()
    loadChatMessages()
  }, [loadNotes, loadFolders, loadChatMessages])

  // 同步 activeNoteId
  useEffect(() => {
    if (editor.activeNoteId !== localActiveNoteId) {
      setLocalActiveNoteId(editor.activeNoteId)
    }
  }, [editor.activeNoteId, localActiveNoteId])

  const handleSelectNote = (id: string) => {
    if (id === "new") {
      const newNoteId = createNote({
        title: "未命名文档",
        content: "",
        status: "draft",
      })
      setActiveNote(newNoteId)
      setLocalActiveNoteId(newNoteId)
    } else {
      setActiveNote(id)
      setLocalActiveNoteId(id)
    }
  }

  const handleBackToList = () => {
    setActiveNote(null)
    setLocalActiveNoteId(null)
  }

  // 如果没有选中的笔记,显示笔记库列表
  if (!localActiveNoteId) {
    return <ProjectList onSelect={handleSelectNote} />
  }

  return (
    <div className="flex flex-col h-full bg-background animate-in slide-in-from-right duration-300">
      {/* Header with Tabs */}
      <div className="h-16 border-b border-border bg-background flex items-center justify-between px-4 shrink-0 z-30">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleBackToList}
            className="p-2 -ml-2 rounded-full hover:bg-surfaceHighlight text-textSecondary hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-sm font-bold text-white">{activeNote?.title || "未命名文档"}</h2>
        </div>

        <div className="flex bg-surface rounded-lg p-1 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("EDITOR")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === "EDITOR" ? "bg-primary text-background shadow" : "text-textSecondary hover:text-white"
            }`}
          >
            <PenTool size={14} />
            {" "}
            写作
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("STYLE")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === "STYLE" ? "bg-primary text-background shadow" : "text-textSecondary hover:text-white"
            }`}
          >
            <Activity size={14} />
            {" "}
            风格 DNA
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("DIFF")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === "DIFF" ? "bg-primary text-background shadow" : "text-textSecondary hover:text-white"
            }`}
          >
            <GitCompare size={14} />
            {" "}
            差异比对
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className="flex items-center gap-2 bg-surface hover:bg-surfaceHighlight text-textSecondary hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-border transition-colors">
            <Share size={14} />
            {" "}
            分享
          </button>
          <button type="button" className="flex items-center gap-2 bg-primary hover:bg-primaryHover text-background px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
            <Upload size={14} />
            {" "}
            发布
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === "EDITOR" && <EditorView noteId={localActiveNoteId} />}
        {activeTab === "STYLE" && <StyleDNAView />}
        {activeTab === "DIFF" && <DiffView />}
      </div>
    </div>
  )
}

export default EditorWorkspace

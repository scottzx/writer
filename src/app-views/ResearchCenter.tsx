import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, CheckSquare, Clock, ExternalLink, FileText, GripVertical, MoreVertical, PenTool, Plus, Search, Sparkles, Square } from "lucide-react"
import { ViewState } from "../app-types"
import { routePaths } from "../router"

interface ResearchCenterProps {
  onNavigate?: (view: ViewState) => void
}

// --- Fragment Card Component (Used in Detail) ---
function FragmentCard({ type, source, content, isChecked }: any) {
  const [checked, setChecked] = useState(isChecked)

  return (
    <div className={`group flex gap-4 p-4 rounded-xl border transition-all duration-200 ${checked ? "bg-primary/5 border-primary/50" : "bg-surface border-border hover:border-textSecondary/50"}`}>
      <button onClick={() => setChecked(!checked)} className={`mt-1 flex-shrink-0 transition-colors ${checked ? "text-primary" : "text-textSecondary group-hover:text-white"}`}>
        {checked ? <CheckSquare size={20} /> : <Square size={20} />}
      </button>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase bg-surfaceHighlight border border-border px-1.5 py-0.5 rounded text-textSecondary">{type}</span>
          <span className="text-xs text-textSecondary font-medium">{source}</span>
        </div>
        <p className={`text-sm leading-relaxed ${checked ? "text-white" : "text-gray-300"}`}>{content}</p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
        <button className="p-1.5 rounded hover:bg-surfaceHighlight text-textSecondary hover:text-white"><ExternalLink size={14} /></button>
        <button className="p-1.5 rounded hover:bg-surfaceHighlight text-textSecondary hover:text-white"><GripVertical size={14} /></button>
      </div>
    </div>
  )
}

// --- Project List Component ---
function ResearchList({ onSelectProject }: { onSelectProject: (id: string) => void }) {
  const projects = [
    {
      id: "1",
      title: "教育中的 AI 变革",
      desc: "探索生成式 AI 如何重塑 K-12 教育体系及个性化学习路径。",
      date: "1 分钟前",
      status: "进行中",
      progress: 80,
      tags: ["教育", "AI", "SaaS"],
    },
    {
      id: "2",
      title: "2024 新能源汽车出海策略",
      desc: "针对欧洲市场的关税政策变化及供应链本地化分析。",
      date: "3 小时前",
      status: "已归档",
      progress: 100,
      tags: ["EV", "全球化", "政策"],
    },
    {
      id: "3",
      title: "火星殖民：伦理与技术",
      desc: "从 Artemis 计划看深空探索的长期生存挑战。",
      date: "2 天前",
      status: "进行中",
      progress: 45,
      tags: ["太空", "科技", "伦理"],
    },
    {
      id: "4",
      title: "数字游民签证经济学",
      desc: "东南亚与南欧国家吸引远程工作者政策的对比研究。",
      date: "5 天前",
      status: "草稿",
      progress: 20,
      tags: ["经济", "生活方式"],
    },
  ]

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">深度研究空间</h1>
            <p className="text-textSecondary">管理您的研究项目、素材收集与观点整理。</p>
          </div>
          <button
            onClick={() => onSelectProject("new")}
            className="bg-primary hover:bg-primaryHover text-background px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            {" "}
            新建研究项目
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
            <input
              type="text"
              placeholder="搜索研究项目..."
              className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <button className="px-4 py-2 bg-surface border border-border rounded-lg text-textSecondary hover:text-white text-sm font-medium transition-colors">
            最近更新
          </button>
          <button className="px-4 py-2 bg-surface border border-border rounded-lg text-textSecondary hover:text-white text-sm font-medium transition-colors">
            筛选状态
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="bg-surface border border-border hover:border-primary/50 rounded-xl p-5 cursor-pointer group transition-all hover:bg-surfaceHighlight/50 hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${project.status === "已归档" ? "bg-background text-textSecondary" : "bg-primary/10 text-primary"}`}>
                  <FileText size={20} />
                </div>
                <button className="p-1 hover:bg-background rounded text-textSecondary hover:text-white">
                  <MoreVertical size={16} />
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors truncate">{project.title}</h3>
              <p className="text-sm text-textSecondary leading-relaxed line-clamp-2 mb-4 h-10">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase font-medium px-2 py-0.5 rounded bg-background border border-border text-textSecondary">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-textSecondary">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {" "}
                  {project.date}
                </span>
                <span className="flex items-center gap-1 font-medium text-white">
                  {project.progress}
                  %
                  {" "}
                  <span className="text-textSecondary font-normal">完成</span>
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-1 mt-2">
                <div className="bg-primary h-1 rounded-full" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>
          ))}

          {/* Create New Placeholder Card */}
          <button
            onClick={() => onSelectProject("new")}
            className="border-2 border-dashed border-border rounded-xl p-5 flex flex-col items-center justify-center text-center gap-3 text-textSecondary hover:text-primary hover:border-primary/50 hover:bg-surfaceHighlight/30 transition-all min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <span className="font-medium text-sm">创建新项目</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Detail Workspace Component (Existing Content) ---
function ResearchDetail({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate()

  const handleNavigateToEditor = () => {
    navigate(routePaths[ViewState.EDITOR])
  }

  return (
    <div className="flex flex-col h-full bg-background relative animate-in slide-in-from-right duration-300">

      {/* Top Bar for Project Context */}
      <div className="h-16 border-b border-border bg-background/95 backdrop-blur z-10 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-surfaceHighlight text-textSecondary hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">教育中的 AI 变革</h2>
              <p className="text-xs text-textSecondary">最后编辑：刚刚 • 自动保存</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-textSecondary">
            已选素材:
            <span className="text-primary font-bold">5</span>
          </span>
          <button className="p-2 hover:bg-surfaceHighlight rounded text-textSecondary hover:text-white">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="max-w-5xl mx-auto flex gap-6">

          {/* Main Content Stream */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                核心观点碎片
              </h3>
              <div className="flex flex-col gap-3">
                <FragmentCard
                  isChecked
                  type="核心论点"
                  source="MIT Technology Review"
                  content="自适应算法通过实时分析解题步骤，比传统静态考试能提供更准确的学生能力评估指标。"
                />
                <FragmentCard
                  isChecked
                  type="反面观点"
                  source="The Atlantic"
                  content="教育本质上是社会契约。AI 可以传递信息，但缺乏指导学生克服挫折所需的共情能力。"
                />
                <FragmentCard
                  isChecked={false}
                  type="数据支持"
                  source="EdTech Magazine"
                  content="虽然初始硬件部署成本高昂（约 $500/生），但长期节省的教科书许可费使得 AI 方案在 5 年周期内具备经济可行性。"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                相关案例与事实
              </h3>
              <div className="flex flex-col gap-3">
                <FragmentCard
                  isChecked
                  type="案例"
                  source="Khan Academy 报告"
                  content="Khanmigo 试点项目显示，使用 AI 辅导的学生在数学科目上的参与度提升了 35%。"
                />
                <FragmentCard
                  isChecked={false}
                  type="事实"
                  source="UNESCO"
                  content="2023 年，全球已有超过 15 个国家发布了关于在基础教育中整合生成式 AI 的指导方针。"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Collection/Status */}
          <div className="w-72 hidden xl:block">
            <div className="sticky top-6 space-y-4">
              <div className="bg-surface border border-border rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-3">研究进度</h3>
                <div className="flex items-center justify-between text-xs text-textSecondary mb-1">
                  <span>素材收集</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-background rounded-full h-1.5 mb-4">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "80%" }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-textSecondary mb-1">
                  <span>观点覆盖</span>
                  <span>中等</span>
                </div>
                <div className="w-full bg-background rounded-full h-1.5">
                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>

              <div className="bg-surface border border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-surfaceHighlight cursor-pointer transition-colors h-32">
                <Plus size={24} className="text-textSecondary" />
                <p className="text-xs text-textSecondary font-medium">添加外部链接或笔记</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar for Writing */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <div className="bg-surfaceHighlight border border-border shadow-2xl rounded-full p-2 pl-6 pr-2 flex items-center gap-6 pointer-events-auto animate-in slide-in-from-bottom-4">
          <div className="flex flex-col">
            <span className="text-xs text-textSecondary uppercase font-bold tracking-wider">下一步</span>
            <span className="text-sm font-bold text-white">准备好开始创作了吗？</span>
          </div>
          <button
            onClick={handleNavigateToEditor}
            className="bg-primary hover:bg-primaryHover text-background px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-primary/20"
          >
            <PenTool size={18} />
            唤起大纲写作
          </button>
        </div>
      </div>

    </div>
  )
}

// --- Main Container ---
const ResearchCenter: React.FC<ResearchCenterProps> = () => {
  // Simple state to toggle between list and detail view
  // In a real app, this might be handled by router params (e.g., /research vs /research/:id)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)

  if (activeProjectId) {
    return <ResearchDetail onBack={() => setActiveProjectId(null)} />
  }

  return <ResearchList onSelectProject={setActiveProjectId} />
}

export default ResearchCenter

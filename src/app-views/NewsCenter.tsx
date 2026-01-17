import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BarChart, Filter, History, PenLine, Search, TrendingUp, X } from "lucide-react"
import { ViewState } from "../app-types"
import { routePaths } from "../router"
import { newsCenterData } from "../data/news-center-data" // Import static data
import TimelineAnalysis from "./TimelineAnalysis" // Import Timeline component

interface NewsCenterProps {
  onNavigate?: (view: ViewState) => void
}

function NewsCard({ source, time, title, snippet, score, trend, color, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-all group flex flex-col h-full cursor-pointer hover:bg-surfaceHighlight/50">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className={`flex items-center justify-center w-6 h-6 rounded ${color} bg-opacity-10 text-xs font-bold`}>
            {source[0]}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: color.replace("text-", "") }}>{source}</span>
        </div>
        <span className="text-xs text-textSecondary bg-background px-2 py-1 rounded">{time}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <div className="relative pl-3 border-l-2 border-primary/30 mb-4 flex-1">
        <p className="text-sm text-textSecondary leading-relaxed line-clamp-3">
          {snippet}
        </p>
      </div>
      <div className="mt-auto pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-textSecondary">热度指数</span>
          <span className="text-sm font-bold text-white flex items-center gap-1">
            {score}
            M
            {trend === "up" ? <TrendingUp size={14} className="text-green-500" /> : <TrendingUp size={14} className="text-red-500 rotate-180" />}
          </span>
        </div>
        <div className="w-full bg-background rounded-full h-1.5 mb-4">
          <div className="bg-gradient-to-r from-primary to-blue-600 h-1.5 rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-background hover:bg-primary hover:text-background text-white text-sm font-semibold py-2.5 rounded-lg transition-all">
          <PenLine size={16} />
          查看分析
        </button>
      </div>
    </div>
  )
}

const NewsCenter: React.FC<NewsCenterProps> = () => {
  const navigate = useNavigate()
  const [selectedNews, setSelectedNews] = useState<any>(null)

  const handleNewsClick = (news: any) => {
    setSelectedNews(news)
  }

  const closeTimeline = () => {
    setSelectedNews(null)
  }

  const handleProceedToResearch = () => {
    navigate(routePaths[ViewState.RESEARCH])
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background p-8 relative">

      {/* Modal for Timeline Analysis */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-background border border-border rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-border bg-surface">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <History size={18} className="text-primary" />
                趋势透视：
                {selectedNews.title}
              </h2>
              <button onClick={closeTimeline} className="p-2 hover:bg-surfaceHighlight rounded-full text-textSecondary hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <TimelineAnalysis
                isModal
                onProceed={handleProceedToResearch}
                eventData={selectedNews?.details}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">发现当前热门趋势</h1>
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-textSecondary">
              <Search size={20} />
            </div>
            <input
              type="text"
              className="w-full bg-surface border-none rounded-xl py-4 pl-12 pr-4 text-white placeholder-textSecondary focus:ring-2 focus:ring-primary shadow-lg"
              placeholder="搜索趋势、关键词或实体..."
            />
            <button className="absolute right-2 top-2 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              搜索
            </button>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="text-sm text-textSecondary py-1">最近搜索：</span>
            {["AI 法规", "中国新能源汽车", "热门游戏黑神话", "半导体供应链"].map(tag => (
              <button key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full border border-border bg-surface hover:border-primary text-textSecondary text-xs hover:text-primary transition-colors">
                <History size={12} />
                {" "}
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-b border-border pb-4 gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <button className="flex items-center gap-2 bg-white text-background px-4 py-2 rounded-lg text-sm font-bold">
              <Filter size={16} />
              {" "}
              所有来源
            </button>
            {["微博", "知乎", "今日头条", "百度"].map(p => (
              <button key={p} className="flex items-center gap-2 bg-surface text-textSecondary hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-textSecondary">
            <span className="flex items-center gap-1 cursor-pointer hover:text-primary">
              排序： 热度
              <BarChart size={16} />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsCenterData.map((news, index) => (
            <NewsCard
              key={index}
              onClick={() => handleNewsClick(news)}
              {...news}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsCenter

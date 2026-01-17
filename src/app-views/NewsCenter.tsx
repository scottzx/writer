import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BarChart, Filter, History, PenLine, Search, TrendingUp, X } from "lucide-react"
import { ViewState } from "../app-types"
import { routePaths } from "../router"
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
              <TimelineAnalysis isModal onProceed={handleProceedToResearch} />
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
          <NewsCard
            onClick={() => handleNewsClick({ title: "Sora 模型发布引爆视频生成领域" })}
            source="知乎"
            color="text-blue-500"
            time="2小时前"
            title="Sora 模型发布引爆视频生成领域：新行业标准的确立？"
            snippet="OpenAI 发布的 Sora 模型在科技界引发震动。讨论主要集中在算力需求、物理世界模拟能力以及对传统影视制作流程的潜在冲击。"
            score="9.8"
            trend="up"
          />
          <NewsCard
            onClick={() => handleNewsClick({ title: "国产新能源汽车出海" })}
            source="微博"
            color="text-red-500"
            time="15分钟前"
            title="国产新能源汽车出海：欧洲市场季度销量创新高"
            snippet="最新季度财报显示，国产 EV 品牌在欧洲市场的出口量激增 40%。分析师正在辩论补贴政策的可持续性以及充电基础设施的长期增长潜力。"
            score="12.4"
            trend="up"
          />
          <NewsCard
            onClick={() => handleNewsClick({ title: "北京国际电影节" })}
            source="百度"
            color="text-blue-600"
            time="45分钟前"
            title="北京国际电影节公布主旨演讲嘉宾名单"
            snippet="嘉宾阵容包括来自五大洲的获奖导演。社交媒体上的讨论热点集中在几位独立 VR 电影制作人的意外入选。"
            score="5.2"
            trend="down"
          />
          <NewsCard
            onClick={() => handleNewsClick({ title: "科技行业裁员" })}
            source="今日头条"
            color="text-red-600"
            time="3小时前"
            title="科技行业裁员与 AI 人才招聘热潮：2024 年的悖论"
            snippet="数据显示，企业编制正显著向机器学习岗位倾斜。传统软件工程职位的薪资增长停滞，而 AI 专家的需求量供不应求。"
            score="8.1"
            trend="up"
          />
          <NewsCard
            onClick={() => handleNewsClick({ title: "SpaceX 星舰发射" })}
            source="微博"
            color="text-red-500"
            time="1小时前"
            title="SpaceX 星舰发射：震撼画面刷屏社交网络"
            snippet="助推器捕获尝试的视频片段在社交媒体上疯传。话题 #星舰发射# 登顶热搜榜，每小时互动量数百万次。"
            score="22"
            trend="up"
          />
          <NewsCard
            onClick={() => handleNewsClick({ title: "远程办公 2.0" })}
            source="知乎"
            color="text-blue-500"
            time="5小时前"
            title="远程办公 2.0：亚洲多国推出数字游民签证"
            snippet="日本和韩国相继推出针对远程工作者的新签证类别。外籍人士分享了关于税收影响和生活方式转变的真实体验。"
            score="4.5"
            trend="up"
          />
        </div>
      </div>
    </div>
  )
}

export default NewsCenter

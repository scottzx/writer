import React, { useEffect } from "react"
import { ChevronDown, ChevronUp, RefreshCw, Sparkles } from "lucide-react"
import { useStore } from "../../stores"
import { MIN_ARTICLES_FOR_ANALYSIS } from "../../types/writingStyle"

export default function WritingStyleCard() {
  const {
    writingStyle,
    library,
    loadWritingStyle,
    analyzeWritingStyle,
    checkAutoUpdate,
  } = useStore()

  const [isExpanded, setIsExpanded] = React.useState(false)

  useEffect(() => {
    loadWritingStyle()
  }, [loadWritingStyle])

  useEffect(() => {
    // 检查是否需要自动更新
    checkAutoUpdate()
  }, [checkAutoUpdate])

  // 首次自动触发分析
  useEffect(() => {
    const articleCount = library.articles.length
    const hasStyle = writingStyle.data !== null
    const isAnalyzing = writingStyle.isAnalyzing

    if (articleCount >= MIN_ARTICLES_FOR_ANALYSIS && !hasStyle && !isAnalyzing) {
      analyzeWritingStyle()
    }
  }, [library.articles.length, writingStyle.data, writingStyle.isAnalyzing, analyzeWritingStyle])

  const articleCount = library.articles.length
  const remaining = MIN_ARTICLES_FOR_ANALYSIS - articleCount
  const canAnalyze = articleCount >= MIN_ARTICLES_FOR_ANALYSIS

  // 文章数量不足时的提示
  if (!canAnalyze) {
    return (
      <div className="mx-4 mb-4 p-4 rounded-xl border border-border bg-surface/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surfaceHighlight flex items-center justify-center">
            <Sparkles size={20} className="text-textSecondary" />
          </div>
          <div>
            <h3 className="font-medium text-white">我的写作风格</h3>
            <p className="text-sm text-textSecondary">
              再上传
              {" "}
              <span className="text-primary font-medium">{remaining}</span>
              {" "}
              篇文章即可分析写作风格
            </p>
          </div>
        </div>
      </div>
    )
  }

  // 分析中状态
  if (writingStyle.isAnalyzing) {
    return (
      <div className="mx-4 mb-4 p-4 rounded-xl border border-primary/30 bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <RefreshCw size={20} className="text-primary animate-spin" />
          </div>
          <div>
            <h3 className="font-medium text-white">正在分析写作风格...</h3>
            <p className="text-sm text-textSecondary">
              基于
              {articleCount}
              {" "}
              篇文章提取 Style DNA
            </p>
          </div>
        </div>
      </div>
    )
  }

  // 错误状态
  if (writingStyle.error) {
    return (
      <div className="mx-4 mb-4 p-4 rounded-xl border border-red-500/30 bg-red-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <Sparkles size={20} className="text-red-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">分析失败</h3>
              <p className="text-sm text-red-400">{writingStyle.error}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => analyzeWritingStyle()}
            className="px-3 py-1.5 rounded-lg bg-surfaceHighlight hover:bg-surface text-sm text-white transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    )
  }

  // 有数据时显示
  const style = writingStyle.data
  if (!style) return null

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="mx-4 mb-4 p-4 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-white">我的写作风格</h3>
            <p className="text-xs text-textSecondary">
              基于
              {" "}
              {style.analyzedArticleCount}
              {" "}
              篇文章 · 更新于
              {formatDate(style.updatedAt)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => analyzeWritingStyle()}
          disabled={writingStyle.isAnalyzing}
          className="p-2 rounded-lg hover:bg-surfaceHighlight text-textSecondary hover:text-white transition-colors"
          title="重新分析"
        >
          <RefreshCw size={16} className={writingStyle.isAnalyzing ? "animate-spin" : ""} />
        </button>
      </div>

      {/* 摘要 */}
      <div className="space-y-2 mb-3">
        <div className="text-sm">
          <span className="text-primary font-medium">人设：</span>
          <span className="text-white ml-1">{style.summary.persona}</span>
        </div>
        <div className="text-sm">
          <span className="text-primary font-medium">语气：</span>
          <span className="text-textSecondary ml-1">{style.summary.tone}</span>
        </div>
      </div>

      {/* 展开/收起 */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 text-xs text-textSecondary hover:text-white transition-colors"
      >
        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {isExpanded ? "收起详情" : "查看完整分析"}
      </button>

      {/* 展开内容 */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border space-y-3">
          <div>
            <h4 className="text-xs text-primary font-medium mb-1">句式与节奏</h4>
            <ul className="text-xs text-textSecondary space-y-1">
              {style.summary.syntaxRhythm.map((item, i) => (
                <li key={i}>
                  •
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs text-primary font-medium mb-1">用词与修辞</h4>
            <ul className="text-xs text-textSecondary space-y-1">
              {style.summary.lexicon.map((item, i) => (
                <li key={i}>
                  •
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs text-primary font-medium mb-1">结构模版</h4>
            <p className="text-xs text-textSecondary">
              开头：
              {style.summary.structure.opening}
            </p>
            <p className="text-xs text-textSecondary">
              结尾：
              {style.summary.structure.ending}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

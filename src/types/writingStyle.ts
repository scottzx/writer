// 写作风格类型定义
export interface WritingStyleSummary {
  persona: string // 核心人设
  syntaxRhythm: string[] // 句式与节奏指令
  lexicon: string[] // 用词与修辞指令
  tone: string // 情绪基调
  structure: {
    opening: string // 开头模版
    ending: string // 结尾模版
  }
}

export interface WritingStyle {
  id: string
  // 分析来源
  analyzedArticleIds: string[] // 参与分析的文章ID
  analyzedArticleCount: number // 文章数量

  // 风格摘要（用于 UI 展示）
  summary: WritingStyleSummary

  // 完整 Markdown 内容（供 AI 写作流程使用）
  fullContent: string // writingstyle.md 完整内容

  // 元数据
  createdAt: number
  updatedAt: number
  nextAutoUpdate: number // 下次自动更新时间（每周）
}

// 最少文章数量要求
export const MIN_ARTICLES_FOR_ANALYSIS = 10

// 自动更新间隔（一周）
export const AUTO_UPDATE_INTERVAL = 7 * 24 * 60 * 60 * 1000

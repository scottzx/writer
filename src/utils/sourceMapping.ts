// sourceId 到 JSON 文件名的映射
export const sourceIdToJsonFile: Record<string, string> = {
  // 社交媒体
  "weibo": "weibo",
  "zhihu": "zhihu",
  "douban": "douban",

  // 科技媒体
  "36kr-renqi": "36kr-renqi",
  "juejin": "juejin",
  "sspai": "sspai",
  "hackernews": "hackernews",
  "producthunt": "producthunt",

  // 视频平台
  "bilibili-hot-search": "bilibili-hot-search",
  "douyin": "douyin",
  "iqiyi-hot-ranklist": "iqiyi-hot-ranklist",
  "qqvideo-tv-hotsearch": "qqvideo-tv-hotsearch",

  // 财经
  "xueqiu-hotstock": "xueqiu-hotstock",
  "wallstreetcn-hot": "wallstreetcn-hot",

  // 新闻
  "baidu": "baidu",
  "toutiao": "toutiao",
  "thepaper": "thepaper",
  "ifeng": "ifeng",
  "tencent-hot": "tencent-hot",
  "tieba": "tieba",

  // 游戏
  "steam": "steam",

  // 体育
  "hupu": "hupu",

  // 开发者社区
  "github-trending-today": "github-trending-today",
  "nowcoder": "nowcoder",

  // 其他
  "coolapk": "coolapk",
  "chongbuluo-hot": "chongbuluo-hot",
  "cls-hot": "cls-hot",
  "freebuf": "freebuf",
}

// 获取 JSON 文件名
export function getJsonFileName(sourceId: string): string | null {
  return sourceIdToJsonFile[sourceId] || null
}

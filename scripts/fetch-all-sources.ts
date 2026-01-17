#!/usr/bin/env tsx

/**
 * Fetch all news sources data and save to JSON files
 *
 * This script provides two ways to fetch data:
 * 1. Manual: Open browser console and run the provided JavaScript code
 * 2. Process: Process previously fetched data
 *
 * Usage:
 *   npx tsx scripts/fetch-all-sources.ts              # Show manual instructions
 *   npx tsx scripts/fetch-all-sources.ts process <file>  # Process fetched data
 */

import fs from "node:fs/promises"
import path from "node:path"

// Configuration
const CONFIG = {
  outputDir: "./scripts/output/sources/",
  sources: [
    "36kr-renqi",
    "baidu",
    "bilibili-hot-search",
    "chongbuluo-hot",
    "cls-hot",
    "coolapk",
    "douban",
    "douyin",
    "freebuf",
    "github-trending-today",
    "hackernews",
    "hupu",
    "ifeng",
    "iqiyi-hot-ranklist",
    "juejin",
    "nowcoder",
    "producthunt",
    "qqvideo-tv-hotsearch",
    "sspai",
    "steam",
    "tencent-hot",
    "thepaper",
    "tieba",
    "toutiao",
    "wallstreetcn-hot",
    "weibo",
    "xueqiu-hotstock",
    "zhihu",
  ],
}

// Source name mapping
const SOURCE_NAMES: Record<string, string> = {
  "36kr-renqi": "36氪人气",
  "baidu": "百度热搜",
  "bilibili-hot-search": "B站热搜",
  "chongbuluo-hot": "虫部落",
  "cls-hot": "财联社",
  "coolapk": "酷安",
  "douban": "豆瓣",
  "douyin": "抖音",
  "freebuf": "Freebuf",
  "github-trending-today": "GitHub",
  "hackernews": "Hacker News",
  "hupu": "虎扑",
  "ifeng": "凤凰网",
  "iqiyi-hot-ranklist": "爱奇艺",
  "juejin": "掘金",
  "nowcoder": "牛客网",
  "producthunt": "Product Hunt",
  "qqvideo-tv-hotsearch": "腾讯视频",
  "sspai": "少数派",
  "steam": "Steam",
  "tencent-hot": "腾讯新闻",
  "thepaper": "澎湃新闻",
  "tieba": "贴吧",
  "toutiao": "今日头条",
  "wallstreetcn-hot": "华尔街见闻",
  "weibo": "微博",
  "xueqiu-hotstock": "雪球",
  "zhihu": "知乎",
}

// Enhanced output format with metadata
interface SourceDataFile {
  sourceId: string
  sourceName: string
  fetchTime: string
  updatedTime: number | string
  status: "success" | "cache" | "error"
  itemCount: number
  items: Array<{
    rank: number
    id: string | number
    title: string
    url: string
    mobileUrl?: string
    pubDate?: number | string
    extra?: {
      info?: string
      hover?: string
      date?: number | string
      snippet?: string
    }
  }>
}

/**
 * Fetch data for a single source from the API
 * Note: This function should be called from a browser context
 */
async function _fetchSourceData(baseUrl: string, sourceId: string): Promise<any> {
  try {
    const response = await fetch(`${baseUrl}/api/s?id=${encodeURIComponent(sourceId)}`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching ${sourceId}:`, error)
    return null
  }
}

/**
 * Save source data to JSON file
 */
async function saveSourceData(
  sourceId: string,
  sourceName: string,
  data: any,
  status: "success" | "cache" | "error",
) {
  const outputDir = CONFIG.outputDir
  await fs.mkdir(outputDir, { recursive: true })

  const outputFile = path.join(outputDir, `${sourceId}.json`)
  const fetchTime = new Date().toISOString()

  const output: SourceDataFile = {
    sourceId,
    sourceName,
    fetchTime,
    updatedTime: data?.updatedTime || 0,
    status,
    itemCount: data?.data?.length || 0,
    items: (data?.data || []).map((item: any, index: number) => ({
      rank: index + 1,
      id: item.id,
      title: item.title,
      url: item.url,
      mobileUrl: item.mobileUrl,
      pubDate: item.pubDate,
      extra: item.extra
        ? {
            info: item.extra.info,
            hover: item.extra.hover,
            date: item.extra.date,
            snippet: item.extra.snippet,
          }
        : undefined,
    })),
  }

  await fs.writeFile(outputFile, JSON.stringify(output, null, 2), "utf-8")
  console.log(`✅ Saved ${sourceId}.json (${output.itemCount} items)`)
}

/**
 * Main function to fetch all sources using browser
 */
async function main() {
  console.log("🚀 NewsNow Source Data Fetcher")
  console.log(`📰 Fetching ${CONFIG.sources.length} sources...`)
  console.log("⚠️  Note: This script requires running in a browser context to avoid Cloudflare blocks")
  console.log("")
  console.log("To use this script:")
  console.log("1. Open https://newsnow.busiyi.world in a browser")
  console.log("2. Open browser console (F12)")
  console.log("3. Run the following code:")
  const browserScript = `
// Copy all sources and fetch data
const sources = ['${CONFIG.sources.join("', '")}'];
const results = {};

for (const sourceId of sources) {
  console.log(\`Fetching \${sourceId}...\`);
  try {
    const response = await fetch(\`/api/s?id=\${encodeURIComponent(sourceId)}\`);
    const data = await response.json();
    results[sourceId] = data;
    console.log(\`✅ \${sourceId}: \${data.data?.length || 0} items\`);
  } catch (error) {
    console.error(\`❌ \${sourceId}:\`, error);
    results[sourceId] = null;
  }
}

// Download results as JSON
const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = \`newsnow-sources-\${new Date().toISOString().split('T')[0]}.json\`;
a.click();
`
  console.log(browserScript)

  console.log("")
  console.log("💡 Alternative: Run the Node.js script after getting the data")
  console.log("   Save the downloaded JSON as \"browser-data.json\" and run:")
  console.log("   npx tsx scripts/fetch-all-sources.ts process browser-data.json")
}

// Check if we're processing downloaded data
const args = process.argv.slice(2)
if (args[0] === "process" && args[1]) {
  const inputFile = args[1]
  console.log(`📂 Processing ${inputFile}...`)

  const rawData = await fs.readFile(inputFile, "utf-8")
  const browserData = JSON.parse(rawData)

  let successCount = 0
  let errorCount = 0

  for (const [sourceId, data] of Object.entries(browserData)) {
    if (data && typeof data === "object" && "data" in data) {
      await saveSourceData(
        sourceId,
        SOURCE_NAMES[sourceId] || sourceId,
        data,
        data.status || "success",
      )
      successCount++
    } else {
      console.warn(`⚠️  Skipping ${sourceId}: invalid data`)
      errorCount++
    }
  }

  console.log("")
  console.log(`✨ Processing complete!`)
  console.log(`📁 Output directory: ${path.resolve(CONFIG.outputDir)}`)
  console.log(`✅ Success: ${successCount}, ❌ Errors: ${errorCount}`)
} else {
  main().catch(console.error)
}

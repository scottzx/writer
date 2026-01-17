#!/usr/bin/env tsx

/**
 * Process browser-fetched data and save to individual JSON files
 * Usage: npx tsx scripts/process-browser-data.ts <input-json-file>
 */

import fs from "node:fs/promises"
import path from "node:path"

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
      icon?: any
    }
  }>
}

async function saveSourceData(
  sourceId: string,
  data: any,
  outputDir: string,
) {
  await fs.mkdir(outputDir, { recursive: true })

  const outputFile = path.join(outputDir, `${sourceId}.json`)
  const fetchTime = new Date().toISOString()

  const output: SourceDataFile = {
    sourceId,
    sourceName: SOURCE_NAMES[sourceId] || sourceId,
    fetchTime,
    updatedTime: data?.updatedTime || 0,
    status: data?.status || (data?.error ? "error" : "success"),
    itemCount: data?.items?.length || 0,
    items: (data?.items || []).map((item: any, index: number) => ({
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
            icon: item.extra.icon,
          }
        : undefined,
    })),
  }

  await fs.writeFile(outputFile, JSON.stringify(output, null, 2), "utf-8")
  return { sourceId, itemCount: output.itemCount, status: output.status }
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log("Usage: npx tsx scripts/process-browser-data.ts <input-json-file>")
    console.log("")
    console.log("Example: npx tsx scripts/process-browser-data.ts browser-data.json")
    process.exit(1)
  }

  const inputFile = args[0]
  console.log(`📂 Reading data from ${inputFile}...`)

  const rawData = await fs.readFile(inputFile, "utf-8")
  const browserData = JSON.parse(rawData)

  const outputDir = "./scripts/output/sources"
  console.log(`📁 Output directory: ${path.resolve(outputDir)}`)
  console.log("")

  const results = {
    success: 0,
    cache: 0,
    error: 0,
    total: 0,
    sources: [] as Array<{ sourceId: string, itemCount: number, status: string }>,
  }

  for (const [sourceId, data] of Object.entries(browserData)) {
    try {
      const result = await saveSourceData(sourceId, data, outputDir)

      results.total++
      if (result.status === "success") results.success++
      else if (result.status === "cache") results.cache++
      else results.error++

      results.sources.push(result)

      const icon = result.status === "error" ? "❌" : result.status === "cache" ? "💾" : "✅"
      console.log(`${icon} ${result.sourceId}.json (${result.itemCount} items)`)
    } catch (error) {
      results.error++
      console.error(`❌ Failed to save ${sourceId}:`, error)
    }
  }

  console.log("")
  console.log("✨ Processing complete!")
  console.log(`📊 Summary:`)
  console.log(`   Total: ${results.total}`)
  console.log(`   ✅ Success: ${results.success}`)
  console.log(`   💾 Cache: ${results.cache}`)
  console.log(`   ❌ Error: ${results.error}`)
  console.log(``)
  console.log(`📁 Output directory: ${path.resolve(outputDir)}`)

  // Generate summary file
  const summaryFile = path.join(outputDir, "_summary.json")
  const summary = {
    fetchTime: new Date().toISOString(),
    total: results.total,
    success: results.success,
    cache: results.cache,
    error: results.error,
    sources: results.sources,
  }

  await fs.writeFile(summaryFile, JSON.stringify(summary, null, 2), "utf-8")
  console.log(`📄 Summary file: ${summaryFile}`)
}

main().catch(console.error)

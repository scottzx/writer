/**
 * Mock API server for local development
 * Run with: tsx server/mock-api.ts
 */
import { createServer } from "node:http"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Import using relative paths
const _typesModule = await import(join(__dirname, "../shared/types"))
const sourcesModule = await import(join(__dirname, "../shared/sources"))

type SourceID = typeof _typesModule.SourceID
type SourceResponse = typeof _typesModule.SourceResponse
type NewsItem = typeof _typesModule.NewsItem
const sources = sourcesModule.sources

const port = 3001

// Generate mock news items for each source
function generateMockNews(sourceId: SourceID): NewsItem[] {
  const source = sources[sourceId]
  const items: NewsItem[] = []

  const count = source.type === "hottest" ? 20 : 10

  for (let i = 1; i <= count; i++) {
    items.push({
      id: `${sourceId}-${i}`,
      title: `${source.name} - 热点新闻 ${i}`,
      url: `https://example.com/${sourceId}/${i}`,
      mobileUrl: `https://m.example.com/${sourceId}/${i}`,
      pubDate: Date.now() - i * 3600000,
      extra: {
        hover: `点击查看详情`,
        date: Date.now() - i * 3600000,
      },
    })
  }

  return items
}

// Cache for generated responses
const responseCache = new Map<SourceID, SourceResponse>()

function getSourceResponse(sourceId: SourceID): SourceResponse {
  if (responseCache.has(sourceId)) {
    return responseCache.get(sourceId)!
  }

  const response: SourceResponse = {
    status: "success",
    id: sourceId,
    updatedTime: Date.now(),
    items: generateMockNews(sourceId),
  }

  responseCache.set(sourceId, response)
  return response
}

async function handleRequest(req: any, res: any) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    res.writeHead(200)
    res.end()
    return
  }

  const url = new URL(req.url, `http://${req.headers.host}`)

  // Enable login endpoint
  if (url.pathname === "/api/enable-login") {
    res.setHeader("Content-Type", "application/json")
    res.writeHead(200)
    res.end(JSON.stringify({
      enable: true,
      url: "https://login.example.com",
    }))
    return
  }

  // Single source endpoint
  if (url.pathname === "/api/s") {
    const sourceId = url.searchParams.get("id") as SourceID
    const _latest = url.searchParams.has("latest")

    if (!sourceId || !(sourceId in sources)) {
      res.setHeader("Content-Type", "application/json")
      res.writeHead(400)
      res.end(JSON.stringify({ error: "Invalid source ID" }))
      return
    }

    const response = getSourceResponse(sourceId)
    res.setHeader("Content-Type", "application/json")
    res.writeHead(200)
    res.end(JSON.stringify(response))
    return
  }

  // Multiple sources endpoint (entire batch)
  if (url.pathname === "/api/s/entire") {
    if (req.method !== "POST") {
      res.setHeader("Content-Type", "application/json")
      res.writeHead(405)
      res.end(JSON.stringify({ error: "Method not allowed" }))
      return
    }

    let body = ""
    req.on("data", (chunk: any) => {
      body += chunk
    })
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body) as { sources: SourceID[] }
        const validSources = parsed.sources.filter(id => id in sources)
        const responses = validSources.map(sourceId => getSourceResponse(sourceId))
        res.setHeader("Content-Type", "application/json")
        res.writeHead(200)
        res.end(JSON.stringify(responses))
      } catch {
        res.setHeader("Content-Type", "application/json")
        res.writeHead(400)
        res.end(JSON.stringify({ error: "Invalid JSON" }))
      }
    })
    return
  }

  // 404 for unknown endpoints
  res.setHeader("Content-Type", "application/json")
  res.writeHead(404)
  res.end(JSON.stringify({ error: "Not found" }))
}

const server = createServer(handleRequest)

server.listen(port, () => {
  console.log(`\n🚀 Mock API server running at http://localhost:${port}`)
  console.log(`📰 Mocking ${Object.keys(sources).length} news sources`)
  console.log(`\nAvailable endpoints:`)
  console.log(`  GET  /api/s?id=<sourceId>`)
  console.log(`  POST /api/s/entire`)
  console.log(`  GET  /api/enable-login`)
})

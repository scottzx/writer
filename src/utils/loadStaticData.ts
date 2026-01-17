// 静态数据加载工具

export interface SourceItem {
  rank: number
  id: string
  title: string
  url: string
  mobileUrl?: string
  extra?: Record<string, any>
}

export interface SourceData {
  sourceId: string
  sourceName: string
  fetchTime: string
  updatedTime: number
  status: string
  itemCount: number
  items: SourceItem[]
}

// 动态导入所有源数据（懒加载）
const sourceModules = import.meta.glob<{ default: SourceData }>(
  "/scripts/output/sources/*.json",
)

// 缓存已加载的数据
let cachedData: Map<string, SourceData> | null = null

// 获取所有源数据
export async function getAllSourceData(): Promise<SourceData[]> {
  if (cachedData && cachedData.size > 0) {
    return Array.from(cachedData.values())
  }

  const dataMap = new Map<string, SourceData>()
  const loadPromises: Promise<void>[] = []
  let hasError = false

  // 并行加载所有源数据
  for (const path in sourceModules) {
    const loadPromise = sourceModules[path]()
      .then((module: any) => {
        const data = module.default || module
        if (data && data.sourceId) {
          dataMap.set(data.sourceId, data)
        }
      })
      .catch((error: Error) => {
        hasError = true
        console.error(`[loadStaticData] Failed to load ${path}:`, error.message)
      })
    loadPromises.push(loadPromise)
  }

  // 等待所有数据加载完成
  await Promise.all(loadPromises)

  if (hasError) {
    console.warn(`[loadStaticData] Loaded ${dataMap.size} sources with some errors.`)
  }

  if (dataMap.size === 0) {
    console.error("[loadStaticData] No source data loaded. Check file paths.")
  } else {
    console.log(`[loadStaticData] Successfully loaded ${dataMap.size} sources.`)
  }

  cachedData = dataMap
  return Array.from(dataMap.values())
}

// 根据 sourceId 获取特定源的数据
export async function getSourceDataById(sourceId: string): Promise<SourceData | null> {
  const allData = await getAllSourceData()
  return allData.find(data => data.sourceId === sourceId) || null
}

// 清除缓存
export function clearCache(): void {
  cachedData = null
}

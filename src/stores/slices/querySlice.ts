import type { StateCreator } from "zustand"
import type { SourceID, SourceResponse } from "@shared/types"
import { cacheSources } from "~/utils/data"
import { getJsonFileName } from "~/utils/sourceMapping"
import { getSourceDataById } from "~/utils/loadStaticData"
import { myFetch } from "~/utils"

export interface QueryState {
  queries: Map<string, {
    data: SourceResponse[]
    status: "idle" | "loading" | "success" | "error"
    error: Error | null
    lastUpdated: number
  }>
}

export interface QuerySlice {
  query: QueryState
  fetchSource: (id: SourceID) => Promise<void>
  fetchMultipleSources: (ids: SourceID[]) => Promise<void>
  invalidateSource: (id: SourceID) => void
  getQueryData: (id: SourceID) => SourceResponse[] | undefined
}

export const createQuerySlice: StateCreator<QuerySlice> = (set, get) => ({
  query: {
    queries: new Map(),
  },

  fetchSource: async (id: SourceID) => {
    // Set loading state
    set(state => ({
      query: {
        ...state.query,
        queries: new Map(state.query.queries).set(`source-${id}`, {
          data: [],
          status: "loading",
          error: null,
          lastUpdated: Date.now(),
        }),
      },
    }))

    try {
      // 尝试从静态 JSON 文件加载数据
      const jsonFileName = getJsonFileName(id)
      let data: SourceResponse | undefined

      if (jsonFileName) {
        const staticData = await getSourceDataById(jsonFileName)
        if (staticData) {
          // 转换静态数据格式为 SourceResponse 格式
          data = {
            id: staticData.sourceId,
            updatedTime: staticData.updatedTime,
            status: "success" as const,
            items: staticData.items.map((item, index) => ({
              id: item.id,
              title: item.title,
              url: item.url,
              mobileUrl: item.mobileUrl,
              extra: item.extra,
              rank: item.rank || index + 1,
            })),
          } as SourceResponse
        }
      }

      if (data) {
        set(state => ({
          query: {
            ...state.query,
            queries: new Map(state.query.queries).set(`source-${id}`, {
              data: [data],
              status: "success",
              error: null,
              lastUpdated: Date.now(),
            }),
          },
        }))
      } else {
        // 如果没有静态数据，尝试从 API 加载
        const apiData = await myFetch(`/s/${id}`)
        set(state => ({
          query: {
            ...state.query,
            queries: new Map(state.query.queries).set(`source-${id}`, {
              data: [apiData],
              status: "success",
              error: null,
              lastUpdated: Date.now(),
            }),
          },
        }))
      }
    } catch (error) {
      set(state => ({
        query: {
          ...state.query,
          queries: new Map(state.query.queries).set(`source-${id}`, {
            data: [],
            status: "error",
            error: error as Error,
            lastUpdated: Date.now(),
          }),
        },
      }))
    }
  },

  fetchMultipleSources: async (ids: SourceID[]) => {
    const { query } = get()

    // Set loading state for all
    const newQueries = new Map(query.queries)
    ids.forEach((id) => {
      newQueries.set(`source-${id}`, {
        data: [],
        status: "loading",
        error: null,
        lastUpdated: Date.now(),
      })
    })

    set({ query: { ...query, queries: newQueries } })

    try {
      // 先尝试从静态 JSON 文件加载所有数据
      const staticDataResponses: SourceResponse[] = []
      const idsNeedingApi: SourceID[] = []

      for (const id of ids) {
        const jsonFileName = getJsonFileName(id)
        if (jsonFileName) {
          const staticData = await getSourceDataById(jsonFileName)
          if (staticData) {
            // 转换静态数据格式为 SourceResponse 格式
            const data = {
              id: staticData.sourceId,
              updatedTime: staticData.updatedTime,
              status: "success" as const,
              items: staticData.items.map((item, index) => ({
                id: item.id,
                title: item.title,
                url: item.url,
                mobileUrl: item.mobileUrl,
                extra: item.extra,
                rank: item.rank || index + 1,
              })),
            } as SourceResponse
            staticDataResponses.push(data)

            // 更新查询状态
            newQueries.set(`source-${id}`, {
              data: [data],
              status: "success",
              error: null,
              lastUpdated: Date.now(),
            })

            // 更新缓存
            if (!cacheSources.has(id) || cacheSources.get(id)!.updatedTime < data.updatedTime) {
              cacheSources.set(id, data)
            }
          } else {
            idsNeedingApi.push(id)
          }
        } else {
          idsNeedingApi.push(id)
        }
      }

      // 对于没有静态数据的 source，从 API 获取
      if (idsNeedingApi.length > 0) {
        try {
          const res: SourceResponse[] | undefined = await myFetch("/s/entire", {
            method: "POST",
            body: { sources: idsNeedingApi },
          })

          if (res?.length) {
            res.forEach((v) => {
              const id = v.id
              if (!cacheSources.has(id) || cacheSources.get(id)!.updatedTime < v.updatedTime) {
                cacheSources.set(id, v)
                newQueries.set(`source-${id}`, {
                  data: [v],
                  status: "success",
                  error: null,
                  lastUpdated: Date.now(),
                })
              }
            })
          }
        } catch (apiError) {
          // API 失败，标记未找到的 sources 为错误状态
          idsNeedingApi.forEach((id) => {
            newQueries.set(`source-${id}`, {
              data: [],
              status: "error",
              error: apiError as Error,
              lastUpdated: Date.now(),
            })
          })
        }
      }

      set({ query: { queries: newQueries } })
    } catch (error) {
      // Handle error for all sources
      ids.forEach((id) => {
        newQueries.set(`source-${id}`, {
          data: [],
          status: "error",
          error: error as Error,
          lastUpdated: Date.now(),
        })
      })
      set({ query: { queries: newQueries } })
    }
  },

  invalidateSource: (id: SourceID) => {
    const { query } = get()
    const newQueries = new Map(query.queries)
    newQueries.delete(`source-${id}`)
    set({ query: { ...query, queries: newQueries } })
  },

  getQueryData: (id: SourceID) => {
    const { query } = get()
    return query.queries.get(`source-${id}`)?.data
  },
})

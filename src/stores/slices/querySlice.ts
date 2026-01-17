import type { StateCreator } from "zustand"
import type { SourceID, SourceResponse } from "@shared/types"
import { cacheSources } from "~/utils/data"

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
      const data = await myFetch(`/s/${id}`)

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
      const res: SourceResponse[] | undefined = await myFetch("/s/entire", {
        method: "POST",
        body: { sources: ids },
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

        set({ query: { queries: newQueries } })
      }
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

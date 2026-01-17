import { useQuery } from "@tanstack/react-query"
import type { SourceID, SourceResponse } from "@shared/types"
import { delay, myFetch, safeParseString } from "~/utils"
import { cacheSources, refetchSources } from "~/utils/data"

/**
 * Hook for fetching a single news source
 * Now uses the proxy API to access data sources directly from frontend
 */
export function useNewsQuery(sourceId: SourceID) {
  return useQuery({
    queryKey: ["source", sourceId],
    queryFn: async ({ queryKey }) => {
      const id = queryKey[1] as SourceID

      // Use the new proxy API
      let url = `/proxy/${id}`
      const headers: Record<string, any> = {}

      if (refetchSources.has(id)) {
        // Add timestamp to bypass cache
        url = `/proxy/${id}?t=${Date.now()}`
        const jwt = safeParseString(localStorage.getItem("jwt"))
        if (jwt) headers.Authorization = `Bearer ${jwt}`
        refetchSources.delete(id)
      } else if (cacheSources.has(id)) {
        // Wait for animation
        await delay(200)
        return cacheSources.get(id)!
      }

      const response: SourceResponse = await myFetch(url, { headers })

      // Calculate diff for hottest type sources
      if (response.items && cacheSources.has(id)) {
        const cached = cacheSources.get(id)!
        response.items.forEach((item, i) => {
          const oldIndex = cached.items.findIndex(k => k.id === item.id)
          item.extra = {
            ...item?.extra,
            diff: oldIndex === -1 ? undefined : oldIndex - i,
          }
        })
      }

      cacheSources.set(id, response)
      return response
    },
    placeholderData: prev => prev,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  })
}

/**
 * Hook for fetching multiple news sources in batch
 */
export function useEntireQuery(items: SourceID[]) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ["entire", [...items].sort()],
    queryFn: async ({ queryKey }) => {
      const sources = queryKey[1] as SourceID[]
      if (sources.length === 0) return null

      // Use the new batch proxy API
      const res: SourceResponse[] | undefined = await myFetch("/proxy/batch", {
        method: "POST",
        body: { sources },
      })

      if (res?.length) {
        const toUpdate: SourceID[] = []
        res.forEach((v) => {
          const id = v.id
          if (!cacheSources.has(id) || cacheSources.get(id)!.updatedTime < v.updatedTime) {
            toUpdate.push(id)
            cacheSources.set(id, v)
          }
        })

        // Update individual queries
        toUpdate.forEach((id) => {
          queryClient.setQueryData(["source", id], cacheSources.get(id))
        })

        return res
      }
      return null
    },
    staleTime: 1000 * 60 * 3,
    retry: false,
  })
}

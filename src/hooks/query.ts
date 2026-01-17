import { useCallback, useEffect } from "react"
import type { SourceID } from "@shared/types"
import { useStore } from "~/stores"

export function useUpdateQuery() {
  const fetchSource = useStore(state => state.fetchSource)
  const fetchMultipleSources = useStore(state => state.fetchMultipleSources)

  /**
   * update query
   */
  return useCallback(async (...sources: SourceID[]) => {
    if (sources.length === 1) {
      await fetchSource(sources[0])
    } else {
      await fetchMultipleSources(sources)
    }
  }, [fetchSource, fetchMultipleSources])
}

export function useEntireQuery(items: SourceID[]) {
  const fetchMultipleSources = useStore(state => state.fetchMultipleSources)
  const getQueryData = useStore(state => state.getQueryData)

  useEffect(() => {
    if (items.length > 0) {
      fetchMultipleSources(items)
    }
  }, [items, fetchMultipleSources])

  // Get data for all sources
  const data = items.map(id => getQueryData(id)).filter(Boolean)

  return { data }
}

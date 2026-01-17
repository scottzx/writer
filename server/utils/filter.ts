import type { NewsItem, SourceID } from "@shared/types"
import { getEmotionalFilter } from "../services/emotional-filter"

/**
 * Apply emotional resonance filter to news items
 * @param items - Array of news items to filter
 * @param sourceId - Source identifier
 * @returns Filtered news items
 */
export async function applyEmotionalFilter(
  items: NewsItem[],
  sourceId: SourceID,
): Promise<NewsItem[]> {
  // Get filter instance
  const filter = getEmotionalFilter()

  // Check if filtering is enabled
  const enabledSources = process.env.FILTER_ENABLED_SOURCES?.split(",") || ["*"]
  const allSourcesEnabled = enabledSources.includes("*")
  const sourceEnabled = enabledSources.includes(sourceId)

  if (!allSourcesEnabled && !sourceEnabled) {
    return items
  }

  // Apply filter
  const filtered = await filter.filter(items)

  // Log statistics
  const passRate = (filtered.length / items.length * 100).toFixed(1)
  console.log(`[Filter] ${sourceId}: ${filtered.length}/${items.length} passed (${passRate}%)`)

  return filtered
}

/**
 * Generate card snippet for a news item
 * @param item - News item to generate snippet for
 * @returns Generated snippet text
 */
export async function generateCardSnippet(item: NewsItem): Promise<string> {
  // Check if snippet already exists
  if (item.extra?.snippet) {
    return item.extra.snippet
  }

  // Check if snippet generation is enabled
  if (process.env.GENERATE_CARD_SNIPPETS === "false") {
    return ""
  }

  // Get filter instance and generate snippet
  const filter = getEmotionalFilter()
  return await filter.generateSnippet(item)
}

/**
 * Enrich news items with AI-generated snippets
 * @param items - News items to enrich
 * @returns News items with snippets added
 */
export async function enrichWithSnippets(items: NewsItem[]): Promise<NewsItem[]> {
  // Check if snippet generation is enabled
  if (process.env.GENERATE_CARD_SNIPPETS === "false") {
    return items
  }

  // Process items in parallel
  const enrichedItems = await Promise.all(
    items.map(async (item) => {
      const snippet = await generateCardSnippet(item)

      if (snippet) {
        return {
          ...item,
          extra: {
            ...item.extra,
            snippet,
          },
        }
      }

      return item
    }),
  )

  return enrichedItems
}

import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import type { NewsItem, SourceID } from "@shared/types"
import type { EmotionalFilterConfig, FilterResult } from "../types"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Emotional Filter Service
 * Uses Claude AI to judge emotional resonance and generate card snippets
 */
export class EmotionalFilter {
  private config: EmotionalFilterConfig
  private judgmentCache: Map<string, FilterResult>
  private snippetCache: Map<string, string>
  private apiKey: string | undefined

  constructor(config: EmotionalFilterConfig) {
    this.config = config
    this.judgmentCache = new Map()
    this.snippetCache = new Map()
    this.apiKey = process.env.ANTHROPIC_API_KEY

    if (!this.apiKey) {
      console.warn("Warning: ANTHROPIC_API_KEY not set. Emotional filtering will be disabled.")
    }
  }

  /**
   * Filter news items based on emotional resonance
   */
  async filter(items: NewsItem[]): Promise<NewsItem[]> {
    if (!this.apiKey || !this.config.enabled) {
      return items
    }

    const uncached = items.filter(item => !this.judgmentCache.has(String(item.id)))

    if (uncached.length > 0) {
      // Process in batches
      const batchSize = this.config.batchSize || 5
      for (let i = 0; i < uncached.length; i += batchSize) {
        const batch = uncached.slice(i, i + batchSize)
        await this.processBatch(batch)
      }
    }

    // Filter based on cached judgments
    return items.filter((item) => {
      const result = this.judgmentCache.get(String(item.id))
      return result?.hasResonance ?? true // Default to pass if no result
    })
  }

  /**
   * Judge a single news item
   */
  async judgeSingle(item: NewsItem): Promise<FilterResult> {
    if (!this.apiKey) {
      return {
        itemId: String(item.id),
        hasResonance: true,
        confidence: "low",
        reason: "API key not configured - defaulting to pass",
        timestamp: Date.now(),
      }
    }

    // Check cache first
    const cached = this.judgmentCache.get(String(item.id))
    if (cached) {
      return cached
    }

    // Load prompt
    const promptTemplate = readFileSync(
      join(__dirname, "../prompts/emotional-resonance.txt"),
      "utf-8",
    )

    // Build prompt with item data
    const description = this.extractDescription(item)
    const prompt = `${promptTemplate}\n\n## News Item to Judge\n\nTitle: ${item.title}\n${description ? `Description: ${description}` : ""}\n\nJudge this news item's emotional resonance.`

    try {
      // Call Claude API directly
      const response = await this.callClaudeAPI(prompt, 300)

      // Parse JSON response
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/) || response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("Failed to extract JSON from response")
      }

      const result = JSON.parse(jsonMatch[1] || jsonMatch[0])

      const filterResult: FilterResult = {
        itemId: String(item.id),
        hasResonance: result.hasResonance === true,
        confidence: result.confidence || "medium",
        reason: result.reason || "",
        timestamp: Date.now(),
      }

      // Cache result
      this.judgmentCache.set(String(item.id), filterResult)

      return filterResult
    } catch (error) {
      console.error(`Failed to judge item ${item.id}:`, error)

      // Fail open: return true with low confidence
      const fallbackResult: FilterResult = {
        itemId: String(item.id),
        hasResonance: true,
        confidence: "low",
        reason: "Filtering error - defaulting to pass",
        timestamp: Date.now(),
      }

      return fallbackResult
    }
  }

  /**
   * Generate card snippet for a news item
   */
  async generateSnippet(item: NewsItem): Promise<string> {
    if (!this.apiKey || !this.config.generateSnippets) {
      // Return existing snippet or empty string
      return item.extra?.snippet || ""
    }

    // Check cache first
    const cached = this.snippetCache.get(String(item.id))
    if (cached) {
      return cached
    }

    // Check if item already has a snippet
    if (item.extra?.snippet) {
      return item.extra.snippet
    }

    // Load prompt
    const promptTemplate = readFileSync(
      join(__dirname, "../prompts/snippet-generation.txt"),
      "utf-8",
    )

    // Build prompt with item data
    const description = this.extractDescription(item)
    const source = this.extractSource(item)

    const prompt = promptTemplate
      .replace("{title}", item.title)
      .replace("{description}", description || "No description available")
      .replace("{source}", source)

    try {
      // Call Claude API
      const snippet = await this.callClaudeAPI(prompt, 200)

      // Cache snippet
      this.snippetCache.set(String(item.id), snippet)

      return snippet
    } catch (error) {
      console.error(`Failed to generate snippet for item ${item.id}:`, error)

      // Return empty string on error
      return ""
    }
  }

  /**
   * Call Claude API directly
   */
  private async callClaudeAPI(prompt: string, maxTokens: number): Promise<string> {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: this.config.model || "claude-sonnet-4-5-20250929",
        max_tokens: maxTokens,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Claude API error: ${response.status} ${errorText}`)
    }

    const data = await response.json() as { content: Array<{ text: string }> }
    return data.content[0]?.text || ""
  }

  /**
   * Process a batch of items
   */
  private async processBatch(items: NewsItem[]): Promise<void> {
    const promises = items.map(item => this.judgeSingle(item))
    await Promise.all(promises)
  }

  /**
   * Extract description from news item
   */
  private extractDescription(item: NewsItem): string {
    if (item.extra?.hover) {
      return item.extra.hover
    }
    if (item.extra?.info) {
      return String(item.extra.info)
    }
    return ""
  }

  /**
   * Extract source from news item (for snippet generation)
   */
  private extractSource(_item: NewsItem): string {
    // This would typically come from the source context
    // For now, return a generic value
    return "News Source"
  }

  /**
   * Clear cache (for testing or manual refresh)
   */
  clearCache(): void {
    this.judgmentCache.clear()
    this.snippetCache.clear()
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      judgments: this.judgmentCache.size,
      snippets: this.snippetCache.size,
    }
  }
}

// Global filter instance
let filterInstance: EmotionalFilter | null = null

/**
 * Get or create the global emotional filter instance
 */
export function getEmotionalFilter(): EmotionalFilter {
  if (!filterInstance) {
    const config: EmotionalFilterConfig = {
      enabled: process.env.ENABLE_EMOTIONAL_FILTER === "true",
      sources: (process.env.FILTER_ENABLED_SOURCES?.split(",") || ["*"]) as SourceID[] | "*",
      batchSize: Number.parseInt(process.env.FILTER_BATCH_SIZE || "5"),
      cacheTTL: Number.parseInt(process.env.FILTER_CACHE_TTL || "86400000"),
      model: process.env.FILTER_MODEL || "claude-sonnet-4-5-20250929",
      generateSnippets: process.env.GENERATE_CARD_SNIPPETS !== "false",
    }

    filterInstance = new EmotionalFilter(config)
  }

  return filterInstance
}

/**
 * Reset the global filter instance (for testing)
 */
export function resetEmotionalFilter(): void {
  filterInstance = null
}

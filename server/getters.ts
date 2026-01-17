import type { SourceID } from "@shared/types"
import type { SourceGetter } from "./types"

// Temporary workaround: using Nitro imports with # alias
// TODO: Fix glob import support or migrate to standard Nitro
import ithome from "#sources/ithome"
import zhihu from "#sources/zhihu"
import v2exSource from "#sources/v2ex"
import github from "#sources/github"
import hackernews from "#sources/hackernews"

// v2ex exports an object with multiple keys, need to extract the function
const v2ex = v2exSource.v2ex || v2exSource["v2ex-share"]

export const getters = {
  "ithome": ithome,
  "zhihu": zhihu,
  "v2ex": v2ex,
  "v2ex-share": v2exSource["v2ex-share"] || v2ex,
  "github": github,
  "github-trending-today": github,
  "hackernews": hackernews,
} as Record<SourceID, SourceGetter>

// Note: This is a temporary solution with only 6 sources imported.
// The full app has 40+ sources that need to be imported.

import type { SourceID } from "@shared/types"
import type { SourceGetter } from "./types"

// Temporary workaround for nitro-go glob import limitation
// TODO: Switch back to glob import when standard nitro supports it
export const getters = {} as Record<SourceID, SourceGetter>

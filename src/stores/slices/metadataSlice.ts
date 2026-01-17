import type { StateCreator } from "zustand"
import type { FixedColumnID, PrimitiveMetadata, SourceID } from "@shared/types"

export type Update<T> = T | ((prev: T) => T)

// Preprocess function - will be imported from utils

function _preprocessMetadata(target: PrimitiveMetadata): PrimitiveMetadata {
  // This is a placeholder - the actual implementation will be imported
  return target
}

export interface MetadataSlice {
  metadata: PrimitiveMetadata
  currentColumnID: FixedColumnID
  setMetadata: (metadata: PrimitiveMetadata) => void
  updateMetadata: (update: Partial<PrimitiveMetadata>) => void
  setCurrentColumnID: (id: FixedColumnID) => void
  getFocusSources: () => SourceID[]
  setFocusSources: (update: Update<SourceID[]>) => void
  getCurrentSources: () => SourceID[]
  setCurrentSources: (update: Update<SourceID[]>) => void
}

export const createMetadataSlice: StateCreator<MetadataSlice> = (set, get) => ({
  metadata: {
    updatedTime: 0,
    data: {} as any, // Will be initialized properly
    action: "init",
  },
  currentColumnID: "focus",

  setMetadata: metadata => set({ metadata }),

  updateMetadata: update => set((state) => {
    const nextMetadata = { ...state.metadata, ...update }
    // Only update if newer (same logic as Jotai)
    if (nextMetadata.updatedTime > state.metadata.updatedTime) {
      return { metadata: nextMetadata }
    }
    return state
  }),

  setCurrentColumnID: currentColumnID => set({ currentColumnID }),

  // Derived state as selectors (computed on access)
  getFocusSources: () => {
    const state = get()
    return state.metadata.data.focus || []
  },

  setFocusSources: update => set((state) => {
    const focusSources = typeof update === "function"
      ? update(state.metadata.data.focus || [])
      : update

    return {
      metadata: {
        ...state.metadata,
        updatedTime: Date.now(),
        action: "manual",
        data: {
          ...state.metadata.data,
          focus: focusSources,
        },
      },
    }
  }),

  getCurrentSources: () => {
    const state = get()
    return state.metadata.data[state.currentColumnID] || []
  },

  setCurrentSources: update => set((state) => {
    const currentSources = typeof update === "function"
      ? update(state.metadata.data[state.currentColumnID] || [])
      : update

    return {
      metadata: {
        ...state.metadata,
        updatedTime: Date.now(),
        action: "manual",
        data: {
          ...state.metadata.data,
          [state.currentColumnID]: currentSources,
        },
      },
    }
  }),
})

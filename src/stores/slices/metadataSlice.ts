import type { StateCreator } from "zustand"
import type { FixedColumnID, PrimitiveMetadata, SourceID } from "@shared/types"
import { metadata as defaultMetadata } from "@shared/metadata"

export type Update<T> = T | ((prev: T) => T)

// 将默认的 Metadata 转换为 PrimitiveMetadata.data 格式
function getDefaultMetadataData(): Record<FixedColumnID, SourceID[]> {
  return {
    focus: defaultMetadata.focus?.sources || [],
    hottest: defaultMetadata.hottest?.sources || [],
    realtime: defaultMetadata.realtime?.sources || [],
  }
}

// Preprocess metadata from server sync
// 合并服务器数据和本地默认数据,确保所有栏目都有值
function _preprocessMetadata(target: PrimitiveMetadata): PrimitiveMetadata {
  const defaultData = getDefaultMetadataData()

  return {
    ...target,
    data: {
      // 使用服务器数据,如果为空则使用默认值
      focus: target.data.focus?.length > 0 ? target.data.focus : defaultData.focus,
      hottest: target.data.hottest?.length > 0 ? target.data.hottest : defaultData.hottest,
      realtime: target.data.realtime?.length > 0 ? target.data.realtime : defaultData.realtime,
    },
  }
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
  reorderSources: (fromIndex: number, toIndex: number) => void
}

export const createMetadataSlice: StateCreator<MetadataSlice> = (set, get) => {
  // 使用默认数据源初始化,确保所有用户(包括未登录)都能看到内容
  const initialData = getDefaultMetadataData()

  return {
    metadata: {
      updatedTime: 0,
      data: initialData,
      action: "init",
    },
    currentColumnID: "hottest", // 默认显示"最热"栏目

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
      const currentFocus = state.metadata.data.focus || []
      const focusSources = typeof update === "function"
        ? update(currentFocus)
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

    reorderSources: (fromIndex, toIndex) => set((state) => {
      const currentSources = state.metadata.data[state.currentColumnID] || []
      if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= currentSources.length || toIndex >= currentSources.length) {
        return state
      }

      const newSources = [...currentSources]
      const [removed] = newSources.splice(fromIndex, 1)
      newSources.splice(toIndex, 0, removed)

      return {
        metadata: {
          ...state.metadata,
          updatedTime: Date.now(),
          action: "manual",
          data: {
            ...state.metadata.data,
            [state.currentColumnID]: newSources,
          },
        },
      }
    }),
  }
}

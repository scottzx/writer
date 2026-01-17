import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { MetadataSlice } from "./slices/metadataSlice"
import { createMetadataSlice } from "./slices/metadataSlice"
import type { AuthSlice } from "./slices/authSlice"
import { createAuthSlice } from "./slices/authSlice"
import type { UISlice } from "./slices/uiSlice"
import { createUISlice } from "./slices/uiSlice"
import type { QuerySlice } from "./slices/querySlice"
import { createQuerySlice } from "./slices/querySlice"
import type { TimerSlice } from "./slices/timerSlice"
import { createTimerSlice } from "./slices/timerSlice"
import type { ToastSlice } from "./slices/toastSlice"
import { createToastSlice } from "./slices/toastSlice"
import type { GoToTopSlice } from "./slices/goToTopSlice"
import { createGoToTopSlice } from "./slices/goToTopSlice"
import type { SearchBarSlice } from "./slices/searchBarSlice"
import { createSearchBarSlice } from "./slices/searchBarSlice"
import type { EditorSlice } from "./slices/editorSlice"
import { createEditorSlice } from "./slices/editorSlice"
import type { LibrarySlice } from "./slices/librarySlice"
import { createLibrarySlice } from "./slices/librarySlice"
import type { WritingStyleSlice } from "./slices/writingStyleSlice"
import { createWritingStyleSlice } from "./slices/writingStyleSlice"

export type StoreState = MetadataSlice & AuthSlice & UISlice & QuerySlice & TimerSlice & ToastSlice & GoToTopSlice & SearchBarSlice & EditorSlice & LibrarySlice & WritingStyleSlice

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createMetadataSlice(...a),
      ...createAuthSlice(...a),
      ...createUISlice(...a),
      ...createQuerySlice(...a),
      ...createTimerSlice(...a),
      ...createToastSlice(...a),
      ...createGoToTopSlice(...a),
      ...createSearchBarSlice(...a),
      ...createEditorSlice(...a),
      ...createLibrarySlice(...a),
      ...createWritingStyleSlice(...a),
    }),
    {
      name: "newsnow-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        metadata: state.metadata,
        auth: {
          user: state.auth.user,
          jwt: state.auth.jwt,
          enableLogin: state.auth.enableLogin,
        },
        ui: {
          colorScheme: state.ui.colorScheme,
        },
      }),
    },
  ),
)

// Export types for individual slices
export type { MetadataSlice } from "./slices/metadataSlice"
export type { AuthSlice } from "./slices/authSlice"
export type { UISlice } from "./slices/uiSlice"
export type { QuerySlice } from "./slices/querySlice"
export type { TimerSlice } from "./slices/timerSlice"
export type { ToastSlice } from "./slices/toastSlice"
export type { GoToTopSlice } from "./slices/goToTopSlice"
export type { SearchBarSlice } from "./slices/searchBarSlice"
export type { EditorSlice } from "./slices/editorSlice"
export type { LibrarySlice } from "./slices/librarySlice"
export type { ToastItem } from "./slices/toastSlice"

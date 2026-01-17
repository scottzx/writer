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

export type StoreState = MetadataSlice & AuthSlice & UISlice & QuerySlice & TimerSlice

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createMetadataSlice(...a),
      ...createAuthSlice(...a),
      ...createUISlice(...a),
      ...createQuerySlice(...a),
      ...createTimerSlice(...a),
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

import type { StateCreator } from "zustand"

export interface TimerSlice {
  timer: number
  setTimer: (time: number) => void
  startTimer: () => () => void // Returns cleanup function
}

export const createTimerSlice: StateCreator<TimerSlice> = set => ({
  timer: 0,

  setTimer: timer => set({ timer }),

  startTimer: () => {
    const interval = setInterval(() => {
      set({ timer: Date.now() })
    }, 60 * 1000)

    // Return cleanup
    return () => clearInterval(interval)
  },
})

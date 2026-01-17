import type { MaybePromise } from "@shared/type.util"
import { $fetch } from "ofetch"
import { delay as sharedDelay } from "@shared/utils"

export function safeParseString(str: any) {
  try {
    return JSON.parse(str)
  } catch {
    return ""
  }
}

export class Timer {
  private timerId?: any
  private start!: number
  private remaining: number
  private callback: () => MaybePromise<void>

  constructor(callback: () => MaybePromise<void>, delay: number) {
    this.callback = callback
    this.remaining = delay
    this.resume()
  }

  pause() {
    clearTimeout(this.timerId)
    this.remaining -= Date.now() - this.start
  }

  resume() {
    this.start = Date.now()
    clearTimeout(this.timerId)
    this.timerId = setTimeout(this.callback, this.remaining)
  }

  clear() {
    clearTimeout(this.timerId)
  }
}

export const myFetch = $fetch.create({
  timeout: 15000,
  retry: 0,
  baseURL: "/api",
  headers: () => {
    const headers: Record<string, string> = {}

    // 添加 UCID header（如果有）
    const ucid = localStorage.getItem("newsnow-ucid")
    if (ucid) {
      headers["X-User-ID"] = ucid
    }

    // 添加 JWT（如果有）
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`
    }

    return headers
  },
})

export function isiOS() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ].includes(navigator.platform)
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

// Re-export delay from shared/utils
export const delay = sharedDelay

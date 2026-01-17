import type { PrimitiveMetadata } from "@shared/types"
import { useDebounce, useMount } from "react-use"
import { useRef } from "react"
import { useLogin } from "./useLogin"
import { useToast } from "./useToast"
import { useStore } from "~/stores"
import { myFetch } from "~/utils"
import { preprocessMetadata } from "~/stores/slices/metadataSlice"

async function uploadMetadata(metadata: PrimitiveMetadata, jwt: string) {
  if (!jwt) return
  await myFetch("/me/sync", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: {
      data: metadata.data,
      updatedTime: metadata.updatedTime,
    },
  })
}

async function downloadMetadata(jwt: string): Promise<{ data: PrimitiveMetadata["data"], updatedTime: number } | undefined> {
  if (!jwt) return
  const res = await myFetch("/me/sync", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }) as { data?: PrimitiveMetadata["data"], updatedTime?: number }
  // 只返回数据,不包含 action 字段
  if (res.data) {
    return {
      data: res.data,
      updatedTime: res.updatedTime || 0,
    }
  }
}

export function useSync() {
  const setMetadata = useStore(state => state.setMetadata)
  const resetAction = useStore(state => state.resetAction)
  const jwt = useStore(state => state.auth.jwt)
  const { logout, login } = useLogin()
  const toaster = useToast()

  // Track if initial sync has completed
  const hasDownloadedRef = useRef(false)

  useDebounce(() => {
    // Skip if we haven't completed initial download yet
    if (!hasDownloadedRef.current) {
      return
    }

    const metadata = useStore.getState().metadata

    const fn = async () => {
      try {
        await uploadMetadata(metadata, jwt)
        // Reset action after successful upload to prevent re-upload
        resetAction()
      } catch (e: any) {
        if (e.statusCode !== 506) {
          toaster("身份校验失败，无法同步，请重新登录", {
            type: "error",
            action: {
              label: "登录",
              onClick: login,
            },
          })
          logout()
        }
      }
    }

    if (metadata.action === "manual") {
      fn()
    }
  }, 10000, [jwt, resetAction])

  useMount(() => {
    const fn = async () => {
      try {
        const result = await downloadMetadata(jwt)
        // Always mark as done, whether we have data or not
        hasDownloadedRef.current = true

        if (result) {
          // 只有当服务器返回有效数据且有内容时才更新
          // 避免空数据覆盖本地默认数据
          const hasValidData = result.data && (
            (result.data.focus && result.data.focus.length > 0)
            || (result.data.hottest && result.data.hottest.length > 0)
            || (result.data.realtime && result.data.realtime.length > 0)
          )

          if (hasValidData) {
            // Merge downloaded data with current state to preserve action
            const currentMetadata = useStore.getState().metadata
            setMetadata(preprocessMetadata({
              ...result,
              action: currentMetadata.action, // Preserve current action
            }))
          } else {
            // 服务器返回空数据或无效数据，保持本地数据
            console.warn("Server returned empty or invalid metadata, keeping local data")
          }
        }
      } catch (e: any) {
        hasDownloadedRef.current = true
        if (e.statusCode !== 506) {
          toaster("身份校验失败，无法同步，请重新登录", {
            type: "error",
            action: {
              label: "登录",
              onClick: login,
            },
          })
          logout()
        }
      }
    }
    fn()
  })
}

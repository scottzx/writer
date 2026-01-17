import type { PrimitiveMetadata } from "@shared/types"
import { useDebounce, useMount } from "react-use"
import { useLogin } from "./useLogin"
import { useToast } from "./useToast"
import { useStore } from "~/stores"

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

async function downloadMetadata(jwt: string): Promise<PrimitiveMetadata | undefined> {
  if (!jwt) return
  const { data, updatedTime } = await myFetch("/me/sync", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }) as PrimitiveMetadata
  // 不用同步 action 字段
  if (data) {
    return {
      action: "sync",
      data,
      updatedTime,
    }
  }
}

export function useSync() {
  const metadata = useStore(state => state.metadata)
  const setMetadata = useStore(state => state.setMetadata)
  const jwt = useStore(state => state.auth.jwt)
  const { logout, login } = useLogin()
  const toaster = useToast()

  useDebounce(async () => {
    const fn = async () => {
      try {
        await uploadMetadata(metadata, jwt)
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
  }, 10000, [metadata, jwt])
  useMount(() => {
    const fn = async () => {
      try {
        const metadata = await downloadMetadata(jwt)
        if (metadata) {
          setMetadata(preprocessMetadata(metadata))
        }
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
    fn()
  })
}

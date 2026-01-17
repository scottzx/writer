import type { SourceID } from "@shared/types"
import { useCallback } from "react"
import { useUpdateQuery } from "./query"
import { useLogin } from "./useLogin"
import { useToast } from "./useToast"
import { refetchSources } from "~/utils/data"

export function useRefetch() {
  const { enableLogin, loggedIn, login } = useLogin()
  const toaster = useToast()
  const updateQuery = useUpdateQuery()
  /**
   * force refresh
   */
  const refresh = useCallback((...sources: SourceID[]) => {
    if (enableLogin && !loggedIn) {
      toaster("登录后可以强制拉取最新数据", {
        type: "warning",
        action: {
          label: "登录",
          onClick: login,
        },
      })
    } else {
      refetchSources.clear()
      sources.forEach(id => refetchSources.add(id))
      updateQuery(...sources)
    }
  }, [loggedIn, toaster, login, enableLogin, updateQuery])

  return {
    refresh,
    refetchSources,
  }
}

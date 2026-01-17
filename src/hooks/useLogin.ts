import { useCallback } from "react"
import { useMount } from "react-use"
import { useStore } from "~/stores"

export function useLogin() {
  const user = useStore(state => state.auth.user)
  const jwt = useStore(state => state.auth.jwt)
  const enableLogin = useStore(state => state.auth.enableLogin)
  const setEnableLogin = useStore(state => state.setEnableLogin)

  // Initialize enableLogin on mount
  useMount(() => {
    myFetch("/enable-login").then((r) => {
      setEnableLogin(r)
    }).catch((e) => {
      if (e.statusCode === 506) {
        setEnableLogin({ enable: false })
        localStorage.removeItem("jwt")
      }
    })
  })

  const login = useCallback(() => {
    window.location.href = enableLogin.url || "/api/login"
  }, [enableLogin])

  const logout = useCallback(() => {
    window.localStorage.clear()
    window.location.reload()
  }, [])

  return {
    loggedIn: !!jwt,
    userInfo: user,
    enableLogin: !!enableLogin.enable,
    logout,
    login,
  }
}

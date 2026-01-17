import { useCallback } from "react"

export function useLogin() {
  // Login functionality is disabled
  const login = useCallback(() => {
    // No-op - login is disabled
  }, [])

  const logout = useCallback(() => {
    // No-op - login is disabled
  }, [])

  return {
    loggedIn: false,
    userInfo: null,
    enableLogin: false,
    logout,
    login,
  }
}

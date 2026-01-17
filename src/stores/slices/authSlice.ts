import type { StateCreator } from "zustand"

export interface AuthUser {
  name?: string
  avatar?: string
}

export interface AuthConfig {
  enable: boolean
  url?: string
}

export interface AuthSlice {
  auth: {
    user: AuthUser
    jwt: string
    enableLogin: AuthConfig
  }
  setAuthUser: (user: AuthUser) => void
  setJwt: (jwt: string) => void
  setEnableLogin: (config: AuthConfig) => void
  clearAuth: () => void
}

export const createAuthSlice: StateCreator<AuthSlice> = set => ({
  auth: {
    user: {},
    jwt: "",
    enableLogin: { enable: true },
  },

  setAuthUser: user => set(state => ({
    auth: { ...state.auth, user },
  })),

  setJwt: jwt => set(state => ({
    auth: { ...state.auth, jwt },
  })),

  setEnableLogin: enableLogin => set(state => ({
    auth: { ...state.auth, enableLogin },
  })),

  clearAuth: () => set(state => ({
    auth: { ...state.auth, user: {}, jwt: "" },
  })),
})

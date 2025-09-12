import { create } from "zustand"

type User = { id: string; name: string; email: string } | null

interface State {
  user: User
  token: string | null
  setUser: (u: User) => void
  setToken: (t: string | null) => void
  logout: () => void
  restore: () => void
}

export const useUserStore = create<State>((set) => ({
  user: null,
  token: null,
  setUser: (user) => {
    set({ user })
    if (user) localStorage.setItem("user", JSON.stringify(user))
    else localStorage.removeItem("user")
  },
  setToken: (token) => {
    set({ token })
    if (token) localStorage.setItem("token", token)
    else localStorage.removeItem("token")
  },
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    set({ user: null, token: null })
  },
  restore: () => {
    const t = localStorage.getItem("token")
    const u = localStorage.getItem("user")
    set({ token: t, user: u ? JSON.parse(u) : null })
  },
}))
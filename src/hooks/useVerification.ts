import { useUserStore } from "../store/userStore"

export function useAuth() {
  const user = useUserStore((s) => s.user)
  const token = useUserStore((s) => s.token)
  const setUser = useUserStore((s) => s.setUser)
  const setToken = useUserStore((s) => s.setToken)
  const logout = useUserStore((s) => s.logout)

  return {
    isAuthenticated: Boolean(token),
    user,
    token,
    setUser,
    setToken,
    logout,
  }
}
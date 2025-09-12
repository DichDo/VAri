import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { loginApi } from "../services/mockBackend"
import { useUserStore } from "../store/userStore"
import Button from "../components/Button"

export default function Login() {
  const setUser = useUserStore((s) => s.setUser)
  const setToken = useUserStore((s) => s.setToken)
  const restore = useUserStore((s) => s.restore)
  const token = useUserStore((s) => s.token)
  const navigate = useNavigate()

  useEffect(() => {
    restore()
  }, [restore])

  useEffect(() => {
    if (token) navigate("/profile")
  }, [token, navigate])

  const [email, setEmail] = useState("test@test.com")
  const [password, setPassword] = useState("1234")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e?: React.FormEvent) {
    e?.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await loginApi(email, password)
      setUser(res.user)
      setToken(res.token)
      navigate("/profile")
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2 className="h2">Sign in</h2>
      <form className="form" onSubmit={handleLogin}>
        <label className="label">Email</label>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="label">Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}
        <div style={{ marginTop: 8 }}>
          <Button type="submit">{loading ? "Signing in..." : "Sign in"}</Button>
        </div>
      </form>
      <p className="small mt-2">demo credentials: test@test.com / 1234</p>
    </div>
  )
}
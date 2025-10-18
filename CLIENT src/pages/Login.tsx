import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = await axios.post("/api/auth/login", { email, password })
    localStorage.setItem("token", res.data.token)
    navigate("/dashboard")
  }

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign in</button>
    </form>
  )
}

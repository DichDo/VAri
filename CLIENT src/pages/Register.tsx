import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = await axios.post("/api/auth/register", { email, password, name })
    localStorage.setItem("token", res.data.token)
    navigate("/verify")
  }

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <div>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type="submit">Create account</button>
    </form>
  )
}

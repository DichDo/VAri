import React, { useEffect, useState } from "react"
import axios from "axios"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return
    axios.get("/api/verify/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setUser(r.data.user))
      .catch(() => setUser(null))
  }, [])

  if (!user) return <div>no user</div>

  return (
    <div>
      <h2>Dashboard</h2>
      <div>Email {user.email}</div>
      <div>Name {user.name}</div>
      <div>Trust score {user.trustScore}</div>
    </div>
  )
}

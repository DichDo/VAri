import React, { useState } from "react"
import axios from "axios"

export default function Verify() {
  const [selfie, setSelfie] = useState<File | null>(null)
  const [idFile, setIdFile] = useState<File | null>(null)
  const [message, setMessage] = useState("")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if (!token) {
      setMessage("login required")
      return
    }
    const fd = new FormData()
    if (selfie) fd.append("selfie", selfie)
    if (idFile) fd.append("id", idFile)
    const res = await axios.post("/api/verify/upload", fd, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
    })
    setMessage("upload complete. trustScore " + res.data.trustScore)
  }

  return (
    <form onSubmit={submit}>
      <h2>Upload selfie and ID</h2>
      <div>
        <label>Selfie</label>
        <input type="file" accept="image/*" onChange={e => setSelfie(e.target.files?.[0] ?? null)} />
      </div>
      <div>
        <label>ID image</label>
        <input type="file" accept="image/*" onChange={e => setIdFile(e.target.files?.[0] ?? null)} />
      </div>
      <button type="submit">Upload for verification</button>
      <div>{message}</div>
    </form>
  )
}

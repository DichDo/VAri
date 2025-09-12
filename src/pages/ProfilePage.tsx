import React, { useState } from "react"
import { useUserStore } from "../store/userStore"
import { fetchVerificationStatus } from "../services/mockBackend"
import Modal from "../components/Modal"
import Button from "../components/Button"

export default function Profile() {
  const user = useUserStore((s) => s.user)
  const token = useUserStore((s) => s.token)
  const logout = useUserStore((s) => s.logout)
  const [status, setStatus] = useState<{ verified: boolean; score: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  async function refresh() {
    if (!user || !token) return
    setError(null)
    setLoading(true)
    try {
      const res = await fetchVerificationStatus(user.id, token)
      setStatus(res)
    } catch (err: any) {
      setError(err.message || "Failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="card">
        <h2 className="h2">Profile</h2>
        <p className="small">Name: {user?.name}</p>
        <p className="small">Email: {user?.email}</p>
        <div style={{ marginTop: 12 }} className="row">
          <Button onClick={refresh}>Check verification</Button>
          <Button className="btn-ghost" onClick={() => { logout(); window.location.href = "/" }}>Logout</Button>
        </div>

        {loading && <p className="small mt-1">Checking...</p>}
        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

        {status && (
          <div style={{ marginTop: 12 }}>
            <p><strong>Verified:</strong> {status.verified ? "Yes" : "No"}</p>
            <p><strong>Trust Score:</strong> {status.score}</p>
            <Button onClick={() => setOpen(true)}>Details</Button>
          </div>
        )}
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h3 className="h2">Verification details</h3>
        <p className="small">User ID: {user?.id}</p>
        <p className="small">Verified: {status?.verified ? "Yes" : "No"}</p>
        <p className="small">Score: {status?.score}</p>
        <div style={{ marginTop: 12 }}>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  )
}
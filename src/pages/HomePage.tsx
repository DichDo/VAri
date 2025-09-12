import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div>
      <h1 className="h1">Welcome to VAri</h1>
      <p className="small">Minimal identity verification prototype</p>
      <div style={{ marginTop: 16 }}>
        <Link to="/login" className="btn">Get started</Link>
      </div>
    </div>
  )
}
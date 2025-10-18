import React from "react"
import { Outlet, Link } from "react-router-dom"

export default function App() {
  return (
    <div style={{ maxWidth: 800, margin: "24px auto", fontFamily: "system-ui" }}>
      <header>
        <h1>VAri</h1>
        <nav>
          <Link to="/">Register</Link> {" | "}
          <Link to="/login">Login</Link> {" | "}
          <Link to="/verify">Verify</Link> {" | "}
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

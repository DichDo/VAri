import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"
import PrivateRoute from "./components/PrivateRoute"

export default function App(): JSX.Element {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <div className="logo-mark" aria-hidden="true" />
          VAri
        </div>
        <nav className="nav" aria-label="Main navigation">
          <Navbar />
        </nav>
      </header>

      <main className="layout">
        <div className="card">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>

        <aside className="card" style={{ minHeight: 120 }}>
          <h3 className="h2">Status</h3>
          <p className="small">Identity verification demo</p>
        </aside>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} VAri. All rights reserved.
      </footer>
    </div>
  )
}
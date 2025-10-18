import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Verify from "./pages/Verify"
import Dashboard from "./pages/Dashboard"

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="verify" element={<Verify />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

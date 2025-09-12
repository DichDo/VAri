import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserStore } from "../store/userStore"
import Button from "./Button"

const Navbar: React.FC = () => {
  const token = useUserStore((s) => s.token)
  const logout = useUserStore((s) => s.logout)
  const navigate = useNavigate()

  const doLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <div className="nav">
        {token ? (
          <Button onClick={doLogout} className="btn-ghost">Logout</Button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </>
  )
}

export default Navbar
import React from "react"
import { Navigate } from "react-router-dom"
import { useUserStore } from "../store/userStore"

interface Props { children: JSX.Element }

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = useUserStore((s) => s.token)
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default PrivateRoute
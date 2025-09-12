import React from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<Props> = ({ children, className = "", ...props }) => {
  return (
    <button {...props} className={`btn ${className}`}>
      {children}
    </button>
  )
}

export default Button
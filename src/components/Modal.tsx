import React from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} style={{ float: "right", background: "transparent", border: 0, color: "var(--muted)" }}>
          ✕
        </button>
        <div style={{ clear: "both" }}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
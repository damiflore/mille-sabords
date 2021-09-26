import React from "react"
import ReactDOM from "react-dom"

export const Portal = ({ parent, children }) => {
  if (!parent) {
    return null
  }
  return ReactDOM.createPortal(<>{children}</>, parent)
}

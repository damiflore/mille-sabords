import React from "react"
import ReactDOM from "react-dom"

export const HeadStyle = ({ children }) => {
  return ReactDOM.createPortal(<style type="text/css">{children}</style>, document.head)
}

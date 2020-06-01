import React from "react"
import ReactDOM from "react-dom"

export const HeadStyle = ({ href, children }) => {
  if (href) {
    return ReactDOM.createPortal(
      <link href={href} rel="stylesheet" type="text/css" />,
      document.head,
    )
  }
  return ReactDOM.createPortal(<style type="text/css">{children}</style>, document.head)
}

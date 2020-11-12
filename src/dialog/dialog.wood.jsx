import React from "react"

import { Dialog } from "src/dialog/Dialog.jsx"

export const DialogWood = ({ title, body, ...props }) => {
  return (
    <Dialog {...props} requestCloseOnClickOutside={true}>
      <div className="dialog-border-left"></div>
      <div className="dialog-border-right"></div>

      <div className="dialog-header">
        <div className="dialog-border-top"></div>
        <div className="dialog-title">{title}</div>
      </div>

      <div className="dialog-body">{body}</div>

      <div className="dialog-footer">
        <div className="dialog-border-bottom"></div>
      </div>
    </Dialog>
  )
}

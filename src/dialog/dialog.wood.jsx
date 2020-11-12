import React from "react"

import { Dialog } from "src/dialog/Dialog.jsx"

export const DialogWood = ({ title, body, ...props }) => {
  return (
    <Dialog
      {...props}
      requestCloseOnClickOutside={true}
      header={
        <>
          <div className="dialog-border-top"></div>
          <div className="dialog-title">{title}</div>
        </>
      }
      footer={<div className="dialog-border-bottom"></div>}
    >
      <div className="dialog-wood-body">
        <div className="dialog-border-left"></div>
        <div className="dialog-body">{body}</div>
        <div className="dialog-border-right"></div>
      </div>
    </Dialog>
  )
}

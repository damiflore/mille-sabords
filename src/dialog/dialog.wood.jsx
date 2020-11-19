import React from "react"

import { Dialog } from "src/dialog/dialog.component.jsx"

export const DialogWood = ({ title, children, ...props }) => {
  return (
    <Dialog
      requestCloseOnClickOutside={true}
      insertTop={
        <>
          <div className="dialog-border-top"></div>
          <div className="dialog-title">{title}</div>
        </>
      }
      insertBottom={<div className="dialog-border-bottom"></div>}
      insertLeft={<div className="dialog-border-left"></div>}
      insertRight={<div className="dialog-border-right"></div>}
      {...props}
      className={`dialog-theme-wood dialog-spacing-10 dialog-spacing-fluid dialog-spacing-top-fixed ${props.className}`}
    >
      {children}
    </Dialog>
  )
}

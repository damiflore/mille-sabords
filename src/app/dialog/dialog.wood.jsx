import React from "react"

import { Dialog } from "./dialog.component.jsx"
import { CloseIcon } from "./CloseIcon.jsx"

export const DialogWood = ({ title, spacingClasses, children, ...props }) => {
  return (
    <Dialog
      requestCloseOnClickOutside={true}
      insertTop={
        <>
          <div className="dialog-border-top"></div>
          <div className="dialog-title">
            <div className="dialog-title-text">{title}</div>
          </div>
          <div className="dialog-close" onClick={props.onRequestClose}>
            <CloseIcon />
          </div>
        </>
      }
      insertBottom={<div className="dialog-border-bottom"></div>}
      insertLeft={<div className="dialog-border-left"></div>}
      insertRight={<div className="dialog-border-right"></div>}
      {...props}
      className={`dialog-theme-wood ${
        spacingClasses ||
        "dialog-spacing-10 dialog-spacing-fluid dialog-spacing-top-fixed"
      } ${props.className}`}
    >
      {children}
    </Dialog>
  )
}

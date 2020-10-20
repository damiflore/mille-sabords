import React from "react"

import { useMainDomNode } from "src/dom/dom.main.js"
import { Stylesheet } from "src/generic/Stylesheet.jsx"

import { DialogBase } from "./DialogBase.jsx"
import dialogCssUrl from "src/dialog/dialog.css"

export const Dialog = (props) => {
  return (
    <>
      <Stylesheet href={dialogCssUrl} />
      <DialogBase
        container={useMainDomNode()}
        backdropProps={{
          className: "dialog--backdrop",
        }}
        style={{
          top: "10%",
          left: "6%",
          right: "6%",
          bottom: "8%",
          height: "auto",
          width: "auto",
          padding: "0",
          border: "none",
          background: "none",
          maxWidth: "620px",
          margin: "0 auto",
        }}
        className={"dialog"}
        {...props}
      />
    </>
  )
}

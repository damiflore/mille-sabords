import React from "react"

import { useMainDomNode } from "src/dom/dom.main.js"
import { Stylesheet } from "src/generic/Stylesheet.jsx"

import { DialogBase } from "./DialogBase.jsx"
import dialogCssUrl from "src/dialog/dialog.css"

export const Dialog = (props) => {
  return (
    <>
      <Stylesheet href={dialogCssUrl} />
      <DialogBase container={useMainDomNode()} {...props} />
    </>
  )
}

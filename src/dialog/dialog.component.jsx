import React from "react"

import { useMainDomNode } from "src/dom/dom.main.js"
import { Stylesheet } from "src/generic/Stylesheet.jsx"

import { DialogBase } from "./DialogBase.jsx"

const dialogCssUrl = new URL("/src/dialog/dialog.css", import.meta.url)

export const Dialog = (props) => {
  return (
    <>
      <Stylesheet href={dialogCssUrl} />
      <DialogBase container={useMainDomNode()} {...props} />
    </>
  )
}

export const useDialogState = (initialValue = false) => {
  const [dialogIsOpen, setDialogIsOpen] = React.useState(initialValue)
  const openDialog = () => {
    setDialogIsOpen(true)
  }
  const closeDialog = () => {
    setDialogIsOpen(false)
  }
  return [dialogIsOpen, openDialog, closeDialog]
}

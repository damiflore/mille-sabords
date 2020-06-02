/**

This scenario is to test

- escape can be used to close dialog event when it does not have focusable elements

*/

import React from "react"
import ReactDOM from "react-dom"
import { Dialog } from "../Dialog.jsx"

const App = () => {
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false)

  const openDialog = () => {
    setDialogIsOpen(true)
  }

  const closeDialog = () => {
    setDialogIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => {
          openDialog()
        }}
      >
        Open dialog
      </button>
      <Dialog isOpen={dialogIsOpen} onRequestClose={closeDialog} trapFocus={true}>
        Hello world
      </Dialog>
    </>
  )
}

ReactDOM.render(<App />, document.querySelector("#app"))

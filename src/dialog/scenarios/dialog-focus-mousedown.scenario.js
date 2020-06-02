/**

This scenario is to test

- mousedown outside when dialog has focus keeps focus inside dialog
- mousedown outside when dialog has not focus transfer focus to the dialog

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
      <Dialog isOpen={dialogIsOpen} onRequestClose={closeDialog} trapFocus={false}>
        Hello world
        <button onClick={closeDialog}>Close</button>
      </Dialog>
    </>
  )
}

ReactDOM.render(<App />, document.querySelector("#app"))

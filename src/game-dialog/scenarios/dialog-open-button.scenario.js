/**

this scenario is meant to test that

- dialog can be opened and closed
- focus trap works (once opened tab works inly inside dialog)
- focus is properly restored on the button opening the dialog
- escape works (it closes dialog)


more scenarios:

- ensure click outside to close
- ensure click outside focuses dialog (when focus trap is disable)
- ensure focus out can be detected when focus trap is disabled

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
      <Dialog
        isOpen={dialogIsOpen}
        onRequestClose={closeDialog}
        onFocusIn={() => {
          console.log("focusin")
        }}
        onFocusOut={() => {
          console.log("focusout")
        }}
      >
        Hello world
        <button onClick={closeDialog}>Close</button>
      </Dialog>
    </>
  )
}

ReactDOM.render(<App />, document.querySelector("#app"))

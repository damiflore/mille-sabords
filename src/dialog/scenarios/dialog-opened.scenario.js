/**

This scenario is to test

- a dialog can be opened by default

*/

import React from "react"
import ReactDOM from "react-dom"
import { Dialog } from "../Dialog.jsx"

const App = () => {
  const [dialogIsOpen, setDialogIsOpen] = React.useState(true)

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
        trapFocus={false}
        requestCloseOnClickOutside={true}
      >
        Hello world
        <button onClick={closeDialog}>Close</button>
      </Dialog>
    </>
  )
}

ReactDOM.render(<App />, document.querySelector("#app"))

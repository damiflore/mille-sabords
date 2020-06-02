/**

This scenario is to test

- click outside to close
- onFocusIn, onFocusOut is working

*/

import React from "react"
import ReactDOM from "react-dom"
import { Dialog } from "../Dialog.jsx"

const App = () => {
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false)
  const [focusInside, setFocusInside] = React.useState(false)

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
      <span>
        {
          // eslint-disable-next-line no-nested-ternary
          dialogIsOpen
            ? focusInside
              ? "focus is inside dialog"
              : "focus is outside dialog"
            : "dialog not opened "
        }
      </span>
      <Dialog
        isOpen={dialogIsOpen}
        onRequestClose={closeDialog}
        trapFocus={false}
        requestCloseOnClickOutside={true}
        onFocusIn={() => {
          setFocusInside(true)
        }}
        onFocusOut={() => {
          setFocusInside(false)
        }}
      >
        Hello world
        <button onClick={closeDialog}>Close</button>
      </Dialog>
    </>
  )
}

ReactDOM.render(<App />, document.querySelector("#app"))

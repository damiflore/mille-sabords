import React from "react"

import { HeadStyle } from "src/generic/HeadStyle.js"

import { DialogBase } from "./DialogBase.jsx"

export const Dialog = (props) => {
  return (
    <>
      <DialogHeadStyle />
      <DialogBase
        overlayProps={{
          className: "dialog--overlay",
        }}
        className={"dialog"}
        {...props}
      />
    </>
  )
}

let DialogHeadStyle = () => <HeadStyle href="/src/dialog/dialog.css" />
DialogHeadStyle = React.memo(DialogHeadStyle)

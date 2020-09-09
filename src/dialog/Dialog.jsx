import React from "react"

import { useGameDomNode } from "src/game.store.js"
import { HeadStyle } from "src/generic/HeadStyle.js"

import { DialogBase } from "./DialogBase.jsx"

export const Dialog = (props) => {
  return (
    <>
      <DialogHeadStyle />
      <DialogBase
        container={useGameDomNode()}
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

let DialogHeadStyle = () => <HeadStyle href="/src/dialog/dialog.css" />
DialogHeadStyle = React.memo(DialogHeadStyle)

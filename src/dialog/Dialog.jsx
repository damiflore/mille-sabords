import React from "react"

import { useGameDomNode } from "src/game.store.js"
import { HeadCSSLink } from "src/generic/HeadCSSLink.jsx"

import { DialogBase } from "./DialogBase.jsx"

export const Dialog = (props) => {
  return (
    <>
      <DialogHeadCSS />
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

let DialogHeadCSS = () => <HeadCSSLink href="/src/dialog/dialog.css" />
DialogHeadCSS = React.memo(DialogHeadCSS)

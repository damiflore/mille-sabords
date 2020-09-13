import React from "react"
import ReactDOM from "react-dom"
import { useRessourceTracker } from "src/game.store.js"
import { addDomEventListener } from "src/dom/dom.js"

export const HeadCSSLink = ({ href }) => {
  const endLoadingRessource = useRessourceTracker(href)

  return ReactDOM.createPortal(
    <link
      href={href}
      ref={(node) => {
        if (!node) return () => {}
        return addDomEventListener(node, "load", endLoadingRessource)
      }}
      rel="stylesheet"
      type="text/css"
    />,
    document.head,
  )
}

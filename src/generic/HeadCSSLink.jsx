import React from "react"
import ReactDOM from "react-dom"
import { useStartLoadingRessource, useEndLoadingRessource } from "src/game.store.js"
import { addDomEventListener } from "src/dom/dom.js"

export const HeadCSSLink = ({ href }) => {
  const startLoadingRessource = useStartLoadingRessource(href)
  const endLoadingRessource = useEndLoadingRessource(href)
  React.useEffect(() => {
    startLoadingRessource()
  }, [])

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

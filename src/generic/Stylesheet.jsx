import React from "react"
import ReactDOM from "react-dom"
import { useAssetTracker, addLoadedListener } from "src/booting/booting.main.js"

export const Stylesheet = ({ href }) => {
  const stylesheetLoadEnds = useAssetTracker(href)

  return ReactDOM.createPortal(
    <link
      href={href}
      ref={(node) => {
        if (!node) return () => {}
        return addLoadedListener(node, stylesheetLoadEnds)
      }}
      rel="stylesheet"
      type="text/css"
    />,
    document.head,
  )
}

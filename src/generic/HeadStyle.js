import React from "react"
import ReactDOM from "react-dom"
import { useGameRessourceLoaded } from "src/hooks.js"
import { addDomEventListener } from "src/dom/dom.js"

export const HeadStyle = ({ href, children }) => {
  if (href) {
    return <HeadCssLink href={href} />
  }
  return ReactDOM.createPortal(<style type="text/css">{children}</style>, document.head)
}

const HeadCssLink = ({ href }) => {
  const gameRessourceLoaded = useGameRessourceLoaded(href)

  return ReactDOM.createPortal(
    <link
      href={href}
      ref={(node) => {
        if (!node) return () => {}
        return addDomEventListener(node, "load", () => {
          gameRessourceLoaded(true)
        })
      }}
      rel="stylesheet"
      type="text/css"
    />,
    document.head,
  )
}

import React from "react"
import ReactDOM from "react-dom"
import { useDOMNodeLoadingNotifier } from "src/loading/loading.main.js"

export const Stylesheet = ({ href }) => {
  const ref = useDOMNodeLoadingNotifier(href)

  return ReactDOM.createPortal(
    <link href={href} ref={ref} rel="stylesheet" type="text/css" />,
    document.head,
  )
}

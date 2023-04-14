import React from "react"
import ReactDOM from "react-dom"

import { ContextProvider } from "/app/main.context.jsx"
import { Main } from "/app/main.component.jsx"

export const createMilleSabordGame = ({ into, onLoadProgress }) => {
  return new Promise((resolve, reject) => {
    ReactDOM.render(
      <ContextProvider>
        <Main
          rootNode={into}
          onLoadProgress={onLoadProgress}
          onError={reject}
          onReady={resolve}
        />
      </ContextProvider>,
      into,
    )
  })
}

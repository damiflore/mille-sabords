import React from "react"
import ReactDOM from "react-dom"

import { ContextProvider } from "root/src/app/main.context.js"
import { Main } from "root/src/app/main.component.js"

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

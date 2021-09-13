import React from "react"
import ReactDOM from "react-dom"

import { ContextProvider } from "src/main.context.js"
import { Main } from "src/main.component.js"

export const createMilleSabordGame = ({ into, onError, onReady }) => {
  ReactDOM.render(
    <ContextProvider>
      <Main onError={onError} onReady={onReady} />
    </ContextProvider>,
    into,
  )
}

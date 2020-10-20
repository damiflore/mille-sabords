import React from "react"
import ReactDOM from "react-dom"

import { ContextProvider } from "src/main.context.js"

export const createMilleSabordGame = async ({ into }) => {
  const { Main } = await import("src/main.component.js")

  ReactDOM.render(
    <ContextProvider>
      <Main />
    </ContextProvider>,
    into,
  )
}

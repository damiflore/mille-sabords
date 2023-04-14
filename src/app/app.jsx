import React from "react"
import { createRoot } from "react-dom/client"

import { ContextProvider } from "/app/main.context.jsx"
import { Main } from "/app/main.component.jsx"

export const createMilleSabordGame = ({ into, onLoadProgress }) => {
  return new Promise((resolve, reject) => {
    const root = createRoot(into)
    root.render(
      <ContextProvider>
        <Main
          rootNode={into}
          onLoadProgress={onLoadProgress}
          onError={reject}
          onReady={resolve}
        />
      </ContextProvider>,
    )
  })
}

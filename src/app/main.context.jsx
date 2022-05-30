import React from "react"

import { store } from "/src/app/main.store.js"
import { DomNodesProvider } from "/src/app/dom/dom.main.jsx"

// https://github.com/facebook/react/issues/14620
export const ContextProvider = ({ initialState, children }) => {
  return (
    <store.Provider initialState={initialState}>
      <DomNodesProvider>{children}</DomNodesProvider>
    </store.Provider>
  )
}

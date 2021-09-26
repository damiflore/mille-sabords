import React from "react"

import { store } from "root/src/app/main.store.js"
import { DomNodesProvider } from "root/src/app/dom/dom.main.js"

// https://github.com/facebook/react/issues/14620
export const ContextProvider = ({ initialState, children }) => {
  return (
    <store.Provider initialState={initialState}>
      <DomNodesProvider>{children}</DomNodesProvider>
    </store.Provider>
  )
}

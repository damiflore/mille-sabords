import React from "react"
import { store } from "src/main.store.js"
import { DomNodesProvider } from "src/dom/dom.main.js"
import { DragDiceGestureProvider } from "src/drag/drag.main.js"

// https://github.com/facebook/react/issues/14620
export const ContextProvider = ({ initialState, children }) => {
  return (
    <store.Provider initialState={initialState}>
      <DomNodesProvider>
        <DragDiceGestureProvider>{children}</DragDiceGestureProvider>
      </DomNodesProvider>
    </store.Provider>
  )
}

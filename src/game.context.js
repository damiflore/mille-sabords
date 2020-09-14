import React from "react"
import { gameStore } from "src/game.store.js"
import { AssetsTrackingProvider } from "src/booting/booting.main.js"
import { DomNodesProvider } from "src/dom/dom.main.js"
import { DragDiceGestureProvider } from "src/drag/drag.main.js"

// https://github.com/facebook/react/issues/14620
export const GameContextProvider = ({ gameState, children }) => {
  return (
    <gameStore.Provider initialState={gameState}>
      <AssetsTrackingProvider>
        <DomNodesProvider>
          <DragDiceGestureProvider>{children}</DragDiceGestureProvider>
        </DomNodesProvider>
      </AssetsTrackingProvider>
    </gameStore.Provider>
  )
}

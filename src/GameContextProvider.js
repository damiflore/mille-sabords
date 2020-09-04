import React from "react"
import { gameStateStore, rolledAreaStore, dialogContainerStore, diceStores } from "./game.store.js"

const GameStateStoreProvider = gameStateStore.Provider

const providers = [
  rolledAreaStore.Provider,
  dialogContainerStore.Provider,
  ...Object.keys(diceStores).map((key) => diceStores[key].Provider),
]

const NodeProvider = ({ children }) => {
  return providers.reduceRight((prev, Next) => {
    return <Next>{prev}</Next>
  }, children)
}

// https://github.com/facebook/react/issues/14620
export const GameContextProvider = ({ gameState, children }) => {
  return (
    <GameStateStoreProvider initialState={gameState}>
      <NodeProvider>{children}</NodeProvider>
    </GameStateStoreProvider>
  )
}

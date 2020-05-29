import React from "react"
import { gameNodeStore, gameStateStore } from "./game.store.js"

const GameStateStoreProvider = gameStateStore.Provider
const GameNodeStoreProvider = gameNodeStore.Provider

// https://github.com/facebook/react/issues/14620
export const GameContextProvider = ({ gameState, children }) => {
  return (
    <GameStateStoreProvider initialState={gameState}>
      <GameNodeStoreProvider>{children}</GameNodeStoreProvider>
    </GameStateStoreProvider>
  )
}

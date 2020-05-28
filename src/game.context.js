import React from "react"
import { gameStateStore } from "src/game.stateStore.js"
import { gameNodeStore } from "src/game.nodeStore.js"

const GameStateStoreContextProvider = gameStateStore.ContextProvider
const GameNodeStoreContextProvider = gameNodeStore.ContextProvider

// https://github.com/facebook/react/issues/14620
export const GameContextProvider = ({ gameState, children }) => {
  return (
    <GameStateStoreContextProvider initialState={gameState}>
      <GameNodeStoreContextProvider>{children}</GameNodeStoreContextProvider>
    </GameStateStoreContextProvider>
  )
}

export const createGameAction = gameStateStore.createAction

export const useGameState = gameStateStore.useState

export const useGameDispatch = gameStateStore.useDispatch

export const createGameSelector = gameStateStore.createSelector

export const useGameNode = gameNodeStore.useDOMNode

export const useGameNodeCallback = gameNodeStore.useDOMNodeCallback

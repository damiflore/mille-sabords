import { createSimplifiedStore } from "./createSimplifiedStore.js"

export const gameStore = createSimplifiedStore()

export const useGameState = gameStore.useState

export const createGameSelector = gameStore.createSelector

export const createGameAction = gameStore.createAction

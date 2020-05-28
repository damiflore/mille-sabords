import { createLogger } from "@jsenv/logger"
import { createSimplifiedStore } from "./createSimplifiedStore.js"
import { CARDS, mixDeck } from "src/cards/cards.js"
import { DICES } from "src/dices/dices.js"

const defaultState = {
  // persist accross a game round
  totalScore: 0,
  cardDeck: mixDeck(CARDS),
  cardsUsed: [],
  dices: DICES,
  // game round
  rollIndex: -1,
  scoreMarked: false,
  isOnSkullIsland: false,
  cardDrawn: false,
  card: null,
  witchUncursedDiceId: undefined,
  diceRolled: [],
  diceCursed: [],
  diceKept: [],
}

const logger = createLogger({ logLevel: "warn" })
const gameStateSessionStorageKey = "game"
const gameStore = createSimplifiedStore(defaultState, {
  init: (initialState) => {
    if (sessionStorage.hasOwnProperty(gameStateSessionStorageKey)) {
      const valueFromSessionStorage = JSON.parse(sessionStorage.getItem(gameStateSessionStorageKey))
      // TODO: when we will update the game
      // previously stored data might be in an unexpected format
      // we should also store a kind of version to be sure we are compatible
      // with the data we try to restore
      logger.debug(`read sessionStorage ${gameStateSessionStorageKey} = `, valueFromSessionStorage)
      return valueFromSessionStorage
    }
    logger.debug(
      `sessionStorage has nothing for ${gameStateSessionStorageKey}, use initial state`,
      initialState,
    )
    return initialState
  },
  effect: (state) => {
    logger.debug(`write sessionStorage ${gameStateSessionStorageKey} = `, state)
    sessionStorage.setItem(gameStateSessionStorageKey, JSON.stringify(state))
  },
})

export const createGameAction = gameStore.createAction

export const useGameState = gameStore.useState

export const useGameDispatch = gameStore.useDispatch

export const createGameSelector = gameStore.createSelector

export const GameContextProvider = gameStore.ContextProvider

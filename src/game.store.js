import React from "react"
import { createLogger } from "@jsenv/logger"
import { createStructuredStateStore } from "./store/createStructuredStateStore.js"
import { CARDS, mixDeck } from "src/cards/cards.js"
import { DICES } from "src/dices/dices.js"

const { createContext, useContext, useState } = React

const defaultState = {
  // persist accross a game round
  totalScore: 0,
  cardDeck: mixDeck(CARDS),
  cardsUsed: [],
  dices: DICES,
  // game round
  roundStarted: false,
  rollCount: 0,
  currentCard: null,
  scoreMarked: false,
  isOnSkullIsland: false,
  witchUncursedDiceId: undefined,
  dicesRolled: [],
  dicesCursed: [],
  dicesKept: [],
}

const logger = createLogger({ logLevel: "warn" })
const gameStateSessionStorageKey = "game"
export const gameStateStore = createStructuredStateStore(
  defaultState,
  () => {
    if (sessionStorage.hasOwnProperty(gameStateSessionStorageKey)) {
      const valueFromSessionStorage = JSON.parse(sessionStorage.getItem(gameStateSessionStorageKey))

      // Here we check for missing or extra key in case the stored game state is outdated.
      // It happens when a new version of the game is released and the stored game state
      // is not in sync with the new game state
      // We could use a version instead but during dev we won't think to update the version
      const missingKey = Object.keys(defaultState).find(
        (key) => key in valueFromSessionStorage === false,
      )
      if (missingKey) {
        logger.debug(
          `stored game state is missing a property (${missingKey}) -> use initial game state instead`,
        )
        return defaultState
      }
      const extraKey = Object.keys(valueFromSessionStorage).find(
        (key) => key in defaultState === false,
      )
      if (extraKey) {
        logger.debug(
          `stored game state contains an unknown property (${missingKey}) -> use initial game state instead`,
        )
        return defaultState
      }

      logger.debug(`read sessionStorage ${gameStateSessionStorageKey} = `, valueFromSessionStorage)
      return valueFromSessionStorage
    }
    logger.debug(`no game state stored -> use initial game state`)
    return defaultState
  },
  {
    effect: (state) => {
      logger.debug(`write sessionStorage ${gameStateSessionStorageKey} = `, state)
      sessionStorage.setItem(gameStateSessionStorageKey, JSON.stringify(state))
    },
  },
)

export const useTotalScore = () => gameStateStore.useKeyedState("totalScore")
export const useCardDeck = () => gameStateStore.useKeyedState("cardDeck")
export const useCardsUsed = () => gameStateStore.useKeyedState("cardsUsed")
export const useDices = () => gameStateStore.useKeyedState("dices")
export const useRoundStarted = () => gameStateStore.useKeyedState("roundStarted")
export const useRollCount = () => gameStateStore.useKeyedState("rollCount")
export const useScoreMarked = () => gameStateStore.useKeyedState("scoreMarked")
export const useIsOnSkullIsland = () => gameStateStore.useKeyedState("isOnSkullIsland")
export const useCurrentCard = () => gameStateStore.useKeyedState("currentCard")
export const useWitchUncursedDiceId = () => gameStateStore.useKeyedState("witchUncursedDiceId")
export const useDicesRolled = () => gameStateStore.useKeyedState("dicesRolled")
export const useDicesCursed = () => gameStateStore.useKeyedState("dicesCursed")
export const useDicesKept = () => gameStateStore.useKeyedState("dicesKept")

export const useGameDispatch = gameStateStore.useDispatch
export const createGameAction = gameStateStore.createAction

const GameStateProvider = gameStateStore.Provider
GameStateProvider.displayName = "GameStateProvider"

const rolledAreaContext = createContext()
const RolledAreaProvider = rolledAreaContext.Provider
// RolledAreaProvider.displayName = "RolledAreaNodeProvider"
export const useRolledAreaNode = () => useContext(rolledAreaContext)[0]
export const useRolledAreaNodeSetter = () => useContext(rolledAreaContext)[1]

const diceContainerContext = createContext()
const DiceContainerProvider = diceContainerContext.Provider
DiceContainerProvider.displayName = "DiceContainerNodeProvider"
export const useDialogContainerNode = () => useContext(diceContainerContext)[0]
export const useDialogContainerNodeSetter = () => useContext(diceContainerContext)[0]

const dicesContext = {}
DICES.forEach((dice) => {
  dicesContext[dice.id] = createContext()
})
const diceProviders = Object.keys(dicesContext).map((key) => dicesContext[key].Provider)
const DiceNodesProvider = ({ children }) => {
  return diceProviders.reduceRight((prev, Next) => {
    return <Next value={useState()}>{prev}</Next>
  }, children)
}
export const useDiceNode = (id) => useContext(dicesContext[id])[0]
export const useDiceNodeSetter = (id) => useContext(dicesContext[id])[0]

// https://github.com/facebook/react/issues/14620
export const GameContextProvider = ({ gameState, children }) => {
  return (
    <GameStateProvider initialState={gameState}>
      <DiceContainerProvider value={useState()}>
        <RolledAreaProvider value={useState()}>
          <DiceNodesProvider>{children}</DiceNodesProvider>
        </RolledAreaProvider>
      </DiceContainerProvider>
    </GameStateProvider>
  )
}

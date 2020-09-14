import React from "react"
import { createLogger } from "@jsenv/logger"
import { createStructuredStateStore } from "./store/createStructuredStateStore.js"
import { AssetsTrackingProvider } from "src/booting/booting.main.js"
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
  witchUncursedDiceId: null,
  dicesRolled: [],
  dicesCursed: [],
  chestSlots: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
  },
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
        logger.warn(
          `stored game state is missing a property (${missingKey}) -> use initial game state instead`,
        )
        return defaultState
      }
      const extraKey = Object.keys(valueFromSessionStorage).find(
        (key) => key in defaultState === false,
      )
      if (extraKey) {
        logger.warn(
          `stored game state contains an unknown property (${extraKey}) -> use initial game state instead`,
        )
        return defaultState
      }

      logger.info(`read sessionStorage ${gameStateSessionStorageKey} = `, valueFromSessionStorage)
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
export const useChestSlots = () => gameStateStore.useKeyedState("chestSlots")

export const useGameDispatch = gameStateStore.useDispatch
export const createGameAction = gameStateStore.createAction

const GameStateProvider = gameStateStore.Provider
GameStateProvider.displayName = "GameStateProvider"

const RolledAreaDomNodeContext = createContext()
const RolledAreaDomNodeProvider = RolledAreaDomNodeContext.Provider
RolledAreaDomNodeProvider.displayName = "RolledAreaDomNodeProvider"
export const useRolledAreaDomNode = () => useContext(RolledAreaDomNodeContext)[0]
export const useRolledAreaDomNodeSetter = () => useContext(RolledAreaDomNodeContext)[1]

const GameDomNodeContext = createContext()
const GameDomNodeProvider = GameDomNodeContext.Provider
GameDomNodeProvider.displayName = "GameDomNodeProvider"
export const useGameDomNode = () => useContext(GameDomNodeContext)[0]
export const useGameDomNodeSetter = () => useContext(GameDomNodeContext)[1]

const diceDomNodeContexts = {}
DICES.forEach((dice) => {
  diceDomNodeContexts[dice.id] = createContext()
})
const diceDomNodeProviders = Object.keys(diceDomNodeContexts).map(
  (key) => diceDomNodeContexts[key].Provider,
)
const DiceDomNodesProvider = ({ children }) => {
  return diceDomNodeProviders.reduceRight((prev, Next) => {
    return <Next value={useState()}>{prev}</Next>
  }, children)
}
export const useDiceDomNode = (id) => useContext(diceDomNodeContexts[id])[0]
export const useDiceDomNodeSetter = (id) => useContext(diceDomNodeContexts[id])[1]

const DragDiceGestureContext = createContext()
const DragDiceGestureProvider = DragDiceGestureContext.Provider
DragDiceGestureProvider.displayName = "DragDiceGestureProvider"
export const useDragDiceGesture = () => useContext(DragDiceGestureContext)[0]
export const useDragDiceGestureSetter = () => useContext(DragDiceGestureContext)[1]

// https://github.com/facebook/react/issues/14620
export const GameContextProvider = ({ gameState, children }) => {
  return (
    <GameStateProvider initialState={gameState}>
      <AssetsTrackingProvider>
        <GameDomNodeProvider value={useState()}>
          <RolledAreaDomNodeProvider value={useState()}>
            <DiceDomNodesProvider>
              <DragDiceGestureProvider value={useState()}>{children}</DragDiceGestureProvider>
            </DiceDomNodesProvider>
          </RolledAreaDomNodeProvider>
        </GameDomNodeProvider>
      </AssetsTrackingProvider>
    </GameStateProvider>
  )
}

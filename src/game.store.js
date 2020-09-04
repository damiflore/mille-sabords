import { createLogger } from "@jsenv/logger"
import { createStructuredStateStore } from "./store/createStructuredStateStore.js"
import { createDOMNodeStore } from "./store/createDOMNodeStore.js"
import { CARDS, mixDeck } from "src/cards/cards.js"
import { DICES } from "src/dices/dices.js"

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

export const gameNodeStore = createDOMNodeStore({
  "rolled-area": null,
  "dialog-container": null,
  ...DICES.reduce((obj, dice) => {
    return { ...obj, [`dice-${dice.id}`]: null }
  }, {}),
})
export const useDialogContainerNode = () => gameNodeStore.useDOMNode("dialog-container")
export const useDialogContainerCallback = () => gameNodeStore.useDOMNodeCallback("dialog-container")
export const useRolledAreaNode = () => gameNodeStore.useDOMNode("rolled-area")
export const useRolledAreaNodeCallback = () => gameNodeStore.useDOMNodeCallback("rolled-area")
export const useDiceNode = (id) => gameNodeStore.useDOMNode(`dice-${id}`)
export const useDiceNodeCallback = (id) => gameNodeStore.useDOMNodeCallback(`dice-${id}`)

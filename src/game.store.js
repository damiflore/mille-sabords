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
export const gameStateStore = createStructuredStateStore(
  defaultState,
  () => {
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
      defaultState,
    )
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
export const useRollIndex = () => gameStateStore.useKeyedState("rollIndex")
export const useScoreMarked = () => gameStateStore.useKeyedState("scoreMarked")
export const useIsOnSkullIsland = () => gameStateStore.useKeyedState("isOnSkullIsland")
export const useCardDrawn = () => gameStateStore.useKeyedState("cardDrawn")
export const useCard = () => gameStateStore.useKeyedState("card")
export const useWitchUncursedDiceId = () => gameStateStore.useKeyedState("witchUncursedDiceId")
export const useDiceRolled = () => gameStateStore.useKeyedState("diceRolled")
export const useDiceCursed = () => gameStateStore.useKeyedState("diceCursed")
export const useDiceKept = () => gameStateStore.useKeyedState("diceKept")

export const useGameDispatch = gameStateStore.useDispatch
export const createGameAction = gameStateStore.createAction

export const gameNodeStore = createDOMNodeStore()
export const useGameNode = gameNodeStore.useDOMNode
export const useGameNodeCallback = gameNodeStore.useDOMNodeCallback

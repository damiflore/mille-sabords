import { createLogger } from "@jsenv/logger"
import { createStructuredStateStore } from "src/store/createStructuredStateStore.js"
import { CARDS, mixDeck } from "src/cards/cards.js"
import { DICES } from "src/dices/dices.js"

const defaultState = {
  gameCreated: false,
  gameStarted: false,
  players: [],
  currentPlayerId: null,
  scoreBoardOpened: false,

  // persist accross a game round
  cardDeck: mixDeck(CARDS),
  cardsUsed: [],
  dices: DICES,

  // game round
  currentPlayerGettingReady: false,
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
const stateStorageKey = "game"
export const store = createStructuredStateStore(
  defaultState,
  () => {
    if (localStorage.hasOwnProperty(stateStorageKey)) {
      const valueFromStorage = JSON.parse(localStorage.getItem(stateStorageKey))

      // idéalement on voudrait plus qu'un log ici
      // on voudrait afficher un message dans la ui pour expliquer pourquoi la partie a été supprimée

      // Here we check for missing or extra key in case the stored game state is outdated.
      // It happens when a new version of the game is released and the stored game state
      // is not in sync with the new game state
      // We could use a version instead but during dev we won't think to update the version
      const missingKey = Object.keys(defaultState).find((key) => key in valueFromStorage === false)
      if (missingKey) {
        logger.warn(
          `stored game state is missing a property (${missingKey}) -> use initial game state instead`,
        )
        return defaultState
      }
      const extraKey = Object.keys(valueFromStorage).find((key) => key in defaultState === false)
      if (extraKey) {
        logger.warn(
          `stored game state contains an unknown property (${extraKey}) -> use initial game state instead`,
        )
        return defaultState
      }

      logger.info(`read storage ${stateStorageKey} = `, valueFromStorage)
      return valueFromStorage
    }
    logger.debug(`no game state stored -> use initial game state`)
    return defaultState
  },
  {
    effect: (state) => {
      logger.debug(`store ${stateStorageKey} = `, state)
      localStorage.setItem(stateStorageKey, JSON.stringify(state))
    },
  },
)
store.Provider.displayName = "storeProvider"

export const useDispatch = store.useDispatch
export const createAction = store.createAction

export const useGameCreated = () => store.useKeyedState("gameCreated")
export const useGameStarted = () => store.useKeyedState("gameStarted")
export const usePlayers = () => store.useKeyedState("players")
export const useScoreBoardOpened = () => store.useKeyedState("scoreBoardOpened")
export const useCurrentPlayerId = () => store.useKeyedState("currentPlayerId")
export const useCardDeck = () => store.useKeyedState("cardDeck")
export const useCardsUsed = () => store.useKeyedState("cardsUsed")
export const useDices = () => store.useKeyedState("dices")
export const useRoundStarted = () => store.useKeyedState("roundStarted")
export const useCurrentPlayerGettingReady = () => store.useKeyedState("currentPlayerGettingReady")
export const useRollCount = () => store.useKeyedState("rollCount")
export const useScoreMarked = () => store.useKeyedState("scoreMarked")
export const useIsOnSkullIsland = () => store.useKeyedState("isOnSkullIsland")
export const useCurrentCard = () => store.useKeyedState("currentCard")
export const useWitchUncursedDiceId = () => store.useKeyedState("witchUncursedDiceId")
export const useDicesRolled = () => store.useKeyedState("dicesRolled")
export const useDicesCursed = () => store.useKeyedState("dicesCursed")
export const useChestSlots = () => store.useKeyedState("chestSlots")

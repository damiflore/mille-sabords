import { createLogger } from "@jsenv/logger"
import { createStructuredStateStore } from "src/store/createStructuredStateStore.js"
import { CARDS, mixDeck } from "src/cards/cards.js"
import { DICES } from "src/dices/dices.js"
import { createPlayers, CHARACTERS } from "src/players/players.main.js"

const defaultState = {
  gameStarted: false,

  players: createPlayers(CHARACTERS),
  currentPlayerId: 1,

  // persist accross a game round
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
const stateSessionStorageKey = "game"
export const store = createStructuredStateStore(
  defaultState,
  () => {
    if (sessionStorage.hasOwnProperty(stateSessionStorageKey)) {
      const valueFromSessionStorage = JSON.parse(sessionStorage.getItem(stateSessionStorageKey))

      // idéalement on voudrait plus qu'un log ici
      // on voudrait afficher un message dans la ui pour expliquer pourquoi la partie a été supprimée

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

      logger.info(`read sessionStorage ${stateSessionStorageKey} = `, valueFromSessionStorage)
      return valueFromSessionStorage
    }
    logger.debug(`no game state stored -> use initial game state`)
    return defaultState
  },
  {
    effect: (state) => {
      logger.debug(`write sessionStorage ${stateSessionStorageKey} = `, state)
      sessionStorage.setItem(stateSessionStorageKey, JSON.stringify(state))
    },
  },
)
store.Provider.displayName = "storeProvider"

export const useDispatch = store.useDispatch
export const createAction = store.createAction

export const useGameStarted = () => store.useKeyedState("gameStarted")
export const usePlayers = () => store.useKeyedState("players")
export const useCurrentPlayerId = () => store.useKeyedState("currentPlayerId")
export const useCardDeck = () => store.useKeyedState("cardDeck")
export const useCardsUsed = () => store.useKeyedState("cardsUsed")
export const useDices = () => store.useKeyedState("dices")
export const useRoundStarted = () => store.useKeyedState("roundStarted")
export const useRollCount = () => store.useKeyedState("rollCount")
export const useScoreMarked = () => store.useKeyedState("scoreMarked")
export const useIsOnSkullIsland = () => store.useKeyedState("isOnSkullIsland")
export const useCurrentCard = () => store.useKeyedState("currentCard")
export const useWitchUncursedDiceId = () => store.useKeyedState("witchUncursedDiceId")
export const useDicesRolled = () => store.useKeyedState("dicesRolled")
export const useDicesCursed = () => store.useKeyedState("dicesCursed")
export const useChestSlots = () => store.useKeyedState("chestSlots")

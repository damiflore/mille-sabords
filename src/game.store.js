import { createLogger } from "@jsenv/logger"
import { createStructuredStateStore } from "src/store/createStructuredStateStore.js"
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
export const gameStore = createStructuredStateStore(
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
gameStore.Provider.displayName = "GameStoreProvider"

export const useGameDispatch = gameStore.useDispatch
export const createGameAction = gameStore.createAction

export const useTotalScore = () => gameStore.useKeyedState("totalScore")
export const useCardDeck = () => gameStore.useKeyedState("cardDeck")
export const useCardsUsed = () => gameStore.useKeyedState("cardsUsed")
export const useDices = () => gameStore.useKeyedState("dices")
export const useRoundStarted = () => gameStore.useKeyedState("roundStarted")
export const useRollCount = () => gameStore.useKeyedState("rollCount")
export const useScoreMarked = () => gameStore.useKeyedState("scoreMarked")
export const useIsOnSkullIsland = () => gameStore.useKeyedState("isOnSkullIsland")
export const useCurrentCard = () => gameStore.useKeyedState("currentCard")
export const useWitchUncursedDiceId = () => gameStore.useKeyedState("witchUncursedDiceId")
export const useDicesRolled = () => gameStore.useKeyedState("dicesRolled")
export const useDicesCursed = () => gameStore.useKeyedState("dicesCursed")
export const useChestSlots = () => gameStore.useKeyedState("chestSlots")

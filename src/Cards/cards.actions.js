import { createGameAction } from "src/game.store.js"
import {
  DICE_SKULL_FROM_CARD_ONE_SKULL,
  DICE_SKULL_1_FROM_CARD_TWO_SKULLS,
  DICE_SKULL_2_FROM_CARD_TWO_SKULLS,
  DICE_COIN_FROM_CARD_COIN,
  DICE_DIAMOND_FROM_CARD_DIAMOND,
} from "src/cards/cards.js"

export const useActivateOneSkullCard = createGameAction((state) => {
  const { diceCursed } = state
  return {
    ...state,
    diceCursed: [...diceCursed, DICE_SKULL_FROM_CARD_ONE_SKULL],
  }
})

export const useActivateTwoSkullsCard = createGameAction((state) => {
  const { diceCursed } = state
  return {
    ...state,
    diceCursed: [
      ...diceCursed,
      DICE_SKULL_1_FROM_CARD_TWO_SKULLS,
      DICE_SKULL_2_FROM_CARD_TWO_SKULLS,
    ],
  }
})

export const useActivateCoinCard = createGameAction((state) => {
  const { diceKept } = state
  return {
    ...state,
    diceKept: [...diceKept, DICE_COIN_FROM_CARD_COIN],
  }
})

export const useActivateDiamondCard = createGameAction((state) => {
  const { diceKept } = state
  return {
    ...state,
    diceKept: [...diceKept, DICE_DIAMOND_FROM_CARD_DIAMOND],
  }
})

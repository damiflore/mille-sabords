import { createGameAction } from "src/game.store.js"
import {
  skullDiceFromOneSkullCard,
  firstSkullDiceFromTwoSkullsCard,
  secondSkullDiceFromTwoSkullsCard,
  diamondDiceFromCard,
  coinDiceFromCard,
} from "src/Dice/DiceHelpers.js"

export const useActivateOneSkullCard = createGameAction((state) => {
  const { diceCursed } = state
  return {
    ...state,
    diceCursed: [...diceCursed, skullDiceFromOneSkullCard],
  }
})

export const useActivateTwoSkullsCard = createGameAction((state) => {
  const { diceCursed } = state
  return {
    ...state,
    diceCursed: [...diceCursed, firstSkullDiceFromTwoSkullsCard, secondSkullDiceFromTwoSkullsCard],
  }
})

export const useActivateDiamondCard = createGameAction((state) => {
  const { diceKept } = state
  return {
    ...state,
    diceKept: [...diceKept, diamondDiceFromCard],
  }
})

export const useActivateCoinCard = createGameAction((state) => {
  const { diceKept } = state
  return {
    ...state,
    diceKept: [...diceKept, coinDiceFromCard],
  }
})

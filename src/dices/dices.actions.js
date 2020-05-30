import { createGameAction } from "src/game.store.js"

export const useCurseDice = createGameAction((state, dice) => {
  const { dicesRolled, dicesCursed } = state
  return {
    ...state,
    dicesRolled: dicesRolled.filter((diceRolled) => diceRolled.id !== dice.id),
    dicesCursed: [...dicesCursed, dice],
  }
})

export const useUncurseDice = createGameAction((state, dice) => {
  const { dicesRolled, dicesCursed } = state
  return {
    ...state,
    witchUncursedDiceId: dice.id,
    dicesRolled: [...dicesRolled, dice],
    dicesCursed: dicesCursed.filter((diceCursed) => diceCursed.id !== dice.id),
  }
})

export const useUnkeepDice = createGameAction((state, dice) => {
  const { dicesRolled, dicesKept } = state
  return {
    ...state,
    dicesRolled: [...dicesRolled, dice],
    dicesKept: dicesKept.filter((diceKept) => diceKept.id !== dice.id),
  }
})

export const useKeepDice = createGameAction((state, dice) => {
  const { dicesRolled, dicesKept } = state
  return {
    ...state,
    dicesRolled: dicesRolled.filter((diceRolled) => diceRolled.id !== dice.id),
    dicesKept: [...dicesKept, dice],
  }
})

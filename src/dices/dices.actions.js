import { createAction } from "src/main.store.js"

export const useCurseDice = createAction((state, dice) => {
  const { dicesRolled, dicesCursed } = state
  return {
    ...state,
    dicesRolled: dicesRolled.filter((diceRolled) => diceRolled.id !== dice.id),
    dicesCursed: [...dicesCursed, dice],
  }
})

export const useUncurseDice = createAction((state, dice) => {
  const { dicesRolled, dicesCursed } = state
  return {
    ...state,
    witchUncursedDiceId: dice.id,
    dicesRolled: [...dicesRolled, dice],
    dicesCursed: dicesCursed.filter((diceCursed) => diceCursed.id !== dice.id),
  }
})

export const useUnkeepDice = createAction((state, dice, rolledAreaPosition) => {
  const { dicesRolled, chestSlots } = state
  dice.rolledAreaPosition = rolledAreaPosition
  return {
    ...state,
    dicesRolled: [...dicesRolled, dice],
    chestSlots: {
      ...chestSlots,
      [dice.chestSlot]: null,
    },
  }
})

export const useKeepDice = createAction((state, dice, chestSlot) => {
  const { dicesRolled, chestSlots } = state
  dice.chestSlot = chestSlot
  return {
    ...state,
    dicesRolled: dicesRolled.filter((diceRolled) => diceRolled.id !== dice.id),
    chestSlots: {
      ...chestSlots,
      [chestSlot]: {
        type: "dice",
        value: dice,
      },
    },
  }
})

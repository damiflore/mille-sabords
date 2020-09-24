import { createAction } from "src/main.store.js"

export const useMoveDice = createAction((state, dice, { x, y }) => {
  const { dices } = state
  dice.x = x
  dice.y = y
  dice.rotation = 0
  return {
    ...state,
    dices: [...dices],
  }
})

export const useSetDiceChestSlot = createAction((state, dice, chestSlot) => {
  const { chestSlots } = state
  const previousChestSlot = Object.keys(chestSlots).find((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    return chestSlotContent.type === "dice" && chestSlotContent.value === dice.id
  })
  return {
    ...state,
    chestSlots: {
      ...chestSlots,
      ...(previousChestSlot ? { [previousChestSlot]: null } : {}),
      [chestSlot]: { type: "dice", value: dice.id },
    },
  }
})

export const useCurseDice = createAction((state, dice) => {
  const { dicesRolled, dicesCursed } = state
  return {
    ...state,
    dicesRolled: dicesRolled.filter((diceRolledId) => diceRolledId !== dice.id),
    dicesCursed: [...dicesCursed, dice.id],
  }
})

export const useUncurseDice = createAction((state, dice) => {
  const { dicesRolled, dicesCursed } = state
  return {
    ...state,
    witchUncursedDiceId: dice.id,
    dicesRolled: [...dicesRolled, dice.id],
    dicesCursed: dicesCursed.filter((diceCursedId) => diceCursedId !== dice.id),
  }
})

export const useUnkeepDice = createAction((state, dice) => {
  const { dicesRolled, chestSlots } = state
  return {
    ...state,
    dicesRolled: [...dicesRolled, dice].id,
    chestSlots: {
      ...chestSlots,
      [dice.chestSlot]: null,
    },
  }
})

export const useKeepDice = createAction((state, dice, chestSlot) => {
  const { dicesRolled, chestSlots } = state
  return {
    ...state,
    dicesRolled: dicesRolled.filter((diceRolledId) => diceRolledId !== dice.id),
    chestSlots: {
      ...chestSlots,
      [chestSlot]: {
        type: "dice",
        value: dice.id,
      },
    },
  }
})

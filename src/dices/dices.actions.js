import { createAction } from "src/main.store.js"

export const useMoveDice = createAction((state, dice, { x, y }) => {
  const { dices } = state
  dice.x = x
  dice.y = y
  return {
    ...state,
    dices: [...dices],
  }
})

export const useSetDiceChestSlot = createAction((state, dice, chestSlot) => {
  const { chestSlots } = state
  const previousChestSlot = Object.keys(chestSlots).find((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    return (
      chestSlotContent && chestSlotContent.type === "dice" && chestSlotContent.value === dice.id
    )
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
  const { diceRolledIds, diceCursedIds } = state
  return {
    ...state,
    diceRolledIds: diceRolledIds.filter((diceRolledId) => diceRolledId !== dice.id),
    diceCursedIds: [...diceCursedIds, dice.id],
  }
})

export const useUncurseDice = createAction((state, dice) => {
  const { diceRolledIds, diceCursedIds } = state
  return {
    ...state,
    witchUncursedDiceId: dice.id,
    diceRolledIds: [...diceRolledIds, dice.id],
    diceCursedIds: diceCursedIds.filter((diceCursedId) => diceCursedId !== dice.id),
  }
})

export const useUnkeepDice = createAction((state, dice) => {
  const { diceRolledIs, chestSlots } = state
  const previousChestSlot = Object.keys(chestSlots).find((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    return (
      chestSlotContent && chestSlotContent.type === "dice" && chestSlotContent.value === dice.id
    )
  })
  return {
    ...state,
    diceRolledIds: [...diceRolledIs, dice.id],
    chestSlots: {
      ...chestSlots,
      [previousChestSlot]: null,
    },
  }
})

export const useKeepDice = createAction((state, dice, chestSlot) => {
  const { diceRolledIds, chestSlots } = state
  return {
    ...state,
    diceRolledIds: diceRolledIds.filter((diceRolledId) => diceRolledId !== dice.id),
    chestSlots: {
      ...chestSlots,
      [chestSlot]: {
        type: "dice",
        value: dice.id,
      },
    },
  }
})

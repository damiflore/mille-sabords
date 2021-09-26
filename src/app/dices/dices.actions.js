import { createAction } from "root/src/app/main.store.js"

export const useSetDiceRolledAreaPosition = createAction(
  (state, dice, { x, y }, zIndex) => {
    const { dices } = state
    dice.rolledAreaPosition = { x, y }
    dice.rolledAreaZIndex = zIndex
    return {
      ...state,
      dices: { ...dices },
    }
  },
)

export const useSetDiceChestSlot = createAction((state, dice, chestSlot) => {
  const { chestSlots } = state
  const previousChestSlot = Object.keys(chestSlots).find((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    return (
      chestSlotContent &&
      chestSlotContent.type === "dice" &&
      chestSlotContent.value === dice.id
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
    diceRolledIds: diceRolledIds.filter(
      (diceRolledId) => diceRolledId !== dice.id,
    ),
    diceCursedIds: [...diceCursedIds, dice.id],
  }
})

export const useUncurseDice = createAction((state, dice, fromLab = false) => {
  const { diceRolledIds, diceCursedIds } = state
  return {
    ...state,
    ...(fromLab
      ? {}
      : {
          witchUncursedDiceId: dice.id,
          witchCardEffectUsed: true,
        }),
    diceRolledIds: [...diceRolledIds, dice.id],
    diceCursedIds: diceCursedIds.filter(
      (diceCursedId) => diceCursedId !== dice.id,
    ),
  }
})

export const useUnkeepDice = createAction((state, dice) => {
  const { diceRolledIds, chestSlots } = state
  const previousChestSlot = Object.keys(chestSlots).find((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    return (
      chestSlotContent &&
      chestSlotContent.type === "dice" &&
      chestSlotContent.value === dice.id
    )
  })
  return {
    ...state,
    diceRolledIds: [...diceRolledIds, dice.id],
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
    diceRolledIds: diceRolledIds.filter(
      (diceRolledId) => diceRolledId !== dice.id,
    ),
    chestSlots: {
      ...chestSlots,
      [chestSlot]: {
        type: "dice",
        value: dice.id,
      },
    },
  }
})

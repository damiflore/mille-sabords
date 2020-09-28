import React from "react"
// import { usePrevious } from "src/hooks.js"
import {
  useDices,
  useDiceCursedIds,
  useDiceRolledIds,
  useChestSlots,
  useWitchUncursedDiceId,
} from "src/main.store.js"
import { useDiceKeptIds } from "src/round/round.selectors.js"
import { Dice } from "src/dices/Dice.jsx"
import { diceIsOnSkull } from "src/dices/dices.js"

export const DiceContainer = ({
  diceAnimationState,
  chestRef,
  rolledAreaRef,
  offscreenRef,
  cursedAreaRef,

  ...rest
}) => {
  const dices = useDices()
  const chestSlots = useChestSlots()
  const diceKeptIds = useDiceKeptIds()
  const diceRolledIds = useDiceRolledIds()
  const diceCursedIds = useDiceCursedIds()
  const witchUncursedDiceId = useWitchUncursedDiceId()

  const chestDomNode = chestRef.current
  const rolledAreaDomNode = rolledAreaRef.current
  const offscreenDomNode = offscreenRef.current
  const cursedAreaDomNode = cursedAreaRef.current

  if (!chestDomNode) return null
  if (!rolledAreaDomNode) return null
  if (!offscreenDomNode) return null
  if (!cursedAreaDomNode) return null

  return Object.keys(dices).map((diceId) => {
    const dice = dices[diceId]
    return (
      <DiceController
        key={dice.id}
        {...{
          dice,
          diceAnimation: diceAnimationState[dice.id],
          diceKeptIds,
          chestSlots,
          diceRolledIds,
          diceCursedIds,
          witchUncursedDiceId,
          chestDomNode,
          rolledAreaDomNode,
          offscreenDomNode,
          cursedAreaDomNode,
          ...rest,
        }}
      />
    )
  })
}

const DiceController = ({
  dice,
  diceAnimation,
  diceKeptIds,
  chestSlots,
  diceRolledIds,
  diceCursedIds,
  witchUncursedDiceId,
  chestDomNode,
  rolledAreaDomNode,
  offscreenDomNode,
  cursedAreaDomNode,
  ...rest
}) => {
  const { container, rotation, x, y, draggable } = diceLocationToInfo(dice, {
    // chest
    diceKeptIds,
    chestSlots,
    chestDomNode,
    // rolled
    diceRolledIds,
    rolledAreaDomNode,
    // cursed
    diceCursedIds,
    cursedAreaDomNode,
    // offscreen
    offscreenDomNode,
  })
  // const containerPrevious = usePrevious(container)
  const diceIsGoingToBeCursed =
    dice.id !== witchUncursedDiceId && container === rolledAreaDomNode && diceIsOnSkull(dice)
  const diceInCursedArea = container === cursedAreaDomNode

  return (
    <Dice
      {...{
        dice,
        diceAnimation,
        container,
        rotation,
        x,
        y,
        draggable,
        disapear: diceIsGoingToBeCursed,
        appear: diceInCursedArea,
        ...rest,
      }}
    />
  )
}

const diceLocationToInfo = (
  dice,
  {
    // chest
    diceKeptIds,
    chestSlots,
    chestDomNode,
    // rolled
    diceRolledIds,
    rolledAreaDomNode,
    // cursed
    diceCursedIds,
    cursedAreaDomNode,
    // offscreen
    offscreenDomNode,
  },
) => {
  if (diceKeptIds.includes(dice.id)) {
    const diceChestSlot = Object.keys(chestSlots).find(
      (chestSlot) =>
        chestSlots[chestSlot] &&
        chestSlots[chestSlot].type === "dice" &&
        chestSlots[chestSlot].value === dice.id,
    )
    return {
      container: chestDomNode.querySelector(`[data-chest-slot="${diceChestSlot}"]`),
      rotation: 0,
      x: 0,
      y: 0,
      draggable: true,
    }
  }

  if (diceRolledIds.includes(dice.id)) {
    return {
      container: rolledAreaDomNode,
      rotation: dice.rotation,
      x: dice.rolledAreaPosition.x,
      y: dice.rolledAreaPosition.y,
      draggable: true,
    }
  }

  if (diceCursedIds.includes(dice.id)) {
    return {
      container: cursedAreaDomNode,
      rotation: 0,
      x: 0,
      y: 0,
      draggable: false,
    }
  }

  return {
    container: offscreenDomNode,
    rotation: 0,
    x: 0,
    y: 0,
    draggable: false,
  }
}

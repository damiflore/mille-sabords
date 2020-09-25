/* eslint-disable no-nested-ternary */
import React from "react"
import { useDices, useDiceCursedIds, useDiceRolledIds, useChestSlots } from "src/main.store.js"
import { Dice } from "src/dices/Dice.jsx"
import { useDiceKeptIds } from "src/round/round.selectors.js"

export const DiceContainer = ({
  chestRef,
  rolledAreaRef,
  offscreenRef,
  cursedAreaRef,
  onDiceClick,
  onDiceDrag,
  onDiceDrop,
  onDiceDragEnd,
}) => {
  const dices = useDices()
  const chestSlots = useChestSlots()
  const diceKeptIds = useDiceKeptIds()
  const diceRolledIds = useDiceRolledIds()
  const diceCursedIds = useDiceCursedIds()
  const diceToContainer = (dice) => {
    if (diceKeptIds.includes(dice.id)) {
      const diceChestSlot = Object.keys(chestSlots).find(
        (chestSlot) =>
          chestSlots[chestSlot] &&
          chestSlots[chestSlot].type === "dice" &&
          chestSlots[chestSlot].value === dice.id,
      )
      return chestRef.current.querySelector(`[data-chest-slot="${diceChestSlot}"]`)
    }

    if (diceRolledIds.includes(dice.id)) {
      return rolledAreaRef.current
    }

    if (diceCursedIds.includes(dice.id)) {
      return cursedAreaRef.current
    }

    return offscreenRef.current
  }

  return dices.map((dice) => {
    return (
      <Dice
        container={diceToContainer(dice)}
        key={dice.id}
        dice={dice}
        onDiceClick={onDiceClick}
        onDiceDrag={onDiceDrag}
        onDiceDrop={onDiceDrop}
        onDiceDragEnd={onDiceDragEnd}
      />
    )
  })
}

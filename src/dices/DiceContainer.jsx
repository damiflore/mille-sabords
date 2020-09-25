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

  const diceLocationToInfo = (dice) => {
    if (diceKeptIds.includes(dice.id)) {
      const diceChestSlot = Object.keys(chestSlots).find(
        (chestSlot) =>
          chestSlots[chestSlot] &&
          chestSlots[chestSlot].type === "dice" &&
          chestSlots[chestSlot].value === dice.id,
      )
      return {
        container: chestRef.current.querySelector(`[data-chest-slot="${diceChestSlot}"]`),
        rotation: 0,
        x: 0,
        y: 0,
      }
    }

    if (diceRolledIds.includes(dice.id)) {
      return {
        container: rolledAreaRef.current,
        rotation: dice.rotation,
        x: dice.rolledAreaPosition.x,
        y: dice.rolledAreaPosition.y,
      }
    }

    if (diceCursedIds.includes(dice.id)) {
      return {
        // TODO: create some slot in the skull
        // bottle so that dice can be placed properly
        // otherwse we must keep a dice
        // cursedAreaPosition
        container: cursedAreaRef.current,
        rotation: 0,
        x: 0,
        y: 0,
      }
    }

    return {
      container: offscreenRef.current,
      rotation: 0,
      x: 0,
      y: 0,
    }
  }

  return Object.keys(dices).map((diceId) => {
    const dice = dices[diceId]
    return (
      <Dice
        {...diceLocationToInfo(dice)}
        key={diceId}
        dice={dice}
        onDiceClick={onDiceClick}
        onDiceDrag={onDiceDrag}
        onDiceDrop={onDiceDrop}
        onDiceDragEnd={onDiceDragEnd}
      />
    )
  })
}

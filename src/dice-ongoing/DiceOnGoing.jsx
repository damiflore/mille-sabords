import React from "react"
import { useChestSlots } from "src/main.store.js"
import { diceIsInChestGetter } from "src/dices/Dice.jsx"

export const DiceOnGoing = ({ diceDraggedOverRolledArea, rolledAreaRef }) => {
  const chestSlots = useChestSlots()

  const diceDraggedOverIsInChest =
    diceDraggedOverRolledArea &&
    diceIsInChestGetter({ diceId: diceDraggedOverRolledArea.id, chestSlots })

  return (
    <div className="dice-ongoing">
      <div className="map"></div>
      <div
        className="area"
        ref={rolledAreaRef}
        style={{
          ...(diceDraggedOverIsInChest ? { outline: "2px dotted" } : {}),
        }}
      ></div>
    </div>
  )
}

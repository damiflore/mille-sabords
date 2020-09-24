import React from "react"
import { useDiceKeptIds } from "src/round/round.selectors.js"

export const DiceOnGoing = ({ rolledAreaDragOverGesture, rolledAreaRef }) => {
  const diceKeptIds = useDiceKeptIds()
  const diceOverRolledArea =
    rolledAreaDragOverGesture &&
    rolledAreaDragOverGesture.allowed &&
    diceKeptIds.includes(rolledAreaDragOverGesture.dice.id)

  return (
    <div className="dice-ongoing">
      <div className="map"></div>
      <div
        className="area"
        ref={rolledAreaRef}
        style={{
          ...(diceOverRolledArea ? { outline: "2px dotted" } : {}),
        }}
      ></div>
    </div>
  )
}

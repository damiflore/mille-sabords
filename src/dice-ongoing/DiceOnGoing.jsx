import React from "react"
import { useDiceKeptIds } from "src/round/round.selectors.js"

export const DiceOnGoing = ({ rolledAreaRef, dragoverGesture }) => {
  const diceKeptIds = useDiceKeptIds()
  const diceOverRolledArea =
    dragoverGesture &&
    dragoverGesture.dropTarget === rolledAreaRef.current &&
    dragoverGesture.dropAllowed &&
    diceKeptIds.includes(dragoverGesture.dropPayload.id)

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

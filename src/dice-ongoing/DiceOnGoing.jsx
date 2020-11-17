import React from "react"
import { useSignalState } from "src/helper/signal.js"

export const DiceOnGoing = ({ rolledAreaRef, offscreenRef, diceOverRolledAreaListener }) => {
  const diceOverRolledArea = useSignalState(diceOverRolledAreaListener)
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
      <div className="offscreen-area" ref={offscreenRef}>
        {/* we will move the dice into this zone when they are offgame (first roll) */}
      </div>
    </div>
  )
}

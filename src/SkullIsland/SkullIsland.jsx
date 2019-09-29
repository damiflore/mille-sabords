import React from "react"
import { diceSize } from "../UI/dicePosition.js"

export const SkullIsland = ({ diceCursed, canRemoveSkull, removeSkull }) => (
  <div className="skullIsland">
    <span className="title">Skull Island</span>
    <div className="area">
      {diceCursed.map((dice) => (
        <button
          key={dice.id}
          disabled={!canRemoveSkull}
          onClick={() => removeSkull(dice)}
          className="dice"
          style={{
            width: diceSize,
            height: diceSize,
          }}
        >
          {dice.symbol}
        </button>
      ))}
    </div>
  </div>
)

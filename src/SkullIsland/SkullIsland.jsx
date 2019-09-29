import React from "react"

export const SkullIsland = ({ diceCursed, canRemoveSkull, removeSkull }) => (
  <div className="skullIsland">
    <span className="title">Dice kept</span>
    <div className="area">
      {diceCursed.map((dice) => (
        <button
          key={dice.id}
          disabled={!canRemoveSkull}
          onClick={() => removeSkull(dice)}
          className="dice"
        >
          {dice.symbol}
        </button>
      ))}
    </div>
  </div>
)

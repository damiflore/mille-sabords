import React from "react"

export const SkullIsland = ({ diceCursed, canRemoveSkull, removeSkull }) => (
  <div className="diceSet">
    <span className="title">Dice kept</span>
    <div className="diceArea">
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

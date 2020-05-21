import React from "react"
import { Dice } from "../Dice/Dice.jsx"

export const SkullIsland = ({ diceCursed, canRemoveSkull, removeSkull }) => {
  return (
    <div className="skullIsland">
      <div className="bottle">
        <div className="area">
          {diceCursed.map((dice) => (
            <Dice
              key={dice.id}
              dice={dice}
              disabled={!canRemoveSkull}
              onClickAction={removeSkull}
              specificStyle={{ margin: "1px 5px" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

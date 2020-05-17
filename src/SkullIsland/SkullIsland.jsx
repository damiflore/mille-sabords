import React from "react"
import { Dice } from "../Dice/Dice.jsx"

export const SkullIsland = ({ diceCursed, canRemoveSkull, removeSkull }) => (
  <div className="skullIsland">
    <div className="map">
      <div className="area">
        {diceCursed.map((dice) => (
          <Dice
            key={dice.id}
            dice={dice}
            disabled={!canRemoveSkull}
            onClickAction={removeSkull}
            specificStyle={{ margin: "5px" }}
          />
        ))}
      </div>
    </div>
  </div>
)

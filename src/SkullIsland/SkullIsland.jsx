import React from "react"
import { Dice } from "../Dice/Dice.jsx"
import { useGameStore } from "src/MilleSabordGame.js"
import { unkeepDice } from "src/game.actions.js"

export const SkullIsland = () => {
  const store = useGameStore()
  const { diceCursed, canRemoveSkull } = store

  return (
    <div className="skullIsland">
      <div className="bottle">
        <div className="area">
          {diceCursed.map((dice) => (
            <Dice
              key={dice.id}
              dice={dice}
              disabled={!canRemoveSkull}
              onClickAction={(dice) => unkeepDice(store, dice)}
              specificStyle={{ margin: "1px 5px" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

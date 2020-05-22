import React from "react"
import { Dice } from "../Dice/Dice.jsx"
import { useGameState } from "src/MilleSabordGame.js"
import { unkeepDice } from "src/game.actions.js"
import { useCanRemoveSkull } from "src/game.selectors.js"

export const SkullIsland = () => {
  const state = useGameState()
  const { diceCursed } = state
  const canRemoveSkull = useCanRemoveSkull(state)

  return (
    <div className="skull-island">
      <div className="bottle">
        <div className="area">
          {diceCursed.map((dice) => (
            <Dice
              key={dice.id}
              dice={dice}
              disabled={!canRemoveSkull}
              onClickAction={(dice) => {
                unkeepDice(state, dice)
              }}
              specificStyle={{ margin: "1px 5px" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

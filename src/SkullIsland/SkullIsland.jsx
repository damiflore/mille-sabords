import React from "react"
import { useGameState } from "src/game.store.js"
import { useCanRemoveSkull } from "src/game.selectors.js"
import { useUnkeepDice } from "src/game.actions.js"
import { Dice } from "src/Dice/Dice.jsx"

export const SkullIsland = () => {
  const state = useGameState()
  const { diceCursed } = state
  const canRemoveSkull = useCanRemoveSkull(state)
  const unkeepDice = useUnkeepDice()

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
                unkeepDice(dice)
              }}
              specificStyle={{ margin: "1px 5px" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

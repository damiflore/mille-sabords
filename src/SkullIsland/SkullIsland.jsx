import React from "react"

import { useGameState } from "src/game.store.js"
import { canRemoveSkullSelector } from "src/game.selectors.js"
import { useUncurseDice } from "src/game.actions.js"

import { Dice } from "src/Dice/Dice.jsx"

export const SkullIsland = () => {
  const state = useGameState()
  const { diceCursed } = state
  const canRemoveSkull = canRemoveSkullSelector(state)
  const uncurseDice = useUncurseDice()

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
                uncurseDice(dice)
              }}
              specificStyle={{ margin: "1px 5px" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

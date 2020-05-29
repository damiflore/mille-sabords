import React from "react"

import { useDicesInCursedArea, useRemoveSkullAllowed } from "src/game.selectors.js"
import { useUncurseDice } from "src/game.actions.js"

import { Dice } from "src/dices/Dice.jsx"

export const SkullIsland = () => {
  const dicesInCursedArea = useDicesInCursedArea()
  const removeSkullAllowed = useRemoveSkullAllowed()
  const uncurseDice = useUncurseDice()

  return (
    <div className="skull-island">
      <div className="bottle">
        <div className="area">
          {dicesInCursedArea.map((dice) => (
            <Dice
              key={dice.id}
              dice={dice}
              disabled={!removeSkullAllowed}
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

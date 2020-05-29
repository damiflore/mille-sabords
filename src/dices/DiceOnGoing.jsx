import React from "react"
import { useGameNodeCallback } from "src/game.store.js"
import { useDicesInRolledArea, useKeepDiceAllowed } from "src/game.selectors.js"
import { useKeepDice } from "src/game.actions.js"

import { Dice } from "src/dices/Dice.jsx"
import { diceIsOnSkull } from "src/dices/dices.js"

export const DiceOnGoing = () => {
  const dicesInRolledArea = useDicesInRolledArea()
  const keepDiceAllowed = useKeepDiceAllowed()
  const keepDice = useKeepDice()

  return (
    <div className="dice-ongoing">
      <div className="map"></div>
      <div className="area" ref={useGameNodeCallback("dice-rolled-area")}>
        {dicesInRolledArea.map((dice) => (
          <Dice
            key={dice.id}
            dice={dice}
            disabled={diceIsOnSkull(dice) ? true : !keepDiceAllowed}
            onClickAction={(dice) => {
              keepDice(dice)
            }}
            specificStyle={{
              left: `${dice.x}px`,
              top: `${dice.y}px`,
              transform: `rotate(${dice.rotation}deg)`,
              position: "absolute",
            }}
          />
        ))}
      </div>
    </div>
  )
}

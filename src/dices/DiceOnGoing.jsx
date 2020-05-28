import React from "react"
import { useGameState, useGameNodeCallback } from "src/game.context.js"
import { keepDiceAllowedSelector } from "src/game.selectors.js"
import { useKeepDice } from "src/game.actions.js"
import { Dice } from "src/dices/Dice.jsx"
import { diceIsOnSkull } from "src/dices/dices.js"

// eslint-disable-next-line react/display-name
export const DiceOnGoing = () => {
  const state = useGameState()
  const { diceRolled } = state
  const keepDiceAllowed = keepDiceAllowedSelector(state)
  const keepDice = useKeepDice()

  return (
    <div className="dice-ongoing">
      <div className="map"></div>
      <div className="area" ref={useGameNodeCallback("dice-rolled-area")}>
        {diceRolled.map((dice) => (
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

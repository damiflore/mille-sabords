import React from "react"
import { useGameState } from "src/game.store.js"
import { keepDiceAllowedSelector } from "src/game.selectors.js"
import { useKeepDice } from "src/game.actions.js"
import { Dice } from "./Dice.jsx"

// eslint-disable-next-line react/display-name
export const DiceOnGoing = React.forwardRef((props, ref) => {
  const state = useGameState()
  const { diceInGame } = state
  const keepDiceAllowed = keepDiceAllowedSelector(state)
  const keepDice = useKeepDice()

  return (
    <div className="dice-ongoing" ref={ref}>
      <div className="map"></div>
      <div className="area">
        {diceInGame.map((dice) => (
          <Dice
            key={dice.id}
            dice={dice}
            disabled={!keepDiceAllowed}
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
})

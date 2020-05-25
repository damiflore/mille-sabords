import React from "react"
import { useGameState } from "src/game.store.js"
import { keepDiceAllowedSelector } from "src/game.selectors.js"
import { useKeepDice } from "src/game.actions.js"
import { Dice } from "src/Dice/Dice.jsx"
import { SYMBOL_SKULL } from "src/constants.js"

// eslint-disable-next-line react/display-name
export const DiceOnGoing = React.forwardRef((props, ref) => {
  const state = useGameState()
  const { diceRolled } = state
  const keepDiceAllowed = keepDiceAllowedSelector(state)
  const keepDice = useKeepDice()

  return (
    <div className="dice-ongoing" ref={ref}>
      <div className="map"></div>
      <div className="area">
        {diceRolled.map((dice) => (
          <Dice
            key={dice.id}
            dice={dice}
            disabled={dice.symbol === SYMBOL_SKULL ? true : !keepDiceAllowed}
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

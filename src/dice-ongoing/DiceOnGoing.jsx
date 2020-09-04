import React from "react"
import { useDicesRolled, useRolledAreaNodeSetter } from "src/game.store.js"
import { useKeepDiceAllowed } from "src/game.selectors.js"
import { useKeepDice } from "src/dices/dices.actions.js"

import { Dice } from "src/dices/Dice.jsx"
import { diceIsOnSkull } from "src/dices/dices.js"

export const DiceOnGoing = () => {
  const dicesRolled = useDicesRolled()
  const keepDiceAllowed = useKeepDiceAllowed()
  const keepDice = useKeepDice()

  return (
    <div className="dice-ongoing">
      <div className="map"></div>
      <div className="area" ref={useRolledAreaNodeSetter()}>
        {dicesRolled.map((dice) => (
          <Dice
            key={dice.id}
            dice={dice}
            clickAllowed={diceIsOnSkull(dice) ? false : keepDiceAllowed}
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

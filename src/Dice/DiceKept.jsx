import React from "react"
import { Dice } from "./Dice.jsx"
import { useGameStore } from "src/MilleSabordGame.js"
import { unkeepDice } from "src/game.actions.js"
import { useUnkeepDiceAllowed } from "src/game.selectors.js"
import { RoundScore } from "src/Score/RoundScore.jsx"

export const DiceKept = () => {
  const store = useGameStore()
  const { diceKept } = store
  const unkeepDiceAllowed = useUnkeepDiceAllowed()

  return (
    <div className="dice-kept">
      <div className="dice-area">
        <div className="box">
          {diceKept.map((dice) => (
            <Dice
              key={dice.id}
              dice={dice}
              disabled={!unkeepDiceAllowed}
              onClickAction={(dice) => {
                unkeepDice(store, dice)
              }}
              specificStyle={{ margin: "5px" }}
            />
          ))}
        </div>
        <div className="top-left-corner"></div>
        <div className="top-right-corner"></div>
        <div className="bottom-left-corner"></div>
        <div className="bottom-right-corner"></div>
      </div>
      <RoundScore />
    </div>
  )
}

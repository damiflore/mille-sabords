import React from "react"

import { useGameState } from "src/game.store.js"
import { unkeepDiceAllowedSelector, roundLostSelector } from "src/game.selectors.js"
import { useUnkeepDice } from "src/game.actions.js"

import { Dice } from "./Dice.jsx"
import { RoundScore } from "src/Score/RoundScore.jsx"

export const DiceKept = () => {
  const state = useGameState()
  const { diceKept } = state
  const unkeepDiceAllowed = unkeepDiceAllowedSelector(state)
  const unkeepDice = useUnkeepDice()

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
                unkeepDice(dice)
              }}
              specificStyle={{ margin: "5px" }}
            />
          ))}
        </div>
        <div className="top-left-corner"></div>
        <div className="top-right-corner"></div>
        <div className="bottom-left-corner"></div>
        <div className="bottom-right-corner"></div>
        {roundLostSelector(state) && (
          <>
            <div className="cursed-cover">
              <img src={`src/Dice/assets/cursed-cover.png`} alt="cursed-cover" />
            </div>
          </>
        )}
      </div>
      <RoundScore />
    </div>
  )
}

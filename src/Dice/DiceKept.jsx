import React from "react"
import { useGameState } from "src/game.store.js"
import { unkeepDiceAllowedSelector, markScorePermissionSelector } from "src/game.selectors.js"
import { useUnkeepDice } from "src/game.actions.js"
import { Dice } from "./Dice.jsx"
import { RoundScore } from "src/Score/RoundScore.jsx"
import { HAS_THREE_SKULLS_OR_MORE } from "src/constants.js"

export const DiceKept = () => {
  const state = useGameState()
  const { diceKept, isOnSkullIsland } = state
  const unkeepDiceAllowed = unkeepDiceAllowedSelector(state)
  const markScorePermission = markScorePermissionSelector(state)
  const unkeepDice = useUnkeepDice()

  const roundOver = markScorePermission.reason === HAS_THREE_SKULLS_OR_MORE || isOnSkullIsland

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
        {roundOver && (
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

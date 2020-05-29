import React from "react"

import { useDiceKept } from "src/game.store.js"
import { useUnkeepDiceAllowed, useThreeSkullOrMoreInCursedArea } from "src/game.selectors.js"
import { useUnkeepDice } from "src/game.actions.js"

import { Dice } from "src/dices/Dice.jsx"
import { isDiamondDiceFromCard, isCoinDiceFromCard } from "src/cards/cards.js"
import { RoundScore } from "src/Score/RoundScore.jsx"

export const DiceKept = () => {
  const diceKept = useDiceKept()
  const unkeepDiceAllowed = useUnkeepDiceAllowed()
  const unkeepDice = useUnkeepDice()

  return (
    <div className="dice-kept">
      <div className="dice-area">
        <div className="box">
          {diceKept.map((dice) => (
            <Dice
              key={dice.id}
              dice={dice}
              disabled={
                isDiamondDiceFromCard(dice) || isCoinDiceFromCard(dice) || !unkeepDiceAllowed
              }
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
        <CursedCover />
      </div>
      <RoundScore />
    </div>
  )
}

const CursedCover = () => {
  const threeSkullOrMoreInCursedArea = useThreeSkullOrMoreInCursedArea()

  if (!threeSkullOrMoreInCursedArea) {
    return null
  }

  return (
    <div className="cursed-cover">
      <img src={`src/dices/assets/cursed-cover.png`} alt="cursed-cover" />
    </div>
  )
}

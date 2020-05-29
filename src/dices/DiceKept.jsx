import React from "react"

import { useCard, useDicesKept } from "src/game.store.js"
import { useUnkeepDiceAllowed, useThreeSkullsOrMoreInCursedArea } from "src/game.selectors.js"
import { useUnkeepDice } from "src/game.actions.js"

import { isCoinCard, isDiamondCard } from "src/cards/cards.js"
import { Dice } from "src/dices/Dice.jsx"
import { RoundScore } from "src/Score/RoundScore.jsx"

export const DiceKept = () => {
  const card = useCard()
  const dicesKept = useDicesKept()
  const unkeepDiceAllowed = useUnkeepDiceAllowed()
  const unkeepDice = useUnkeepDice()

  return (
    <div className="dice-kept">
      <div className="dice-area">
        <div className="box">
          {isCoinCard(card) ? <ExtraCoin /> : null}
          {isDiamondCard(card) ? <ExtraDiamond /> : null}
          {dicesKept.map((dice) => (
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
        <CursedCover />
      </div>
      <RoundScore />
    </div>
  )
}

const ExtraCoin = () => {
  return (
    <img
      src={`src/dices/assets/dice_coin.png`}
      style={{
        width: "32",
        height: "32",
      }}
    />
  )
}

const ExtraDiamond = () => {
  return (
    <img
      src={`src/dices/assets/dice_diamond.png`}
      style={{
        width: "32",
        height: "32",
      }}
    />
  )
}

const CursedCover = () => {
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()

  if (!threeSkullsOrMoreInCursedArea) {
    return null
  }

  return (
    <div className="cursed-cover">
      <img src={`src/dices/assets/cursed-cover.png`} alt="cursed-cover" />
    </div>
  )
}

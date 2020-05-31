import React from "react"

import { useDicesCursed, useCurrentCard } from "src/game.store.js"
import { useRemoveSkullAllowed } from "src/game.selectors.js"
import { useUncurseDice } from "src/dices/dices.actions.js"

import { isOneSkullCard, isTwoSkullsCard, cardColors } from "src/cards/cards.js"
import { Dice } from "src/dices/Dice.jsx"
import { diceSize } from "src/dices/dicePosition.js"

export const SkullIsland = () => {
  const currentCard = useCurrentCard()
  const dicesCursed = useDicesCursed()
  const removeSkullAllowed = useRemoveSkullAllowed()
  const uncurseDice = useUncurseDice()

  return (
    <div className="skull-island">
      <div className="bottle">
        <div className="area">
          {dicesCursed.map((dice) => (
            <Dice
              key={dice.id}
              dice={dice}
              disabled={!removeSkullAllowed}
              onClickAction={(dice) => {
                uncurseDice(dice)
              }}
              specificStyle={{ margin: "1px 5px" }}
            />
          ))}
          {isOneSkullCard(currentCard) ? <ExtraSkull card={currentCard} /> : null}
          {isTwoSkullsCard(currentCard) ? (
            <>
              <ExtraSkull card={currentCard} />
              <ExtraSkull card={currentCard} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

const ExtraSkull = ({ card }) => {
  return (
    <button
      className="dice"
      style={{
        width: diceSize,
        height: diceSize,
        color: "#fcfcfc",
        margin: "1px 5px",
        backgroundColor: cardColors[card].color1,
        borderColor: cardColors[card].color2,
        borderWidth: "2px",
      }}
    >
      <img
        src={`src/dices/dice_skull.png`}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </button>
  )
}

import React from "react"

import { useDicesCursed, useCurrentCard } from "src/game.store.js"
import { useRemoveSkullAllowed } from "src/game.selectors.js"
import { useUncurseDice } from "src/dices/dices.actions.js"

import { isOneSkullCard, isTwoSkullsCard } from "src/cards/cards.js"
import { Dice } from "src/dices/Dice.jsx"

export const SkullIsland = () => {
  const currentCard = useCurrentCard()
  const dicesCursed = useDicesCursed()
  const removeSkullAllowed = useRemoveSkullAllowed()
  const uncurseDice = useUncurseDice()

  return (
    <div className="skull-island">
      <div className="bottle">
        <div className="area">
          {isOneSkullCard(currentCard) ? <ExtraSkull /> : null}
          {isTwoSkullsCard(currentCard) ? (
            <>
              <ExtraSkull />
              <ExtraSkull />
            </>
          ) : null}
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
        </div>
      </div>
    </div>
  )
}

const ExtraSkull = () => {
  return (
    <img
      src={`src/dices/assets/dice_skull.png`}
      style={{
        width: "32",
        height: "32",
      }}
    />
  )
}

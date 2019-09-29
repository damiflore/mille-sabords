import React from "react"
import { diceSize } from "../UI/dicePosition.js"

export const DiceKept = ({ diceArray, unkeepDiceAllowed, unkeepDice }) => (
  <div className="diceKept">
    <span className="title">Dice kept</span>
    <div className="area">
      {diceArray.map((dice) => (
        <button
          key={dice.id}
          disabled={!unkeepDiceAllowed}
          onClick={() => unkeepDice(dice)}
          className="dice"
          style={{
            width: diceSize,
            height: diceSize,
          }}
        >
          {dice.symbol}
        </button>
      ))}
    </div>
  </div>
)

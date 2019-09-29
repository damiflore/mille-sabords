import React from "react"

export const DiceKept = ({ diceArray, unkeepDiceAllowed, unkeepDice }) => (
  <div className="diceSet">
    <span className="title">Dice kept</span>
    <div className="diceArea">
      {diceArray.map((dice) => (
        <button
          key={dice.id}
          disabled={!unkeepDiceAllowed}
          onClick={() => unkeepDice(dice)}
          className="dice"
        >
          {dice.symbol}
        </button>
      ))}
    </div>
  </div>
)

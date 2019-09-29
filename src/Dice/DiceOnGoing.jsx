import React from "react"
import { diceSize } from "../UI/dicePosition.js"

export const DiceOnGoing = ({ diceArray, keepDiceAllowed, keepDice }) => (
  <div className="diceSet">
    <span className="title">Dice on going</span>
    <div className="diceArea">
      {diceArray.map((dice) => (
        <button
          key={dice.id}
          disabled={!keepDiceAllowed}
          onClick={() => keepDice(dice)}
          className="dice"
          style={{
            width: diceSize,
            height: diceSize,
            left: `${dice.position.x}px`,
            top: `${dice.position.y}px`,
            transform: `rotate(${dice.rotation}deg)`,
          }}
        >
          {dice.symbol}
        </button>
      ))}
    </div>
  </div>
)

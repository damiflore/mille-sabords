import React from "react"
import { diceSize } from "../UI/dicePosition.js"

// eslint-disable-next-line react/display-name
export const DiceOnGoing = React.forwardRef(({ diceArray, keepDiceAllowed, keepDice }, ref) => {
  return (
    <div className="diceOnGoing" ref={ref}>
      <span className="title">Dice on going</span>
      <div className="area">
        {diceArray.map((dice) => (
          <button
            key={dice.id}
            disabled={!keepDiceAllowed}
            onClick={() => keepDice(dice)}
            className="dice"
            style={{
              width: diceSize,
              height: diceSize,
              left: `${dice.x}px`,
              top: `${dice.y}px`,
              transform: `rotate(${dice.rotation}deg)`,
              position: "absolute",
            }}
          >
            {dice.symbol}
          </button>
        ))}
      </div>
    </div>
  )
})

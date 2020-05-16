import React from "react"
import { Dice } from "./Dice.jsx"

// eslint-disable-next-line react/display-name
export const DiceOnGoing = React.forwardRef(({ diceArray, keepDiceAllowed, keepDice }, ref) => {
  return (
    <div className="diceOnGoing" ref={ref}>
      <div className="area">
        {diceArray.map((dice) => (
          <Dice
            key={dice.id}
            dice={dice}
            disabled={!keepDiceAllowed}
            onClickAction={keepDice}
            specificStyle={{
              left: `${dice.x}px`,
              top: `${dice.y}px`,
              transform: `rotate(${dice.rotation}deg)`,
              position: "absolute",
            }}
          />
        ))}
      </div>
    </div>
  )
})

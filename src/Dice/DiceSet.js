import React from "react"
import { diceSize } from "../UI/dicePosition"

export const DiceSet = ({
  title,
  diceArray,
  actionText,
  actionFunction,
  displayActionCondition = () => true,
}) => (
  <div className="diceSet">
    <span className="title">{title}</span>
    <div className="diceArea">
      {diceArray.map((dice, index) => (
        <>
          {displayActionCondition(dice) && (
            <button
              key={index}
              className="dice"
              style={{
                width: diceSize,
                height: diceSize,
                left: `${dice.position.x}px`,
                top: `${dice.position.y}px`,
                transform: `rotate(${dice.rotation}deg)`,
              }}
              onClick={() => actionFunction(dice)}
            >
              {dice.symbol}
            </button>
          )}
        </>
      ))}
    </div>
  </div>
)

import React from "react"
import { diceWidth } from "../UI/dicePosition"

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
                width: diceWidth,
                height: diceWidth,
                left: `calc(${dice.position.x}px)`,
                top: `calc(${dice.position.y}px)`,
                // left: `calc(${dice.position.x}px - ${diceWidth / 2}px)`,
                // top: `calc(${dice.position.y}px - ${diceWidth / 2}px)`,
                // transform: `rotate(${dice.rotation}deg)`,
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

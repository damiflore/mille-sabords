import React from "react"
import { diceSize } from "../UI/dicePosition"

export const DiceSet = ({
  title,
  diceArray,
  actionFunction,
  displayActionCondition = () => true,
}) => (
  <div className="diceSet">
    <span className="title">{title}</span>
    <div className="diceArea">
      {diceArray.map((dice) => (
        <React.Fragment key={dice.id}>
          {displayActionCondition(dice) && (
            <button
              key={dice.id}
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
        </React.Fragment>
      ))}
    </div>
  </div>
)

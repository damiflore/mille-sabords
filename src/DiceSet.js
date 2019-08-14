import React from "react"

export const DiceSet = ({
  title,
  diceArray,
  actionText,
  actionFunction,
  displayActionCondition = () => true,
}) => (
  <div className="diceSet">
    <span className="title">{title}</span>
    {diceArray.map((dice, index) => (
      <div key={index}>
        {displayActionCondition(dice) && (
          <button onClick={() => actionFunction(dice)}>{actionText}</button>
        )}
        <span style={{ marginLeft: "20px" }}>{dice}</span>
      </div>
    ))}
  </div>
)

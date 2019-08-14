import React from "react"

export const DiceSet = ({
  title,
  diceArray,
  actionText,
  actionFunction,
  displayActionCondition = () => true,
}) => (
  <>
    {diceArray.length > 0 && (
      <>
        <h2>{title}</h2>
        {diceArray.map((dice, index) => (
          <div key={index}>
            {displayActionCondition(dice) && (
              <button onClick={() => actionFunction(dice)}>{actionText}</button>
            )}
            <span style={{ marginLeft: "20px" }}>{dice}</span>
          </div>
        ))}
      </>
    )}
  </>
)

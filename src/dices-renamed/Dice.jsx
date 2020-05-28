import React from "react"
import { diceSize } from "./dicePosition.js"
import { diceIsOnSkull, diceToVisibleSymbol } from "src/dices/dices.js"

export const Dice = ({ dice, disabled, onClickAction, specificStyle }) => {
  const onSkull = diceIsOnSkull(dice)

  return (
    <button
      key={dice.id}
      disabled={disabled}
      onClick={() => onClickAction(dice)}
      className="dice"
      style={{
        width: diceSize,
        height: diceSize,
        background: onSkull ? "black" : "#fcfcfc",
        color: onSkull ? "black" : "#fcfcfc",
        borderColor: onSkull ? "black" : "#b9b9b9",
        ...specificStyle,
      }}
    >
      <img
        src={`src/dices/assets/dice_${diceToVisibleSymbol(dice)}.png`}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </button>
  )
}

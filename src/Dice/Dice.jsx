import React from "react"
import { diceSize } from "./dicePosition.js"
import { SYMBOL_SKULL } from "src/constants.js"

export const Dice = ({ dice, disabled, onClickAction, specificStyle }) => (
  <button
    key={dice.id}
    disabled={disabled}
    onClick={() => onClickAction(dice)}
    className="dice"
    style={{
      width: diceSize,
      height: diceSize,
      background: dice.symbol === SYMBOL_SKULL ? "black" : "#e6e6e6",
      color: dice.symbol === SYMBOL_SKULL ? "black" : "#e6e6e6",
      borderColor: dice.symbol === SYMBOL_SKULL ? "black" : "#b9b9b9",
      ...specificStyle,
    }}
  >
    <img
      src={`src/Dice/assets/dice_${dice.symbol}.png`}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  </button>
)

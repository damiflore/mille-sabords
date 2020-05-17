import React from "react"
import { diceSize } from "../UI/dicePosition.js"
import { SYMBOL_SKULL } from "src/symbols/symbol-types.js"

export const Dice = ({ dice, disabled, onClickAction, specificStyle }) => (
  <button
    key={dice.id}
    disabled={disabled}
    onClick={() => onClickAction(dice)}
    className="dice"
    style={{
      width: diceSize,
      height: diceSize,
      padding: "0",
      boxShadow:
        "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
      background: dice.symbol === SYMBOL_SKULL ? "black" : "#e6e6e6",
      color: dice.symbol === SYMBOL_SKULL ? "black" : "#e6e6e6",
      borderRadius: "8px",
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

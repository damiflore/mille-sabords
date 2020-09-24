import React from "react"
import { useDices } from "src/main.store.js"
import { Dice } from "src/dices/Dice.jsx"

export const DiceContainer = ({ onDiceClick, onDiceDrag, onDiceDrop, onDiceDragEnd }) => {
  const dices = useDices()
  return dices.map((dice) => (
    <Dice
      key={dice.id}
      dice={dice}
      onDiceClick={onDiceClick}
      onDiceDrag={onDiceDrag}
      onDiceDrop={onDiceDrop}
      onDiceDragEnd={onDiceDragEnd}
    />
  ))
}

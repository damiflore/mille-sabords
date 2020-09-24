import React from "react"
import { useDiceIds } from "src/main.store.js"
import { Dice } from "src/dices/Dice.jsx"

export const DiceContainer = ({ onDiceClick, onDiceDrag, onDiceDrop }) => {
  const diceIds = useDiceIds()
  return diceIds.map((diceId) => (
    <Dice
      key={diceId}
      diceId={diceId}
      onDiceClick={onDiceClick}
      onDiceDrag={onDiceDrag}
      onDiceDrop={onDiceDrop}
    />
  ))
}

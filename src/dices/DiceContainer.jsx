import React from "react"
import { useDices } from "src/main.store.js"
import { Dice } from "src/dices/Dice.jsx"

export const DiceContainer = ({
  chestRef,
  rolledAreaRef,
  offscreenRef,
  cursedAreaRef,
  onDiceClick,
  onDiceDrag,
  onDiceDrop,
  onDiceDragEnd,
  diceAnimationState,
  onDiceAnimationEnd,
}) => {
  const dices = useDices()
  return Object.keys(dices).map((diceId) => {
    const dice = dices[diceId]
    return (
      <Dice
        key={diceId}
        {...{
          dice,
          diceAnimation: diceAnimationState[dice.id],
          onDiceAnimationEnd,
          chestRef,
          rolledAreaRef,
          offscreenRef,
          cursedAreaRef,
          onDiceClick,
          onDiceDrag,
          onDiceDrop,
          onDiceDragEnd,
        }}
      />
    )
  })
}

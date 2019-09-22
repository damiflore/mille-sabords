import React from "react"
import { DiceSet } from "../Dice/DiceSet.js"

export const CursedIsland = ({ diceCursed, canRemoveSkull, removeSkull }) => {
  return (
    <DiceSet
      title="Cursed Island"
      diceArray={diceCursed}
      displayActionCondition={() => canRemoveSkull}
      actionFunction={removeSkull}
    />
  )
}

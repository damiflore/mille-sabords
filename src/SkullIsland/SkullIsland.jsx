import React from "react"
import { DiceSet } from "../Dice/DiceSet.js"

export const SkullIsland = ({ diceCursed, canRemoveSkull, removeSkull }) => {
  return (
    <DiceSet
      title="Cursed Island"
      diceArray={diceCursed}
      actionText="Remove"
      displayActionCondition={() => canRemoveSkull}
      actionFunction={removeSkull}
    />
  )
}

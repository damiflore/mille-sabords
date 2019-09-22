import React from "react"
import { DiceSet } from "../Dice/DiceSet.js"

export const Shaker = ({ diceOffGame }) => {
  return (
    <DiceSet title="Dice offgame" diceArray={diceOffGame} displayActionCondition={() => false} />
  )
}

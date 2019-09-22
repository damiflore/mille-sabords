import React from "react"

export const ButtonRestart = ({ clearDiceSet, isRoundOver, diceRolledOnce }) => {
  if (diceRolledOnce && isRoundOver) {
    return <button onClick={() => clearDiceSet()}>Restart</button>
  }

  return null
}

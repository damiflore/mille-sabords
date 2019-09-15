import React from "react"

export const ButtonRestart = ({ clearDiceSet, roundState, diceRolledOnce }) => {
  if (diceRolledOnce && roundState.hasThreeSkullsOrMore) {
    return <button onClick={() => clearDiceSet()}>Restart</button>
  }

  return null
}

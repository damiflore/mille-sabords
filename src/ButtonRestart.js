import React from "react"

export const ButtonRestart = ({ clearDiceSet, isRoundOver, rollIndex }) => {
  if (rollIndex > -1 && isRoundOver) {
    return <button onClick={() => clearDiceSet()}>Restart</button>
  }

  return null
}

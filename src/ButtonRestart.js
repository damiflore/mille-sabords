import React from "react"

export const ButtonRestart = ({ clearDiceSet, roundState }) => {
  return (
    <>
      {roundState.hasThreeSkullsOrMore && <button onClick={() => clearDiceSet()}>Restart</button>}
    </>
  )
}

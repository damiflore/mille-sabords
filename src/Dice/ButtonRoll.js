import React from "react"

export const ButtonRoll = ({ cardDrawn, diceRolledOnce, diceOnGoing, onClick, roundState }) => {
  if (roundState.hasThreeSkullsOrMore) {
    return null
  }

  if (!cardDrawn) {
    return (
      <>
        <button disabled={true}>Roll!</button>
        <span> (You must draw a card)</span>
      </>
    )
  }

  if (diceRolledOnce && diceOnGoing.length < 2) {
    return (
      <>
        <button disabled={true}>Roll!</button>
        <span> (You must roll at least 2 dice)</span>
      </>
    )
  }

  return <button onClick={onClick}>Roll!</button>
}

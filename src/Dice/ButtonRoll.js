import React from "react"

export const ButtonRoll = ({ roundFinished, cardDrawn, roundStarted, diceRolled, onClick }) => {
  if (roundFinished) {
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

  if (roundStarted && diceRolled.length < 2) {
    return (
      <>
        <button disabled={true}>Roll!</button>
        <span> (You must roll at least 2 dice)</span>
      </>
    )
  }

  return <button onClick={onClick}>Roll!</button>
}

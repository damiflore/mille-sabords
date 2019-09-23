import React from "react"

export const ButtonRoll = ({ cardDrawn, rollIndex, diceOnGoing, onClick, isRoundOver }) => {
  if (rollIndex > -1 && isRoundOver) {
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

  if (rollIndex > -1 && diceOnGoing.length < 2) {
    return (
      <>
        <button disabled={true}>Roll!</button>
        <span> (You must roll at least 2 dice)</span>
      </>
    )
  }

  return <button onClick={onClick}>Roll!</button>
}

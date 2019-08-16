import React from "react"

import { isGameOver, computeScore } from "./ScoreHelpers.js"

export const CurrentRoundScore = ({ roundFinished, diceKept, currentCard, markScore }) => {
  if (diceKept.length < 1) {
    return null
  }

  return (
    <div>
      <span className="subtitle"> Current round score: </span>
      <ScoreDisplay
        roundFinished={roundFinished}
        currentCard={currentCard}
        diceKept={diceKept}
        markScore={markScore}
      />
    </div>
  )
}

const ScoreDisplay = ({ roundFinished, currentCard, diceKept, markScore }) => {
  const gameOver = isGameOver(diceKept, currentCard)

  if (gameOver) {
    return <span>You lose!</span>
  }

  return (
    <>
      <span>{computeScore({ currentCard, diceKept })}</span>
      {roundFinished ? null : <MarkScoreButton onClick={markScore} />}
    </>
  )
}

const MarkScoreButton = ({ onClick }) => (
  <button onClick={onClick} style={{ marginLeft: "20px" }}>
    Mark this score
  </button>
)

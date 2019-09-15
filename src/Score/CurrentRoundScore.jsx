import React from "react"

import { diceArrayToSymbolArray } from "/src/Dice/DiceHelpers.js"
import { computeRoundState } from "./ScoreHelpers.js"

export const CurrentRoundScore = ({
  diceRolledOnce,
  diceKept,
  currentCard,
  markScore,
  scoreMarked,
  currentRoundIndex,
}) => {
  if (!diceRolledOnce) {
    return null
  }

  return (
    <div>
      <span className="subtitle"> Current round score: </span>
      <ScoreDisplay
        currentCard={currentCard}
        diceKept={diceKept}
        markScore={markScore}
        currentRoundIndex={currentRoundIndex}
        scoreMarked={scoreMarked}
      />
    </div>
  )
}

const ScoreDisplay = ({ currentCard, diceKept, markScore, scoreMarked, currentRoundIndex }) => {
  const roundState = computeRoundState({
    currentCard,
    symbolArrayFromDiceKept: diceArrayToSymbolArray(diceKept),
    currentRoundIndex,
    scoreMarked,
  })

  if (roundState.isOnSkullIsland) {
    return <span>XXX -Skull Island- XXX</span>
  }

  return (
    <>
      <span>{roundState.score}</span>
      {roundState.isRoundOver ? null : <MarkScoreButton onClick={markScore} />}
      {roundState.hasThreeSkullsOrMore ? <div>Round over!</div> : null}
    </>
  )
}

const MarkScoreButton = ({ onClick }) => (
  <button onClick={onClick} style={{ marginLeft: "20px" }}>
    Mark this score
  </button>
)

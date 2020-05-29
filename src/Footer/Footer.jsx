import React from "react"

import { useRollIndex } from "src/game.store.js"
import { useMarkScore } from "src/game.actions.js"
import { useMarkScoreAllowed, useRoundScore } from "src/game.selectors.js"
import { ButtonNextRound } from "src/Header/ButtonNextRound.js"

import { ButtonRoll } from "src/dices/ButtonRoll.js"

export const Footer = () => {
  const markScore = useMarkScore()
  const roundScore = useRoundScore()

  return (
    <div className="actions">
      <ButtonRoll />
      <ButtonMarkScore
        onClick={() => {
          markScore(roundScore)
        }}
      />
      <ButtonNextRound />
    </div>
  )
}

const ButtonMarkScore = ({ onClick }) => {
  const rollIndex = useRollIndex()
  const markScoreAllowed = useMarkScoreAllowed()
  const roundScore = useRoundScore()

  const sign = roundScore < 0 ? "-" : "+"

  if (markScoreAllowed && rollIndex !== -1)
    return (
      <div className="collect-action">
        <button onClick={onClick}>
          <span>Collect</span>
          <span className="score">
            {sign} {Math.abs(roundScore)}
          </span>
        </button>
      </div>
    )

  return null
}

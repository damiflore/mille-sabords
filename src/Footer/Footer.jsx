import React from "react"

import { useGameState } from "src/game.store.js"
import { useMarkScore } from "src/game.actions.js"
import { markScoreAllowedSelector, roundScoreSelector } from "src/game.selectors.js"

import { ButtonRoll } from "src/Dice/ButtonRoll.js"

export const Footer = () => {
  const state = useGameState()
  const markScore = useMarkScore()
  const roundScore = roundScoreSelector(state)

  return (
    <div className="actions">
      <ButtonRoll />
      <ButtonMarkScore
        onClick={() => {
          markScore(roundScore)
        }}
      />
    </div>
  )
}

const ButtonMarkScore = ({ onClick }) => {
  const state = useGameState()
  const { rollIndex } = state
  const markScoreAllowed = markScoreAllowedSelector(state)
  const roundScore = roundScoreSelector(state)

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
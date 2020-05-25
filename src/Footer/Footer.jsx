import React from "react"

import { useGameState } from "src/game.store.js"
import { useMarkScore } from "src/game.actions.js"
import { markScorePermissionSelector, roundScoreSelector } from "src/game.selectors.js"

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
  const markScorePermission = markScorePermissionSelector(state)

  if (markScorePermission.allowed && rollIndex !== -1)
    return (
      <div className="collect-action">
        <button onClick={onClick}>Collect</button>
      </div>
    )

  return null
}

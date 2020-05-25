import React from "react"

import { useGameState } from "src/game.store.js"
import { roundScoreSelector } from "src/game.selectors.js"

export const RoundScore = () => {
  const { rollIndex } = useGameState()
  return <div className="score-area">{rollIndex === -1 ? null : <ScoreDisplay />}</div>
}

const ScoreDisplay = () => {
  const state = useGameState()

  // const { isOnSkullIsland } = state
  // if (isOnSkullIsland) {
  //   return <span>Skull Island!</span>
  // }

  const roundScore = roundScoreSelector(state)

  return (
    <>
      <div className="bonds"></div>
      <div className="round-score">{roundScore}</div>
    </>
  )
}

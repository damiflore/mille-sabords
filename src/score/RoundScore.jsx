import React from "react"

import { useHasRolledOnce, useRoundScore } from "src/game.selectors.js"

export const RoundScore = () => {
  const hasRolledOnce = useHasRolledOnce()
  return <div className="score-area">{hasRolledOnce ? <ScoreDisplay /> : null}</div>
}

const ScoreDisplay = () => {
  const roundScore = useRoundScore()

  // const { isOnSkullIsland } = state
  // if (isOnSkullIsland) {
  //   return <span>Skull Island!</span>
  // }

  return (
    <>
      <div className="bonds"></div>
      <div className="round-score">{roundScore}</div>
    </>
  )
}

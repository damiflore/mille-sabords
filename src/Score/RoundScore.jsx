import React from "react"

import { useRollIndex } from "src/game.store.js"
import { useRoundScore } from "src/game.selectors.js"

export const RoundScore = () => {
  const rollIndex = useRollIndex()
  return <div className="score-area">{rollIndex === -1 ? null : <ScoreDisplay />}</div>
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

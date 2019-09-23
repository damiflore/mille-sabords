import React from "react"

import { ButtonMarkScore } from "./ButtonMarkScore.jsx"

export const CurrentRoundScore = ({
  rollIndex,
  isOnSkullIsland,
  roundScore,
  markScorePermission,
  markScore,
}) => {
  if (rollIndex === -1) {
    return null
  }

  return (
    <div>
      <span className="subtitle"> Current round score: </span>
      <ScoreDisplay
        isOnSkullIsland={isOnSkullIsland}
        markScorePermission={markScorePermission}
        roundScore={roundScore}
        markScore={markScore}
      />
    </div>
  )
}

const ScoreDisplay = ({ markScorePermission, isOnSkullIsland, roundScore, markScore }) => {
  if (isOnSkullIsland) {
    return <span>XXX -Skull Island- XXX</span>
  }

  return (
    <>
      <span>{roundScore}</span>
      {markScorePermission.allowed ? <ButtonMarkScore onClick={markScore} /> : null}
      <div>{markScorePermission.reason}</div>
    </>
  )
}

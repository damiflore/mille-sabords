import React from "react"
import { HAS_THREE_SKULLS_OR_MORE } from "/src/constants.js"
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
      <div>
        {markScorePermission.reason === HAS_THREE_SKULLS_OR_MORE
          ? "Round over !"
          : markScorePermission.reason}
      </div>
    </>
  )
}

import React from "react"
import { HAS_THREE_SKULLS_OR_MORE } from "src/constants.js"
import { ButtonMarkScore } from "./ButtonMarkScore.jsx"
import { useGameStore } from "src/MilleSabordGame.js"
import { markScore } from "src/game.actions.js"

export const RoundScore = () => {
  const { rollIndex } = useGameStore()

  if (rollIndex === -1) {
    return null
  }

  return (
    <div>
      <span className="subtitle"> Round score: </span>
      <ScoreDisplay />
    </div>
  )
}

const ScoreDisplay = () => {
  const store = useGameStore()
  const { isOnSkullIsland, roundScore, markScorePermission } = store

  if (isOnSkullIsland) {
    return <span>Skull Island!</span>
  }

  return (
    <>
      <span>{roundScore}</span>
      <div>
        {markScorePermission.allowed ? (
          <ButtonMarkScore
            onClick={() => {
              markScore(store)
            }}
          />
        ) : null}
        <div>
          {markScorePermission.reason === HAS_THREE_SKULLS_OR_MORE
            ? "Round over !"
            : markScorePermission.reason}
        </div>
      </div>
    </>
  )
}

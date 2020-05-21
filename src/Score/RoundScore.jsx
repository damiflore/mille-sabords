import React from "react"
import { HAS_THREE_SKULLS_OR_MORE } from "src/constants.js"
import { ButtonMarkScore } from "./ButtonMarkScore.jsx"
import { useGameStore } from "src/MilleSabordGame.js"
import { markScore } from "src/game.actions.js"
import { useMarkScorePermission } from "src/game.selectors.js"

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
  const { isOnSkullIsland, roundScore } = store

  if (isOnSkullIsland) {
    return <span>Skull Island!</span>
  }

  const markScorePermission = useMarkScorePermission()

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

import React from "react"

import { useGameState } from "src/game.store.js"
import { markScorePermissionSelector, roundScoreSelector } from "src/game.selectors.js"
import { useMarkScore } from "src/game.actions.js"

// import { HAS_THREE_SKULLS_OR_MORE } from "src/constants.js"
import { MarkScoreIcon } from "./MarkScoreIcon.jsx"

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

  const markScorePermission = markScorePermissionSelector(state)
  const roundScore = roundScoreSelector(state)
  const markScore = useMarkScore()

  return (
    <>
      <div className="round-score">{roundScore}</div>
      {markScorePermission.allowed ? (
        <ButtonMarkScore
          onClick={() => {
            markScore(roundScore)
          }}
        />
      ) : null}
      {/* <div>
          {markScorePermission.reason === HAS_THREE_SKULLS_OR_MORE
            ? "Round over !"
            : markScorePermission.reason}
        </div> */}
    </>
  )
}

const ButtonMarkScore = ({ onClick }) => (
  <button onClick={onClick}>
    <MarkScoreIcon />
  </button>
)

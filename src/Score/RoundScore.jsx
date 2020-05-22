import React from "react"
// import { HAS_THREE_SKULLS_OR_MORE } from "src/constants.js"
import { MarkScoreIcon } from "./MarkScoreIcon.jsx"
import { useGameState } from "src/MilleSabordGame.js"
import { useMarkScorePermission, useRoundScore } from "src/game.selectors.js"
import { markScore } from "src/game.actions.js"

export const RoundScore = () => {
  const { rollIndex } = useGameState()
  return <div className="score-area">{rollIndex === -1 ? null : <ScoreDisplay />}</div>
}

const ScoreDisplay = () => {
  const state = useGameState()

  // const { isOnSkullIsland } = store
  // if (isOnSkullIsland) {
  //   return <span>Skull Island!</span>
  // }

  const markScorePermission = useMarkScorePermission(state)
  const roundScore = useRoundScore(state)

  return (
    <>
      <div
        className="round-score"
        style={{
          paddingRight: markScorePermission.allowed ? "20px" : "10px",
          marginLeft: markScorePermission.allowed ? "20px" : "0",
        }}
      >
        {roundScore}
      </div>
      {markScorePermission.allowed ? (
        <ButtonMarkScore
          onClick={() => {
            markScore(state, roundScore)
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

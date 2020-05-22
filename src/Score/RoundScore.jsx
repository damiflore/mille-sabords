import React from "react"
// import { HAS_THREE_SKULLS_OR_MORE } from "src/constants.js"
import { MarkScoreIcon } from "./MarkScoreIcon.jsx"
import { useGameStore } from "src/MilleSabordGame.js"
import { useMarkScorePermission, useRoundScore } from "src/game.selectors.js"
import { markScore } from "src/game.actions.js"

export const RoundScore = () => {
  const { rollIndex } = useGameStore()
  return <div className="score-area">{rollIndex === -1 ? null : <ScoreDisplay />}</div>
}

const ScoreDisplay = () => {
  const store = useGameStore()

  // const { isOnSkullIsland } = store
  // if (isOnSkullIsland) {
  //   return <span>Skull Island!</span>
  // }

  const markScorePermission = useMarkScorePermission(store)
  const roundScore = useRoundScore(store)

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
            markScore(store, roundScore)
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

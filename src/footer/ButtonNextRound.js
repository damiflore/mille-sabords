import React from "react"
import { useStartNextRoundAllowed } from "src/round/round.selectors.js"
import { useOpenScoreBoard } from "src/game/Game.jsx"
import { createAction } from "src/main.store.js"

export const ButtonNextRound = () => {
  const startNextRoundAllowed = useStartNextRoundAllowed()

  const openScoreBoard = useOpenScoreBoard()
  const endRound = useEndRound()

  if (startNextRoundAllowed) {
    return (
      <div className="next-round-action">
        <button
          onClick={() => {
            openScoreBoard()
            endRound()
          }}
        >
          Terminer mon tour
        </button>
      </div>
    )
  }

  return null
}

const useEndRound = createAction((state) => {
  return {
    ...state,
    roundStarted: false,
    currentCard: null,
  }
})

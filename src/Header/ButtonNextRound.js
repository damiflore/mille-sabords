import React from "react"
import { useGameState, createGameAction } from "src/game.store.js"
import { startNextRoundAllowedSelector } from "src/game.selectors.js"

export const ButtonNextRound = () => {
  const state = useGameState()
  const startNextRoundAllowed = startNextRoundAllowedSelector(state)
  const startNextRound = useStartNextRound()

  if (startNextRoundAllowed) {
    return (
      <div className="next-round-action">
        <button onClick={startNextRound}>Next round</button>
      </div>
    )
  }

  return null
}

const useStartNextRound = createGameAction((state) => {
  return {
    ...state,
    witchUncursedDiceId: null,
    rollIndex: -1,
    diceRolled: [],
    diceKept: [],
    diceCursed: [],
    scoreMarked: false,
    cardDrawn: false,
    isOnSkullIsland: false,
  }
})

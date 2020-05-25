import React from "react"
import { useGameState, createGameAction } from "src/game.store.js"
import { nextRoundPermissionSelector } from "src/game.selectors.js"

export const ButtonNextRound = () => {
  const state = useGameState()
  const nextRoundPermission = nextRoundPermissionSelector(state)
  const nextRound = useNextRound()

  if (nextRoundPermission.allowed) {
    return <button onClick={nextRound}>Next round</button>
  }

  return null
}

const useNextRound = createGameAction((state) => {
  return {
    ...state,
    diceUncursedByWitch: null,
    rollIndex: -1,
    diceRolled: [],
    diceKept: [],
    diceCursed: [],
    scoreMarked: false,
    cardDrawn: false,
    isOnSkullIsland: false,
  }
})

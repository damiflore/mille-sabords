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
  const { dices } = state
  return {
    ...state,
    diceOffGame: dices,
    diceInGame: [],
    diceKept: [],
    diceCursed: [],
    rollIndex: -1,
    scoreMarked: false,
    cardDrawn: false,
    cardEffectUsed: false,
    isOnSkullIsland: false,
  }
})

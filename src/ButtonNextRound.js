import React from "react"
import { createGameAction } from "src/game.store.js"
import { useNextRoundPermission } from "src/game.selectors.js"

export const ButtonNextRound = () => {
  const nextRoundPermission = useNextRoundPermission()

  if (nextRoundPermission.allowed) {
    const nextRound = useNextRound()
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

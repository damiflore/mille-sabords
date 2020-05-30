import React from "react"
import { createGameAction } from "src/game.store.js"
import { useStartNextRoundAllowed } from "src/game.selectors.js"

export const ButtonNextRound = () => {
  const startNextRoundAllowed = useStartNextRoundAllowed()
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
    rollCount: 0,
    dicesRolled: [],
    dicesCursed: [],
    dicesKept: [],
    scoreMarked: false,
    currentCard: null,
    isOnSkullIsland: false,
  }
})

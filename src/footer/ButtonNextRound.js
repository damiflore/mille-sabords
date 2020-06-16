import React from "react"
import { createGameAction } from "src/game.store.js"
import { useStartNextRoundAllowed } from "src/game.selectors.js"

export const ButtonNextRound = ({ openDialog }) => {
  const startNextRoundAllowed = useStartNextRoundAllowed()
  const startNextRound = useStartNextRound()

  const openNextRoundDialog = () => {
    openDialog(true)
    startNextRound()
  }

  if (startNextRoundAllowed) {
    return (
      <div className="next-round-action">
        <button onClick={openNextRoundDialog}>Tour suivant</button>
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

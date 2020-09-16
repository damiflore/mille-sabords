import React from "react"
import { createAction } from "src/main.store.js"
import { useStartNextRoundAllowed } from "src/round/round.selectors.js"

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

const useStartNextRound = createAction((state) => {
  return {
    ...state,
    witchUncursedDiceId: null,
    roundStarted: false,
    rollCount: 0,
    dicesRolled: [],
    dicesCursed: [],
    chestSlots: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
    },
    scoreMarked: false,
    currentCard: null,
    isOnSkullIsland: false,
  }
})

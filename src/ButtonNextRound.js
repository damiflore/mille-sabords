import React from "react"
import { useGameStore } from "src/MilleSabordGame.js"
import { useNextRoundPermission } from "src/game.selectors.js"

export const ButtonNextRound = () => {
  const store = useGameStore()
  const nextRoundPermission = useNextRoundPermission()

  if (nextRoundPermission.allowed) {
    return (
      <button
        onClick={() => {
          nextRound(store)
        }}
      >
        Next round
      </button>
    )
  }

  return null
}

const nextRound = ({
  dices,
  setDiceOffGame,
  setDiceInGame,
  setDiceKept,
  setDiceCursed,
  setRollIndex,
  setScoreMarked,
  setCardDrawn,
  setCardEffectUsed,
  setIsOnSkullIsland,
  setRoundScore,
}) => {
  setDiceOffGame(dices)
  setDiceInGame([])
  setDiceKept([])
  setDiceCursed([])
  setRollIndex(-1)
  setScoreMarked(false)
  setCardDrawn(false)
  setCardEffectUsed(false)
  setIsOnSkullIsland(false)
  setRoundScore(0)
}

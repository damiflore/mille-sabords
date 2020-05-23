import React from "react"
import { useGameState } from "src/game.store.js"
import { useNextRoundPermission } from "src/game.selectors.js"

export const ButtonNextRound = () => {
  const state = useGameState()
  const nextRoundPermission = useNextRoundPermission()

  if (nextRoundPermission.allowed) {
    return (
      <button
        onClick={() => {
          nextRound(state)
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
}

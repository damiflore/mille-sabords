import React from "react"
import { createGameAction, useRolledAreaNode } from "src/game.store.js"
import { useRollDiceAllowed } from "src/game.selectors.js"
import { rollDices } from "src/dices/rollDices.js"

export const ButtonRoll = () => {
  const rollDiceAllowed = useRollDiceAllowed()
  const diceRolledAreaNode = useRolledAreaNode()
  const roll = useRoll()

  if (rollDiceAllowed) {
    return (
      <div className="roll-action">
        <button
          onClick={() => {
            roll(diceRolledAreaNode)
          }}
        >
          Roll
        </button>
      </div>
    )
  }

  return null
}

const useRoll = createGameAction((state, diceRolledAreaNode) => {
  const { rollIndex, dices } = state

  if (rollIndex === -1) {
    return {
      ...state,
      rollIndex: 0,
      dicesRolled: rollDices(dices, {
        diceParentElement: diceRolledAreaNode,
      }),
    }
  }

  // il me faut les dices in rolled area pour le coup
  const { dicesRolled } = state
  return {
    ...state,
    rollIndex: rollIndex + 1,
    dicesRolled: rollDices(dicesRolled, {
      diceParentElement: diceRolledAreaNode,
    }),
  }
})

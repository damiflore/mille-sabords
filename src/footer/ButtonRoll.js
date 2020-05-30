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
  const { rollCount, dices, dicesRolled } = state
  return {
    ...state,
    rollCount: rollCount + 1,
    dicesRolled: rollDices(rollCount === 0 ? dices : dicesRolled, {
      diceParentElement: diceRolledAreaNode,
    }),
  }
})

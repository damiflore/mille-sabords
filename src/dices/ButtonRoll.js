import React from "react"
import { useGameState, createGameAction, useGameNode } from "src/game.context.js"
import { rollDiceAllowedSelector } from "src/game.selectors.js"
import { rollDices } from "src/dices/rollDices.js"

export const ButtonRoll = () => {
  const state = useGameState()
  const rollDiceAllowed = rollDiceAllowedSelector(state)
  const diceRolledAreaNode = useGameNode("dice-rolled-area")
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
      diceRolled: rollDices(dices, {
        diceParentElement: diceRolledAreaNode,
      }),
    }
  }

  const { diceRolled } = state
  return {
    ...state,
    rollIndex: rollIndex + 1,
    diceRolled: rollDices(diceRolled, {
      diceParentElement: diceRolledAreaNode,
    }),
  }
})

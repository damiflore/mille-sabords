import React from "react"
import { useGameState, createGameAction } from "src/game.store.js"
import { rollDiceAllowedSelector } from "src/game.selectors.js"
import { diceRolledAreaElementRef } from "src/game.component.js"
import { rollDices } from "src/dices/rollDices.js"

export const ButtonRoll = () => {
  const state = useGameState()
  const rollDiceAllowed = rollDiceAllowedSelector(state)
  const roll = useRoll()

  if (rollDiceAllowed) {
    return (
      <div className="roll-action">
        <button
          onClick={() => {
            roll(state)
          }}
        >
          Roll
        </button>
      </div>
    )
  }

  return null
}

const useRoll = createGameAction((state) => {
  const { rollIndex, dices } = state

  if (rollIndex === -1) {
    return {
      ...state,
      rollIndex: 0,
      diceRolled: rollDices(dices, {
        diceParentElement: diceRolledAreaElementRef.current.querySelector(".area"),
      }),
    }
  }

  const { diceRolled } = state
  return {
    ...state,
    rollIndex: rollIndex + 1,
    diceRolled: rollDices(diceRolled, {
      diceParentElement: diceRolledAreaElementRef.current.querySelector(".area"),
    }),
  }
})

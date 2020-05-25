import React from "react"
import { useGameState, createGameAction } from "src/game.store.js"
import { rollDicePermissionSelector } from "src/game.selectors.js"
import { onGoingRef } from "src/MilleSabordGame.js"
import { rollDices } from "src/Dice/rollDices.js"

export const ButtonRoll = () => {
  const state = useGameState()
  const rollDicePermission = rollDicePermissionSelector(state)
  const roll = useRoll()

  if (rollDicePermission.allowed) {
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

  if (rollDicePermission.reaon === "3 skulls or more") {
    return null
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
        diceParentElement: onGoingRef.current.querySelector(".area"),
      }),
    }
  }

  const { diceRolled } = state
  return {
    ...state,
    rollIndex: rollIndex + 1,
    diceRolled: rollDices(diceRolled, {
      diceParentElement: onGoingRef.current.querySelector(".area"),
    }),
  }
})

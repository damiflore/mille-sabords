import React from "react"
import { useGameState, createGameAction } from "src/game.store.js"
import { useRollDicePermission } from "src/game.selectors.js"
import { onGoingRef } from "src/MilleSabordGame.js"
import { rollDices } from "src/Dice/rollDices.js"

export const ButtonRoll = () => {
  const state = useGameState()
  const rollDicePermission = useRollDicePermission(state)
  const roll = useRoll()

  if (rollDicePermission.allowed) {
    return (
      <button
        onClick={() => {
          roll(state)
        }}
      >
        Roll
      </button>
    )
  }

  if (rollDicePermission.reaon === "3 skulls or more") {
    return null
  }

  return null
  // return (
  //   <>
  //     <button disabled={true}>Roll</button>
  //     <span>{`(${rollDicePermission.reason})`}</span>
  //   </>
  // )
}

const useRoll = createGameAction((state) => {
  const { rollIndex, diceOffGame } = state

  if (rollIndex === -1) {
    rollDices(diceOffGame, {
      diceParentElement: onGoingRef.current.querySelector(".area"),
    })

    return {
      ...state,
      rollIndex: 0,
      diceInGame: [...diceOffGame],
      diceOffGame: [],
    }
  }

  const { diceInGame } = state
  rollDices(diceInGame, {
    diceParentElement: onGoingRef.current.querySelector(".area"),
  })

  return {
    ...state,
    rollIndex: rollIndex + 1,
  }
})

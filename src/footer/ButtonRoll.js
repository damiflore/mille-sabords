import React from "react"
import { createAction } from "src/main.store.js"
import { useRollDiceAllowed } from "src/round/round.selectors.js"
import { rollDices } from "src/dices/rollDices.js"

export const ButtonRoll = ({ rolledAreaRef }) => {
  const rollDiceAllowed = useRollDiceAllowed()
  const roll = useRoll()

  if (rollDiceAllowed) {
    return (
      <div className="roll-action">
        <button
          onClick={() => {
            roll(rolledAreaRef.current)
          }}
        >
          Lancer
        </button>
      </div>
    )
  }

  return null
}

const useRoll = createAction((state, rolledAreaDomNode) => {
  const { dices, rollCount, diceRolledIds } = state
  const diceToRollIds = rollCount === 0 ? Object.keys(dices) : diceRolledIds
  const dicesToRoll = diceToRollIds.map((diceRolledId) => dices[diceRolledId])

  rollDices(dicesToRoll, { rolledAreaDomNode })
  return {
    ...state,
    rollCount: rollCount + 1,
    witchUncursedDiceId: null,
    diceRolledIds: dicesToRoll.map((dice) => dice.id),
    dices: { ...dices },
  }
})

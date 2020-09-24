import React from "react"
import { createAction } from "src/main.store.js"
import { useRollDiceAllowed } from "src/round/round.selectors.js"
import { rollDices } from "src/dices/rollDices.js"
import { diceIdToDice } from "src/dices/dices.js"

export const ButtonRoll = ({ rolledAreaDomNode }) => {
  const rollDiceAllowed = useRollDiceAllowed()
  const roll = useRoll()

  if (rollDiceAllowed) {
    return (
      <div className="roll-action">
        <button
          onClick={() => {
            roll(rolledAreaDomNode)
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
  const { rollCount, dices, diceRolledIds } = state
  const dicesToRoll =
    rollCount === 0 ? dices : diceRolledIds.map((diceRolledId) => diceIdToDice(diceRolledId))
  return {
    ...state,
    rollCount: rollCount + 1,
    witchUncursedDiceId: null,
    // [...] to ensure rolling dice re-render
    dices: [...rollDices(dicesToRoll, { rolledAreaDomNode })],
  }
})

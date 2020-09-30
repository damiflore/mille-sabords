import React from "react"
import { createAction, useDicesRolled, useCurrentCard } from "src/main.store.js"
import {
  useRollDiceAllowed,
  useHasNeverRolled,
  useThreeSkullsOrMoreInCursedArea,
} from "src/round/round.selectors.js"
import { useRolledAreaDomNode } from "src/dom/dom.main.js"
import { rollDices } from "src/dices/rollDices.js"
import { isChestCard } from "src/cards/cards.js"

export const ButtonRoll = () => {
  const rollDiceAllowed = useRollDiceAllowed()
  const rolledAreaDomNode = useRolledAreaDomNode()
  const dicesRolled = useDicesRolled()
  const hasNeverRolled = useHasNeverRolled()
  const roll = useRoll()

  const currentCard = useCurrentCard()
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()

  const disabledNotEnoughDice = dicesRolled.length < 2 && !hasNeverRolled
  const disabledChestCard = threeSkullsOrMoreInCursedArea && isChestCard(currentCard)
  const disabled = disabledNotEnoughDice || disabledChestCard

  if (rollDiceAllowed) {
    return (
      <div className="roll-action">
        <button
          onClick={() => {
            roll(rolledAreaDomNode)
          }}
          disabled={disabled}
        >
          Lancer
          {disabledNotEnoughDice && !disabledChestCard && (
            <span className="button-subtitle">(au moins 2 dés !)</span>
          )}
        </button>
        {disabledChestCard && <img src={`/src/dices/dice_skull.png`} className="skull-symbol" />}
      </div>
    )
  }

  return null
}

const useRoll = createAction((state, rolledAreaDomNode) => {
  const { rollCount, dices, dicesRolled } = state
  return {
    ...state,
    rollCount: rollCount + 1,
    dicesRolled:
      // [...] to ensure rolling dice re-render
      [
        ...rollDices(rollCount === 0 ? dices : dicesRolled, {
          rolledAreaDomNode,
        }),
      ],
  }
})

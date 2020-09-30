import React from "react"
import { createAction, useDiceRolledIds, useCurrentCardId } from "src/main.store.js"
import {
  useRollDiceAllowed,
  useHasNeverRolled,
  useThreeSkullsOrMoreInCursedArea,
} from "src/round/round.selectors.js"
import { rollDices } from "src/dices/rollDices.js"
import { cardIdToCard, isChestCard } from "src/cards/cards.js"

export const ButtonRoll = ({ rolledAreaRef }) => {
  const rollDiceAllowed = useRollDiceAllowed()
  const diceRolledIds = useDiceRolledIds()
  const hasNeverRolled = useHasNeverRolled()
  const roll = useRoll()

  const currentCard = cardIdToCard(useCurrentCardId())
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()

  const disabledNotEnoughDice = diceRolledIds.length < 2 && !hasNeverRolled
  const disabledChestCard = threeSkullsOrMoreInCursedArea && isChestCard(currentCard)
  const disabled = disabledNotEnoughDice || disabledChestCard

  if (rollDiceAllowed) {
    return (
      <div className="roll-action">
        <button
          onClick={() => {
            roll(rolledAreaRef.current)
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

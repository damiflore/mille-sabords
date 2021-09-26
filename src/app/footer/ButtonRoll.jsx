import React from "react"

import {
  createAction,
  useDiceRolledIds,
  useCurrentCardId,
} from "root/src/app/main.store.js"
import { Image } from "root/src/app/generic/Image.jsx"
import {
  useRollDiceAllowed,
  useHasNeverRolled,
  useThreeSkullsOrMoreInCursedArea,
} from "root/src/app/round/round.selectors.js"
import { rollDices } from "root/src/app/dices/rollDices.js"
import { cardIdToCard, isChestCard } from "root/src/app/cards/cards.js"
import { symbolSkullUrl } from "root/src/app/symbols/symbols.js"

export const ButtonRoll = ({ rolledAreaRef }) => {
  const rollDiceAllowed = useRollDiceAllowed()
  const diceRolledIds = useDiceRolledIds()
  const hasNeverRolled = useHasNeverRolled()
  const roll = useRoll()

  const currentCard = cardIdToCard(useCurrentCardId())
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()

  const disabledNotEnoughDice = diceRolledIds.length < 2 && !hasNeverRolled
  const disabledChestCard =
    threeSkullsOrMoreInCursedArea && isChestCard(currentCard)
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
        {disabledChestCard && (
          <Image src={symbolSkullUrl} className="skull-symbol" />
        )}
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

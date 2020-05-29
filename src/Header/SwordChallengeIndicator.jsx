import React from "react"

import { useCard, useCardDrawn, useDiceKept } from "src/game.store.js"
import {
  isSwordChallengeCard,
  isTwoSwordsChallengeCard,
  isThreeSwordsChallengeCard,
  isFourSwordsChallengeCard,
  TWO_SWORDS_CHALLENGE_GAMBLE,
  THREE_SWORDS_CHALLENGE_GAMBLE,
  FOUR_SWORDS_CHALLENGE_GAMBLE,
} from "src/cards/cards.js"
import { SYMBOL_SWORD } from "src/constants.js"
import { countSymbol, diceArrayToSymbolArray } from "src/Score/computeRoundScore.js"

export const useSwordQuantityRequired = ({ card = useCard() } = {}) => {
  if (isTwoSwordsChallengeCard(card)) return TWO_SWORDS_CHALLENGE_GAMBLE.numberOfSwords
  if (isThreeSwordsChallengeCard(card)) return THREE_SWORDS_CHALLENGE_GAMBLE.numberOfSwords
  if (isFourSwordsChallengeCard(card)) return FOUR_SWORDS_CHALLENGE_GAMBLE.numberOfSwords
  return null
}

export const SwordChallengeIndicator = () => {
  const card = useCard()
  const cardDrawn = useCardDrawn()
  const diceKept = useDiceKept()
  const quantityRequired = useSwordQuantityRequired()

  if (!isSwordChallengeCard(card) || !cardDrawn) {
    return null
  }

  const symbolArrayFromDiceKept = diceArrayToSymbolArray(diceKept)
  const quantityKept = countSymbol(symbolArrayFromDiceKept, SYMBOL_SWORD)
  const quantityRequiredArray = new Array(quantityRequired).fill("")

  return (
    <div className="sword-challenge-indicators">
      {quantityRequiredArray.map((value, index) => {
        if (quantityKept >= index + 1) return <SwordIconActivated key={index} />
        return <SwordIconDisabled key={index} />
      })}
    </div>
  )
}

const SwordIconActivated = () => (
  <div className="sword-icon">
    <img src={`src/dices/assets/dice_sword.png`} />
  </div>
)

const SwordIconDisabled = () => (
  <div className="sword-icon disabled">
    <img src={`src/cards/assets/swords-disabled.png`} />
  </div>
)

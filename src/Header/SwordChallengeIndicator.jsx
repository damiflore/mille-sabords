import React from "react"

import { useCard, useCardDrawn } from "src/game.store.js"
import { useSymbolsFromDicesKept } from "src/game.selectors.js"
import {
  isSwordChallengeCard,
  isTwoSwordsChallengeCard,
  isThreeSwordsChallengeCard,
  isFourSwordsChallengeCard,
  TWO_SWORDS_CHALLENGE_GAMBLE,
  THREE_SWORDS_CHALLENGE_GAMBLE,
  FOUR_SWORDS_CHALLENGE_GAMBLE,
} from "src/cards/cards.js"
import { SYMBOL_SWORD } from "src/symbols/symbols.js"
import { countSymbol } from "src/Score/computeRoundScore.js"

export const useSwordQuantityRequired = ({ card = useCard() } = {}) => {
  if (isTwoSwordsChallengeCard(card)) return TWO_SWORDS_CHALLENGE_GAMBLE.numberOfSwords
  if (isThreeSwordsChallengeCard(card)) return THREE_SWORDS_CHALLENGE_GAMBLE.numberOfSwords
  if (isFourSwordsChallengeCard(card)) return FOUR_SWORDS_CHALLENGE_GAMBLE.numberOfSwords
  return null
}

export const SwordChallengeIndicator = () => {
  const card = useCard()
  const cardDrawn = useCardDrawn()
  const symbolsFromDicesKept = useSymbolsFromDicesKept()
  const quantityRequired = useSwordQuantityRequired()

  if (!isSwordChallengeCard(card) || !cardDrawn) {
    return null
  }

  const quantityKept = countSymbol(symbolsFromDicesKept, SYMBOL_SWORD)
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

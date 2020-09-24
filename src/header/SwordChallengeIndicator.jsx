import React from "react"

import { useCurrentCardId } from "src/main.store.js"
import { useSymbolsInChest } from "src/round/round.selectors.js"
import { cardIdToCard, isSwordChallengeCard } from "src/cards/cards.js"
import { SYMBOL_SWORD } from "src/symbols/symbols.js"
import { countSymbol } from "src/score/computeRoundScore.js"

export const useSwordQuantityRequired = ({ currentCardId = useCurrentCardId() } = {}) => {
  const card = cardIdToCard(currentCardId)
  if (isSwordChallengeCard(card)) return card.numberOfSwords
  return null
}

export const SwordChallengeIndicator = () => {
  const currentCardId = useCurrentCardId()
  const symbolsInChest = useSymbolsInChest()
  const quantityRequired = useSwordQuantityRequired()

  if (!currentCardId) {
    return null
  }
  const currentCard = cardIdToCard(currentCardId)
  if (!isSwordChallengeCard(currentCard)) {
    return null
  }

  const quantityKept = countSymbol(symbolsInChest, SYMBOL_SWORD)
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
    <img src={`/src/dices/dice_sword.png`} />
  </div>
)

const SwordIconDisabled = () => (
  <div className="sword-icon disabled">
    <img src={`/src/header/swords-disabled.png`} />
  </div>
)

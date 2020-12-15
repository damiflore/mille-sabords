import React from "react"

import { Image } from "src/generic/Image.jsx"
import { useCurrentCardId } from "src/main.store.js"
import { useSymbolsInChest, useSwordQuantityRequired } from "src/round/round.selectors.js"
import { cardIdToCard, isSwordChallengeCard } from "src/cards/cards.js"
import { SYMBOL_SWORD, symbolSwordUrl } from "src/symbols/symbols.js"
import { countSymbol } from "src/round/computeRoundScore.js"

const swordsDisabledImageUrl = new URL("/src/header/swords-disabled.png", import.meta.url)

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
    <Image src={symbolSwordUrl} />
  </div>
)

const SwordIconDisabled = () => (
  <div className="sword-icon disabled">
    <Image src={swordsDisabledImageUrl} />
  </div>
)

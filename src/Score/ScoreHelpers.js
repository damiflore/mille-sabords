import {
  CARD_PIRATE,
  CARD_ANIMALS,
  CARD_DIAMOND,
  CARD_COIN,
  CARD_SKULL,
  CARD_CHEST,
} from "/src/Cards/card-types.js"
import {
  SYMBOL_DIAMOND,
  SYMBOL_COIN,
  SYMBOL_SKULL,
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
} from "/src/symbols/symbol-types.js"

export const countSymbolsOccurences = (symbolArray) => {
  const symbolCountMap = {}
  symbolArray.forEach((symbol) => {
    if (symbolCountMap.hasOwnProperty(symbol)) {
      symbolCountMap[symbol]++
    } else {
      symbolCountMap[symbol] = 1
    }
  })
  return symbolCountMap
}

const computeSymbolsScore = (symbolArray, { perfectEnabled }) => {
  let score = 0
  let usefullSymbol = 0

  // remove skulls from symbol array
  symbolArray = symbolArray.filter((symbol) => symbol !== SYMBOL_SKULL)

  // add points for dice combinaisons
  const symbolCountMap = countSymbolsOccurences(symbolArray)
  Object.values(symbolCountMap).forEach((symbolCount) => {
    if (symbolCount === 3) score += 100
    if (symbolCount === 4) score += 200
    if (symbolCount === 5) score += 500
    if (symbolCount === 6) score += 1000
    if (symbolCount === 7) score += 2000
    if (symbolCount === 8) score += 4000
    if (symbolCount > 2) usefullSymbol += symbolCount
  })

  // add 1 point for each coin and diamond
  symbolArray.forEach((symbol) => {
    if (symbol === SYMBOL_DIAMOND) {
      score += 100
      if (symbolCountMap[SYMBOL_DIAMOND] < 3) usefullSymbol += 1
    }
    if (symbol === SYMBOL_COIN) {
      score += 100
      if (symbolCountMap[SYMBOL_COIN] < 3) usefullSymbol += 1
    }
  })

  if (perfectEnabled && usefullSymbol >= symbolArray.length) score += 500

  return score
}

const computeHasThreeSkullsOrMore = (card, symbolArrayFromDiceKept, currentRoundIndex) => {
  if (currentRoundIndex === 0) return false
  let numerOfSkulls = countSymbolsOccurences(symbolArrayFromDiceKept)[SYMBOL_SKULL]
  if (card.type === CARD_SKULL) numerOfSkulls += card.skullAmount
  return numerOfSkulls > 2
}

const computeIsRoundOver = (
  hasThreeSkullsOrMore,
  scoreMarked,
  currentCard,
  isOnSkullIsland,
  currentRoundIndex,
) => {
  if (currentRoundIndex === 0) return false
  // if car = chest, round is over when we mark a score, or if we are on skull island
  if (currentCard.type === CARD_CHEST) {
    return scoreMarked || isOnSkullIsland
  }
  // if not, round is over when we mark a score,
  // OR when we have 3 skulls or more
  // OR if we are on skull island
  return hasThreeSkullsOrMore || scoreMarked || isOnSkullIsland
}

const computeIsOnSkullIsland = (card, symbolArrayFromDiceKept, currentRoundIndex) => {
  let numerOfSkulls = countSymbolsOccurences(symbolArrayFromDiceKept)[SYMBOL_SKULL]
  if (card.type === CARD_SKULL) numerOfSkulls += card.skullAmount
  if (currentRoundIndex === 1 && numerOfSkulls > 3) return true
  return false
}

// eslint-disable-next-line valid-jsdoc
/**
 * TODO: this function should be renamed to something more generic like
 * computeRoundState or whatever
 * it needs to receive { currentCard, currentRoundIndex, diceOnGoing, diceKept }
 * return {
 *   // isRoundOver must be true if first round + sword challenge + 3 skulls or more    <<< ?????
 *   // true if 3 skulls or more afer first round
 *   // false otherwise
 *   isRoundOver: Boolean,
 *
 *   // isOnSkullIsland must be true if 4 skulls or more on first round
 *   // false otherwise
 *   isOnSkullIsland: Boolean,
 *
 *   // score must be 0 if isRoundOver except if chest card
 *   // otherwise the score according to diceKept
 *   score: Number
 * }
 */
export const computeRoundState = ({
  currentCard,
  symbolArrayFromDiceKept,
  currentRoundIndex,
  scoreMarked,
}) => {
  console.log({ symbolArrayFromDiceKept })
  const perfectEnabled = symbolArrayFromDiceKept.length === 8

  const hasThreeSkullsOrMore = computeHasThreeSkullsOrMore(
    currentCard,
    symbolArrayFromDiceKept,
    currentRoundIndex,
  )
  const isOnSkullIsland = computeIsOnSkullIsland(
    currentCard,
    symbolArrayFromDiceKept,
    currentRoundIndex,
  )

  const roundState = {
    hasThreeSkullsOrMore,
    isRoundOver: computeIsRoundOver(
      hasThreeSkullsOrMore,
      scoreMarked,
      currentCard,
      isOnSkullIsland,
      currentRoundIndex,
    ),
    isOnSkullIsland,
    score: computeSymbolsScore(symbolArrayFromDiceKept, { perfectEnabled }),
  }

  console.log("roundState", roundState)
  console.log("currentRoundIndex", currentRoundIndex)

  if (symbolArrayFromDiceKept.length === 0) {
    roundState.score = 0
  }

  // add effects related to the drawn card
  if (currentCard.type === CARD_DIAMOND || currentCard.type === CARD_COIN) {
    roundState.score = computeSymbolsScore([...symbolArrayFromDiceKept, currentCard.type], {
      perfectEnabled,
    })
  }

  if (currentCard.type === CARD_ANIMALS) {
    roundState.score = computeSymbolsScore(
      symbolArrayFromDiceKept.map((symbol) => (symbol === SYMBOL_PARROT ? SYMBOL_MONKEY : symbol)),
      { perfectEnabled },
    )
  }

  if (currentCard.type === CARD_PIRATE) roundState.score *= 2

  if (currentCard.type !== CARD_CHEST && roundState.isRoundOver) roundState.score = 0

  return roundState
}

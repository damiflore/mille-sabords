import {
  CARD_PIRATE,
  CARD_ANIMALS,
  CARD_DIAMOND,
  CARD_COIN,
  CARD_SKULL,
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

export const isGameOver = (diceArray, card) => {
  let numerOfSkulls = countSymbolsOccurences(diceArray.map((dice) => dice.symbol))[SYMBOL_SKULL]
  if (card.type === CARD_SKULL) numerOfSkulls += card.skullAmount
  return numerOfSkulls > 2
}

const computeSymbolsScore = (symbolArray, { perfectEnabled }) => {
  let score = 0
  let usefullSymbol = 0

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

// eslint-disable-next-line valid-jsdoc
/**
 * TODO: this function should be renamed to something more generic like
 * computeRoundState or whatever
 * it needs to receive { currentCard, currentRoundIndex, diceOnGoing, diceKept }
 * return {
 *   // isRoundOvermust be true if first round + sword challenge + 3 skulls or more
 *   // true if 3 skulls or more afer first round
 *   // false otherwise
 *   isRoundOver: Boolean,
 *   // isOnSkullIsland must be true if 4 skulls or more on first round
 *   // false otherwise
 *   isOnSkullIsland: Boolean,
 *   // scoremust be 0 if isRoundOver except if chest card
 *   // otherwise the score according to diceKept
 *   score: Number
 * }
 */
export const computeScore = ({ currentCard, diceKept }) => {
  if (diceKept.length === 0) {
    return 0
  }

  const perfectEnabled = diceKept.length === 8
  const symbolArrayFromDiceKept = diceKept.map((dice) => dice.symbol)

  // add effects related to the drawn card
  if (currentCard.type === CARD_DIAMOND || currentCard.type === CARD_COIN) {
    return computeSymbolsScore([...symbolArrayFromDiceKept, currentCard.type], { perfectEnabled })
  }

  if (currentCard.type === CARD_ANIMALS) {
    return computeSymbolsScore(
      symbolArrayFromDiceKept.map((symbol) => (symbol === SYMBOL_PARROT ? SYMBOL_MONKEY : symbol)),
      { perfectEnabled },
    )
  }

  if (currentCard.type === CARD_PIRATE) {
    return computeSymbolsScore(symbolArrayFromDiceKept, { perfectEnabled }) * 2
  }

  return computeSymbolsScore(symbolArrayFromDiceKept, { perfectEnabled })
}

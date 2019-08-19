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

export const countSymbolsOccurences = (diceResultArray) => {
  const symbolCountMap = {}
  diceResultArray.forEach((diceResult) => {
    if (symbolCountMap.hasOwnProperty(diceResult)) {
      symbolCountMap[diceResult]++
    } else {
      symbolCountMap[diceResult] = 1
    }
  })
  return symbolCountMap
}

export const removeSkullsFromArray = (rollDice) =>
  rollDice.filter((symbol) => symbol !== SYMBOL_SKULL)

export const isGameOver = (rollDice, card) => {
  let numerOfSkulls = countSymbolsOccurences(rollDice)[SYMBOL_SKULL]
  if (card.type === CARD_SKULL) numerOfSkulls += card.skullAmount
  return numerOfSkulls > 2
}

const computeSymbolsScore = (symbolsArray, { perfectEnabled }) => {
  let score = 0
  let usefullSymbol = 0

  // add points for dice combinaisons
  const symbolCountMap = countSymbolsOccurences(symbolsArray)
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
  symbolsArray.forEach((symbol) => {
    if (symbol === SYMBOL_DIAMOND) {
      score += 100
      if (symbolCountMap[SYMBOL_DIAMOND] < 3) usefullSymbol += 1
    }
    if (symbol === SYMBOL_COIN) {
      score += 100
      if (symbolCountMap[SYMBOL_COIN] < 3) usefullSymbol += 1
    }
  })

  if (perfectEnabled && usefullSymbol >= symbolsArray.length) score += 500

  return score
}

export const computeScore = ({ currentCard, diceKept }) => {
  if (diceKept.length === 0) {
    return 0
  }

  const perfectEnabled = diceKept.length === 8

  // add effects related to the drawn card
  if (currentCard.type === CARD_DIAMOND || currentCard.type === CARD_COIN) {
    return computeSymbolsScore([...diceKept, currentCard.type], { perfectEnabled })
  }

  if (currentCard.type === CARD_ANIMALS) {
    return computeSymbolsScore(
      diceKept.map((symbol) => (symbol === SYMBOL_PARROT ? SYMBOL_MONKEY : symbol)),
      { perfectEnabled },
    )
  }

  if (currentCard.type === CARD_PIRATE) {
    return computeSymbolsScore(diceKept, { perfectEnabled }) * 2
  }

  return computeSymbolsScore(diceKept, { perfectEnabled })
}

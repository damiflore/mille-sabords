import {
  CARD_PIRATE,
  CARD_ANIMALS,
  CARD_DIAMOND,
  CARD_COIN,
  CARD_CHEST,
  CARD_SWORD_CHALLENGE,
} from "/src/Cards/card-types.js"
import {
  SYMBOL_DIAMOND,
  SYMBOL_COIN,
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
} from "/src/symbols/symbol-types.js"
import { diceArrayToSymbolArray } from "/src/Dice/DiceHelpers.js"

export const computeRoundScore = ({ card, diceKept, markScorePermission }) => {
  if (!markScorePermission.allowed) {
    if (card.type === CARD_SWORD_CHALLENGE) {
      return -card.gamble
    }
    return 0
  }

  const perfectEnabled = diceKept.length === 8
  const symbolArrayFromDiceKept = diceArrayToSymbolArray(diceKept)

  if (card.type === CARD_SWORD_CHALLENGE) {
    const swordChallengeAchieved = countSymbol(symbolArrayFromDiceKept, SYMBOL_SWORD) >= card.goal
    if (swordChallengeAchieved) {
      return computeScoreForSymbols(symbolArrayFromDiceKept, { perfectEnabled }) + card.gamble
    }
    return -card.gamble
  }

  if (card.type === CARD_CHEST) {
    return computeScoreForSymbols(symbolArrayFromDiceKept, { perfectEnabled })
  }

  if (card.type === CARD_DIAMOND || card.type === CARD_COIN) {
    return computeScoreForSymbols([...symbolArrayFromDiceKept, card.type], {
      perfectEnabled,
    })
  }

  if (card.type === CARD_ANIMALS) {
    return computeScoreForSymbols(
      symbolArrayFromDiceKept.map((symbol) => (symbol === SYMBOL_PARROT ? SYMBOL_MONKEY : symbol)),
      { perfectEnabled },
    )
  }

  if (card.type === CARD_PIRATE) {
    return computeScoreForSymbols(symbolArrayFromDiceKept, { perfectEnabled }) * 2
  }

  return computeScoreForSymbols(symbolArrayFromDiceKept, { perfectEnabled })
}

const countSymbol = (symbolArray, symbol) => {
  return symbolArray.filter((symbolCandidate) => symbolCandidate === symbol).length
}

const computeScoreForSymbols = (symbolArray, { perfectEnabled }) => {
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

const countSymbolsOccurences = (symbolArray) => {
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

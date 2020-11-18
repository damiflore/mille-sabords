import {
  SYMBOL_DIAMOND,
  SYMBOL_COIN,
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
} from "src/symbols/symbols.js"
import {
  isAnimalsCard,
  isPirateCard,
  isCoinCard,
  isDiamondCard,
  isSwordChallengeCard,
} from "src/cards/cards.js"

export const computeRoundScore = ({ card, symbolsInChest, scoreMarked, markScoreAllowed }) => {
  if (isSwordChallengeCard(card)) {
    if (!scoreMarked && !markScoreAllowed) {
      return -card.gambleAmount
    }
    return computeScoreForSwordChallenge(symbolsInChest, {
      goal: card.numberOfSwords,
      gamble: card.gambleAmount,
    })
  }

  if (isAnimalsCard(card)) {
    return computeScoreForSymbols(
      symbolsInChest.map((symbol) => (symbol === SYMBOL_PARROT ? SYMBOL_MONKEY : symbol)),
    )
  }

  if (isPirateCard(card)) {
    return computeScoreForSymbols(symbolsInChest) * 2
  }

  if (isCoinCard(card)) {
    return computeScoreForSymbols(symbolsInChest, 9)
  }

  if (isDiamondCard(card)) {
    return computeScoreForSymbols(symbolsInChest, 9)
  }

  return computeScoreForSymbols(symbolsInChest)
}

const computeScoreForSwordChallenge = (symbols, { goal, gamble }) => {
  const swordChallengeAchieved = countSymbol(symbols, SYMBOL_SWORD) >= goal
  if (swordChallengeAchieved) {
    return computeScoreForSymbols(symbols) + gamble
  }
  return -gamble
}

export const countSymbol = (symbolArray, symbol) => {
  return symbolArray.filter((symbolCandidate) => symbolCandidate === symbol).length
}

const computeScoreForSymbols = (symbols, perfectCount = 8) => {
  let score = 0
  let usefullSymbol = 0

  // add points for dice combinaisons
  const symbolCountMap = countSymbolsOccurences(symbols)
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
  symbols.forEach((symbol) => {
    if (symbol === SYMBOL_DIAMOND) {
      score += 100
      if (symbolCountMap[SYMBOL_DIAMOND] < 3) usefullSymbol += 1
    }
    if (symbol === SYMBOL_COIN) {
      score += 100
      if (symbolCountMap[SYMBOL_COIN] < 3) usefullSymbol += 1
    }
  })

  if (usefullSymbol === perfectCount) score += 500

  return score
}

const countSymbolsOccurences = (symbols) => {
  const symbolCountMap = {}
  symbols.forEach((symbol) => {
    if (symbolCountMap.hasOwnProperty(symbol)) {
      symbolCountMap[symbol]++
    } else {
      symbolCountMap[symbol] = 1
    }
  })
  return symbolCountMap
}

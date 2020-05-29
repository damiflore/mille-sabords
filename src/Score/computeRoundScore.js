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
  isTwoSwordsChallengeCard,
  isThreeSwordsChallengeCard,
  isFourSwordsChallengeCard,
  TWO_SWORDS_CHALLENGE_GAMBLE,
  THREE_SWORDS_CHALLENGE_GAMBLE,
  FOUR_SWORDS_CHALLENGE_GAMBLE,
  isCoinCard,
  isDiamondCard,
} from "src/cards/cards.js"

export const computeRoundScore = ({
  card,
  symbolsFromDicesKept,
  scoreMarked,
  markScoreAllowed,
}) => {
  if (isTwoSwordsChallengeCard(card)) {
    if (!scoreMarked && !markScoreAllowed) {
      return -TWO_SWORDS_CHALLENGE_GAMBLE.gambleAmount
    }
    return computeScoreForSwordChallenge(symbolsFromDicesKept, {
      goal: TWO_SWORDS_CHALLENGE_GAMBLE.numberOfSwords,
      gamble: TWO_SWORDS_CHALLENGE_GAMBLE.gambleAmount,
    })
  }

  if (isThreeSwordsChallengeCard(card)) {
    if (!scoreMarked && !markScoreAllowed) {
      return -THREE_SWORDS_CHALLENGE_GAMBLE.gambleAmount
    }
    return computeScoreForSwordChallenge(symbolsFromDicesKept, {
      goal: THREE_SWORDS_CHALLENGE_GAMBLE.numberOfSwords,
      gamble: THREE_SWORDS_CHALLENGE_GAMBLE.gambleAmount,
    })
  }

  if (isFourSwordsChallengeCard(card)) {
    if (!scoreMarked && !markScoreAllowed) {
      return -FOUR_SWORDS_CHALLENGE_GAMBLE.gambleAmount
    }
    return computeScoreForSwordChallenge(symbolsFromDicesKept, {
      goal: FOUR_SWORDS_CHALLENGE_GAMBLE.numberOfSwords,
      gamble: FOUR_SWORDS_CHALLENGE_GAMBLE.gambleAmount,
    })
  }

  if (isAnimalsCard(card)) {
    return computeScoreForSymbols(
      symbolsFromDicesKept.map((symbol) => (symbol === SYMBOL_PARROT ? SYMBOL_MONKEY : symbol)),
    )
  }

  if (isPirateCard(card)) {
    return computeScoreForSymbols(symbolsFromDicesKept) * 2
  }

  if (isCoinCard(card)) {
    return computeScoreForSymbols([...symbolsFromDicesKept, SYMBOL_COIN], 9)
  }

  if (isDiamondCard(card)) {
    return computeScoreForSymbols([...symbolsFromDicesKept, SYMBOL_DIAMOND], 9)
  }

  return computeScoreForSymbols(symbolsFromDicesKept)
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

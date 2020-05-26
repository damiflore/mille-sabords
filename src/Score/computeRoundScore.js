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
} from "src/Cards/cards.js"
import {
  SYMBOL_DIAMOND,
  SYMBOL_COIN,
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
} from "src/constants.js"

export const computeRoundScore = ({ card, diceKept, scoreMarked, markScoreAllowed }) => {
  const symbolArrayFromDiceKept = diceArrayToSymbolArray(diceKept)

  if (isTwoSwordsChallengeCard(card)) {
    if (!scoreMarked && !markScoreAllowed) {
      return -TWO_SWORDS_CHALLENGE_GAMBLE
    }
    return computeScoreForSwordChallenge(symbolArrayFromDiceKept, {
      goal: 2,
      gamble: TWO_SWORDS_CHALLENGE_GAMBLE,
    })
  }

  if (isThreeSwordsChallengeCard(card)) {
    if (!scoreMarked && !markScoreAllowed) {
      return -THREE_SWORDS_CHALLENGE_GAMBLE
    }
    return computeScoreForSwordChallenge(symbolArrayFromDiceKept, {
      goal: 3,
      gamble: THREE_SWORDS_CHALLENGE_GAMBLE,
    })
  }

  if (isFourSwordsChallengeCard(card)) {
    if (!scoreMarked && !markScoreAllowed) {
      return -FOUR_SWORDS_CHALLENGE_GAMBLE
    }
    return computeScoreForSwordChallenge(symbolArrayFromDiceKept, {
      goal: 4,
      gamble: FOUR_SWORDS_CHALLENGE_GAMBLE,
    })
  }

  if (isAnimalsCard(card)) {
    return computeScoreForSymbols(
      symbolArrayFromDiceKept.map((symbol) => (symbol === SYMBOL_PARROT ? SYMBOL_MONKEY : symbol)),
    )
  }

  if (isPirateCard(card)) {
    return computeScoreForSymbols(symbolArrayFromDiceKept) * 2
  }

  if (isCoinCard(card) || isDiamondCard(card)) {
    return computeScoreForSymbols(symbolArrayFromDiceKept, 9)
  }

  return computeScoreForSymbols(symbolArrayFromDiceKept)
}

const diceArrayToSymbolArray = (diceArray) => diceArray.map((dice) => diceToSymbol(dice))

const diceToSymbol = (dice) => dice.symbol

const computeScoreForSwordChallenge = (symbolArray, { goal, gamble }) => {
  const swordChallengeAchieved = countSymbol(symbolArray, SYMBOL_SWORD) >= goal
  if (swordChallengeAchieved) {
    return computeScoreForSymbols(symbolArray) + gamble
  }
  return -gamble
}

const countSymbol = (symbolArray, symbol) => {
  return symbolArray.filter((symbolCandidate) => symbolCandidate === symbol).length
}

const computeScoreForSymbols = (symbolArray, perfectCount = 8) => {
  const perfectEnabled = symbolArray.length === perfectCount

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

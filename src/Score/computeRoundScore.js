import {
  isAnimalsCard,
  isPirateCard,
  isCoinCard,
  isDiamondCard,
  isTwoSwordsChallengeCard,
  isThreeSwordsChallengeCard,
  isFourSwordsChallengeCard,
  TWO_SWORDS_CHALLENGE_GAMBLE,
  THREE_SWORDS_CHALLENGE_GAMBLE,
  FOUR_SWORDS_CHALLENGE_GAMBLE,
} from "src/Cards/cards.js"
import {
  SYMBOL_DIAMOND,
  SYMBOL_COIN,
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
} from "src/symbols/symbol-types.js"

export const computeRoundScore = ({ card, diceKept, markScoreAllowed }) => {
  const symbolArrayFromDiceKept = diceArrayToSymbolArray(diceKept)

  if (isTwoSwordsChallengeCard(card)) {
    if (!markScoreAllowed) {
      return -TWO_SWORDS_CHALLENGE_GAMBLE
    }
    return computeScoreForSwordChallenge(symbolArrayFromDiceKept, diceKept, {
      goal: 2,
      gamble: TWO_SWORDS_CHALLENGE_GAMBLE,
    })
  }

  if (isThreeSwordsChallengeCard(card)) {
    if (!markScoreAllowed) {
      return -THREE_SWORDS_CHALLENGE_GAMBLE
    }
    return computeScoreForSwordChallenge(symbolArrayFromDiceKept, diceKept, {
      goal: 3,
      gamble: THREE_SWORDS_CHALLENGE_GAMBLE,
    })
  }

  if (isFourSwordsChallengeCard(card)) {
    if (!markScoreAllowed) {
      return -FOUR_SWORDS_CHALLENGE_GAMBLE
    }
    return computeScoreForSwordChallenge(symbolArrayFromDiceKept, diceKept, {
      goal: 4,
      gamble: FOUR_SWORDS_CHALLENGE_GAMBLE,
    })
  }

  if (isDiamondCard(card)) {
    return computeScoreForSymbols([...symbolArrayFromDiceKept, SYMBOL_DIAMOND], diceKept)
  }

  if (isCoinCard(card)) {
    return computeScoreForSymbols([...symbolArrayFromDiceKept, SYMBOL_COIN], diceKept)
  }

  if (isAnimalsCard(card)) {
    return computeScoreForSymbols(
      symbolArrayFromDiceKept.map((symbol) => (symbol === SYMBOL_PARROT ? SYMBOL_MONKEY : symbol)),
      diceKept,
    )
  }

  if (isPirateCard(card)) {
    return computeScoreForSymbols(symbolArrayFromDiceKept, diceKept) * 2
  }

  return computeScoreForSymbols(symbolArrayFromDiceKept, diceKept)
}

const diceArrayToSymbolArray = (diceArray) => diceArray.map((dice) => diceToSymbol(dice))

const diceToSymbol = (dice) => dice.symbol

const computeScoreForSwordChallenge = (symbolArray, diceKept, { goal, gamble }) => {
  const swordChallengeAchieved = countSymbol(symbolArray, SYMBOL_SWORD) >= goal
  if (swordChallengeAchieved) {
    return computeScoreForSymbols(symbolArray, diceKept) + gamble
  }
  return -gamble
}

const countSymbol = (symbolArray, symbol) => {
  return symbolArray.filter((symbolCandidate) => symbolCandidate === symbol).length
}

const computeScoreForSymbols = (symbolArray, diceKept) => {
  const perfectEnabled = diceKept.length === 8

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

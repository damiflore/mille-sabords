import {
  CARD_PIRATE,
  CARD_ANIMALS,
  CARD_DIAMOND,
  CARD_COIN,
  CARD_SKULL,
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

export const computeRoundState = ({
  currentCard,
  diceKept,
  diceCursed,
  rollIndex,
  scoreMarked = false,
}) => {
  const isFirstRound = rollIndex === 0

  let numerOfSkulls = diceCursed.length
  if (currentCard.type === CARD_SKULL) numerOfSkulls += currentCard.skullAmount

  const isOnSkullIsland = isFirstRound && numerOfSkulls > 3
  const hasThreeSkullsOrMore = numerOfSkulls > 2

  const perfectEnabled = diceKept.length === 8
  const symbolArrayFromDiceKept = diceArrayToSymbolArray(diceKept)

  if (currentCard.type === CARD_CHEST) {
    const isRoundOver = isOnSkullIsland || scoreMarked
    const score = computeScoreForSymbols(symbolArrayFromDiceKept, { perfectEnabled })
    return {
      isOnSkullIsland,
      hasThreeSkullsOrMore,
      isRoundOver,
      score,
    }
  }

  if (currentCard.type === CARD_SWORD_CHALLENGE) {
    const isRoundOver = isOnSkullIsland || hasThreeSkullsOrMore || scoreMarked
    const swordGoalAchieved =
      isOnSkullIsland || hasThreeSkullsOrMore
        ? false
        : countSymbol(symbolArrayFromDiceKept, SYMBOL_SWORD) >= currentCard.goal
    const score = swordGoalAchieved
      ? computeScoreForSymbols(symbolArrayFromDiceKept, { perfectEnabled }) + currentCard.gamble
      : -currentCard.gamble
    return {
      isOnSkullIsland,
      hasThreeSkullsOrMore,
      isRoundOver,
      score,
    }
  }

  const isRoundOver = isOnSkullIsland || hasThreeSkullsOrMore || scoreMarked

  if (currentCard.type === CARD_DIAMOND || currentCard.type === CARD_COIN) {
    return {
      isOnSkullIsland,
      hasThreeSkullsOrMore,
      isRoundOver,
      score: isRoundOver
        ? 0
        : computeScoreForSymbols([...symbolArrayFromDiceKept, currentCard.type], {
            perfectEnabled,
          }),
    }
  }

  if (currentCard.type === CARD_ANIMALS) {
    return {
      isOnSkullIsland,
      hasThreeSkullsOrMore,
      isRoundOver,
      score: isRoundOver
        ? 0
        : computeScoreForSymbols(
            symbolArrayFromDiceKept.map((symbol) =>
              symbol === SYMBOL_PARROT ? SYMBOL_MONKEY : symbol,
            ),
            { perfectEnabled },
          ),
    }
  }

  if (currentCard.type === CARD_PIRATE) {
    return {
      isOnSkullIsland,
      hasThreeSkullsOrMore,
      isRoundOver,
      score: isRoundOver
        ? 0
        : computeScoreForSymbols(symbolArrayFromDiceKept, { perfectEnabled }) * 2,
    }
  }

  return {
    isOnSkullIsland,
    hasThreeSkullsOrMore,
    isRoundOver,
    score: isRoundOver ? 0 : computeScoreForSymbols(symbolArrayFromDiceKept, { perfectEnabled }),
  }
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

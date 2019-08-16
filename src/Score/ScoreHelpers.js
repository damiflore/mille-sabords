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

export const removeSkullsFromArray = (rollDice) => rollDice.filter((symbol) => symbol !== "skull")

export const isGameOver = (rollDice, card) => {
  let numerOfSkulls = countSymbolsOccurences(rollDice).skull
  if (card.type === "skull") numerOfSkulls += card.skullAmount
  return numerOfSkulls > 2
}

const computeSymbolsScore = (symbolsArray) => {
  let score = 0

  // If it's not done, remove skulls before calculate the score
  const symbolsArrayWithoutSkulls = removeSkullsFromArray(symbolsArray)

  // add 1 point for each coin and diamond
  symbolsArrayWithoutSkulls.forEach((symbol) => {
    if (symbol === "diamond" || symbol === "coin") score += 100
  })

  // add points for dice combinaisons
  const occurencesArray = countSymbolsOccurences(symbolsArrayWithoutSkulls)
  Object.values(occurencesArray).forEach((occurences) => {
    if (occurences === 3) score += 100
    if (occurences === 4) score += 200
    if (occurences === 5) score += 500
    if (occurences === 6) score += 1000
    if (occurences === 7) score += 2000
    if (occurences === 8) score += 4000
  })

  return score
}

export const computeScore = (currentCard, diceKept) => {
  // add effects related to the drawn card
  if (currentCard.type === "diamond" || currentCard.type === "coin")
    return computeSymbolsScore([...diceKept, currentCard.type])
  if (currentCard.type === "animals")
    return computeSymbolsScore(diceKept.map((symbol) => (symbol === "parrot" ? "monkey" : symbol)))
  if (currentCard.type === "pirate") return computeSymbolsScore(diceKept) * 2

  return computeSymbolsScore(diceKept)
}

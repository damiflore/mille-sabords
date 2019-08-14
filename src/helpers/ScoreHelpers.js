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
  if (card === "skull") numerOfSkulls++
  if (card === "2skulls") numerOfSkulls += 2
  return numerOfSkulls > 2
}

export const computeScore = (rollDice, card) => {
  let score = 0

  // If 3 skulls : game is over !
  if (isGameOver(rollDice, card)) return "You lose!"

  // If not, remove skulls to calculate the score
  const rollDiceWithoutSkulls = removeSkullsFromArray(rollDice)

  // add 1 point for each coin and diamond
  rollDiceWithoutSkulls.forEach((symbol) => {
    if (symbol === "diamond" || symbol === "coin") score += 100
  })

  // add points for dice combinaisons
  const occurencesArray = countSymbolsOccurences(rollDiceWithoutSkulls)
  Object.values(occurencesArray).forEach((occurences) => {
    if (occurences === 3) score += 100
    if (occurences === 4) score += 200
    if (occurences === 5) score += 500
    if (occurences === 6) score += 1000
    if (occurences === 7) score += 2000
    if (occurences === 8) score += 4000
  })

  // add points related to the drawn card
  if (card === "diamond" || card === "coin") score += 100
  if (card === "pirate") score *= 2
  return score
}

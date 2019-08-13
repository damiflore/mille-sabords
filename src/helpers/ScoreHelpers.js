import { setStorageArray, getStorageArray } from "./LocalStorage"

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

const removeSkullsFromArray = (rollDice) => rollDice.filter((symbol) => symbol !== "skull")

export const computeScore = (rollDice) => {
  let score = 0

  // remove skulls
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
  return score
}

export const keepSkulls = () => {
  const rollDice = getStorageArray("roll")

  const numberOfSkulls = countSymbolsOccurences(rollDice).skull

  // if the roll contain some skulls, remove them from the current roll, add them to the kept dice
  if (numberOfSkulls) {
    const diceKept = getStorageArray("diceKept")
    for (var i = 0; i < numberOfSkulls; i++) diceKept.push("skull")
    setStorageArray("diceKept", diceKept)
    const rollDiceWithoutSkulls = removeSkullsFromArray(rollDice)
    setStorageArray("roll", rollDiceWithoutSkulls)
  }
}

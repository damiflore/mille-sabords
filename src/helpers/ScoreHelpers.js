import { getRollDiceResults } from "./DiceHelpers"

const countSymbolsOccurences = (diceResultArray) => {
  const symbolCountMap = {}
  diceResultArray.forEach((diceResult) => {
    if (symbolCountMap.hasOwnProperty(diceResult)) {
      symbolCountMap[diceResult]++
    } else {
      symbolCountMap[diceResult] = 1
    }
  })
  console.log("symbolCountMap", symbolCountMap)
  return symbolCountMap
}

const computeScore = (rollDice) => {
  console.log("rollDice", rollDice)
  let score = 0

  // remove skulls
  const rollDiceWithoutSkulls = rollDice.filter((symbol) => symbol !== "skull")
  console.log("rollDiceWithoutSkulls", rollDiceWithoutSkulls)

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

  console.log("score", score)
}

computeScore(getRollDiceResults(8))

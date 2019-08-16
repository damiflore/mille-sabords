const diceNumberToSymbol = {
  1: "coin",
  2: "diamond",
  3: "sword",
  4: "parrot",
  5: "monkey",
  6: "skull",
}

const getRandomDiceNumber = () => Math.floor(Math.random() * 6) + 1

export const rollDice = (numberOfDice) => {
  const rollDice = []
  for (let i = 0; i < numberOfDice; i++) {
    const diceNumber = getRandomDiceNumber()
    rollDice.push(diceNumberToSymbol[diceNumber])
  }
  return rollDice
}

export const removeFromArray = (rollDice, symbol) => {
  const index = rollDice.findIndex((symbolToFind) => symbolToFind === symbol)
  rollDice.splice(index, 1)
  return rollDice
}

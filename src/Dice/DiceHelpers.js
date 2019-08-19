import {
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_SWORD,
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SKULL,
} from "/src/symbols/symbol-types.js"

const diceNumberToSymbol = {
  1: SYMBOL_COIN,
  2: SYMBOL_DIAMOND,
  3: SYMBOL_SWORD,
  4: SYMBOL_PARROT,
  5: SYMBOL_MONKEY,
  6: SYMBOL_SKULL,
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

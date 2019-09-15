import {
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_SWORD,
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SKULL,
} from "/src/symbols/symbol-types.js"

export const DICE_ARRAY = [
  { id: 1, symbol: SYMBOL_COIN },
  { id: 2, symbol: SYMBOL_DIAMOND },
  { id: 3, symbol: SYMBOL_SWORD },
  { id: 4, symbol: SYMBOL_PARROT },
  { id: 5, symbol: SYMBOL_MONKEY },
  { id: 6, symbol: SYMBOL_MONKEY },
  { id: 7, symbol: SYMBOL_SKULL },
  { id: 8, symbol: SYMBOL_SKULL },
]

const diceNumberToSymbol = {
  1: SYMBOL_COIN,
  2: SYMBOL_DIAMOND,
  3: SYMBOL_SWORD,
  4: SYMBOL_PARROT,
  5: SYMBOL_MONKEY,
  6: SYMBOL_SKULL,
}

export const rollOnGoingDices = (onGoingDices) => {
  onGoingDices.forEach((dice) => {
    rollDice(dice)
  })
}

export const diceArrayToSymbolArray = (diceArray) => diceArray.map((dice) => diceToSymbol(dice))

const diceToSymbol = (dice) => dice.symbol

const rollDice = (dice) => {
  dice.symbol = getDiceRandomSymbol()
}

const getDiceRandomSymbol = () => diceNumberToSymbol[getRandomDiceNumber()]

const getRandomDiceNumber = () => Math.floor(Math.random() * 6) + 1

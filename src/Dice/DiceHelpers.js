import {
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_SWORD,
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SKULL,
} from "/src/symbols/symbol-types.js"

import { detectCollision } from "../UI/dicePosition"

export const DICE_ARRAY = [
  { id: 1, symbol: SYMBOL_COIN, position: { x: 0, y: 0 } },
  { id: 2, symbol: SYMBOL_DIAMOND, position: { x: 0, y: 0 } },
  { id: 3, symbol: SYMBOL_SWORD, position: { x: 0, y: 0 } },
  { id: 4, symbol: SYMBOL_PARROT, position: { x: 0, y: 0 } },
  { id: 5, symbol: SYMBOL_MONKEY, position: { x: 0, y: 0 } },
  { id: 6, symbol: SYMBOL_SKULL, position: { x: 0, y: 0 } },
  { id: 7, symbol: SYMBOL_SKULL, position: { x: 0, y: 0 } },
  { id: 8, symbol: SYMBOL_SKULL, position: { x: 0, y: 0 } },
]

const diceNumberToSymbol = {
  1: SYMBOL_COIN,
  2: SYMBOL_DIAMOND,
  3: SYMBOL_SWORD,
  4: SYMBOL_PARROT,
  5: SYMBOL_MONKEY,
  6: SYMBOL_DIAMOND,
  // todo change back to SKULL !!!!!
}

export const rollDices = (dices) => {
  dices.forEach((dice) => {
    rollDice(dice, dices)
  })
}

export const diceArrayToSymbolArray = (diceArray) => diceArray.map((dice) => diceToSymbol(dice))

export const splitSkulls = (dices) => {
  const withoutSkulls = []
  const skulls = []

  dices.forEach((dice) => {
    if (dice.symbol === SYMBOL_SKULL) {
      skulls.push(dice)
    } else {
      withoutSkulls.push(dice)
    }
  })

  return { withoutSkulls, skulls }
}

const diceToSymbol = (dice) => dice.symbol

const rollDice = (dice, dices) => {
  dice.symbol = getDiceRandomSymbol()
  dice.position = getRandomCollisionFreeDicePosition(dices)
  dice.rotation = getDiceRotation()
}

const getDiceRandomSymbol = () => diceNumberToSymbol[getRandomDiceNumber()]

const getRandomDiceNumber = () => Math.floor(Math.random() * 6) + 1

// dice position

const getRandomNumberBetweenInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min) // min and max are included

export const getRandomCollisionFreeDicePosition = (dices) => {
  let dicePosition = {
    x: getRandomNumberBetweenInterval(0, 350),
    y: getRandomNumberBetweenInterval(0, 350),
  }
  if (detectCollision(dicePosition, dices)) {
    dicePosition = getRandomCollisionFreeDicePosition(dices)
  }
  return dicePosition
}

export const getDiceRotation = () => getRandomNumberBetweenInterval(-35, 35)

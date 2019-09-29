import {
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_SWORD,
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SKULL,
} from "src/symbols/symbol-types.js"
import { detectCollision } from "../UI/dicePosition.js"

export const getDiceArray = () => {
  return DICE_ARRAY.map((dice) => {
    return { ...dice }
  })
}

const diceBaseProperties = { x: 0, y: 0 }

const DICE_ARRAY = [
  { ...diceBaseProperties, id: 1, symbol: SYMBOL_COIN },
  { ...diceBaseProperties, id: 2, symbol: SYMBOL_DIAMOND },
  { ...diceBaseProperties, id: 3, symbol: SYMBOL_SWORD },
  { ...diceBaseProperties, id: 4, symbol: SYMBOL_PARROT },
  { ...diceBaseProperties, id: 5, symbol: SYMBOL_MONKEY },
  { ...diceBaseProperties, id: 6, symbol: SYMBOL_SKULL },
  { ...diceBaseProperties, id: 7, symbol: SYMBOL_SKULL },
  { ...diceBaseProperties, id: 8, symbol: SYMBOL_SKULL },
]

const diceNumberToSymbol = {
  1: SYMBOL_COIN,
  2: SYMBOL_DIAMOND,
  3: SYMBOL_SWORD,
  4: SYMBOL_PARROT,
  5: SYMBOL_MONKEY,
  6: SYMBOL_SKULL,
}

export const rollDices = (dices) => {
  dices.forEach((dice, index) => {
    rollDice(dice, index, dices)
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

const rollDice = (dice, index, dices) => {
  dice.symbol = getDiceRandomSymbol()

  const { x, y } = getRandomCollisionFreeDicePosition(dices.slice(0, index))
  dice.x = x
  dice.y = y

  dice.rotation = getDiceRotation()
}

const getDiceRandomSymbol = () => diceNumberToSymbol[getRandomDiceNumber()]

const getRandomDiceNumber = () => getRandomNumberBetweenInterval(1, 6)

const getRandomNumberBetweenInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min) // min and max are included

export const getRandomCollisionFreeDicePosition = (dices) => {
  const positionCandidate = {
    x: getRandomNumberBetweenInterval(0, 350),
    y: getRandomNumberBetweenInterval(0, 350),
  }
  if (detectCollision(positionCandidate, dices)) {
    return getRandomCollisionFreeDicePosition(dices)
  }
  return positionCandidate
}

export const getDiceRotation = () => getRandomNumberBetweenInterval(-35, 35)

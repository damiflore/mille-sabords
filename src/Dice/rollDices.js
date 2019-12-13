import {
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_SWORD,
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SKULL,
} from "src/symbols/symbol-types.js"
import { diceSize, detectCollision } from "../UI/dicePosition.js"

export const rollDices = (dices, { diceParentElement }) => {
  const clientRect = diceParentElement.getBoundingClientRect()
  const xMin = 0
  const xMax = clientRect.width - diceSize
  const yMin = 0
  const yMax = clientRect.height - diceSize

  dices.forEach((dice, index) => {
    rollDice({
      dice,
      index,
      dices,
      xMin,
      xMax,
      yMin,
      yMax,
    })
  })
}

const rollDice = ({ dice, index, dices, xMin, xMax, yMin, yMax }) => {
  const { x, y } = getRandomCollisionFreeDicePosition(dices.slice(0, index), {
    xMin,
    xMax,
    yMin,
    yMax,
  })
  dice.x = x
  dice.y = y
  dice.rotation = getDiceRotation()

  dice.symbol = getDiceRandomSymbol()
}

const getRandomCollisionFreeDicePosition = (dices, { xMin, xMax, yMin, yMax }) => {
  let count = 0
  const nextPosition = () => {
    const positionCandidate = {
      x: getRandomNumberBetweenInterval(xMin, xMax),
      y: getRandomNumberBetweenInterval(yMin, yMax),
    }
    if (detectCollision(positionCandidate, dices)) {
      count++
      if (count > 50) {
        // better return a collisioning position than an infinite loop
        return positionCandidate
      }
      return nextPosition()
    }
    return positionCandidate
  }
  return nextPosition()
}

const getDiceRotation = () => getRandomNumberBetweenInterval(-35, 35)

const diceNumberToSymbol = {
  1: SYMBOL_COIN,
  2: SYMBOL_DIAMOND,
  3: SYMBOL_SWORD,
  4: SYMBOL_PARROT,
  5: SYMBOL_MONKEY,
  6: SYMBOL_SKULL,
}

const getDiceRandomSymbol = () => diceNumberToSymbol[getRandomDiceNumber()]

const getRandomDiceNumber = () => getRandomNumberBetweenInterval(1, 6)

const getRandomNumberBetweenInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min) // min and max are included

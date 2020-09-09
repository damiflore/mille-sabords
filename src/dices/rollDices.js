import { getDomNodeRectangle } from "src/helper/rectangle.js"
import { diceSize, detectCollision } from "./dicePosition.js"

export const rollDices = (dices, { rolledAreaDomNode }) => {
  const rolledAreaRectangle = getDomNodeRectangle(rolledAreaDomNode)
  const rolledAreaWidth = rolledAreaRectangle.right - rolledAreaRectangle.left
  const rolledAreaHeight = rolledAreaRectangle.bottom - rolledAreaRectangle.top
  const rectangleAllowed = {
    left: 0,
    right: rolledAreaWidth - diceSize,
    top: 0,
    bottom: rolledAreaHeight - diceSize,
  }

  const dicesRolled = []
  dices.forEach((dice) => {
    const diceRolled = rollDice(dice, {
      dicesRolled,
      rectangleAllowed,
    })
    dicesRolled.push(diceRolled)
  })
  return dicesRolled
}

const rollDice = (dice, { dicesRolled, rectangleAllowed }) => {
  const rolledAreaPosition = getRandomAndCollisionFreeDicePosition(dicesRolled, rectangleAllowed)
  Object.assign(dice, {
    visibleFaceIndex: getRandomDiceFace(dice),
    rolledAreaPosition,
    rotation: getDiceRotation(),
  })
  return dice
}

const getRandomAndCollisionFreeDicePosition = (dices, { left, right, top, bottom }) => {
  let count = 0
  const nextPosition = () => {
    const positionCandidate = {
      x: getRandomNumberBetweenInterval(left, right),
      y: getRandomNumberBetweenInterval(top, bottom),
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

const getRandomDiceFace = (dice) => getRandomNumberBetweenInterval(0, dice.faces.length - 1)

const getRandomNumberBetweenInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min) // min and max are included

import { getDomNodeRectangle } from "src/helper/rectangle.js"
import {
  rotateRectangle,
  rotatedRectangleCollidesWithRotatedRectangle,
} from "src/helper/geometry.js"
import { diceSize } from "./dicePosition.js"

// margin because of rotation
const diceSpacing = diceSize / 8

export const rollDices = (dices, { rolledAreaDomNode }) => {
  const rolledAreaRectangle = getDomNodeRectangle(rolledAreaDomNode)
  const rectangleAllowed = {
    left: rolledAreaRectangle.left + diceSpacing,
    right: rolledAreaRectangle.right - (diceSize + diceSpacing),
    top: rolledAreaRectangle.top + diceSpacing,
    bottom: rolledAreaRectangle.bottom - (diceSize + diceSpacing),
  }

  const otherRotatedRectangles = []
  const getRandomAndCollisionFreeInfo = (dice) => {
    let count = 0
    const next = () => {
      const rectangleCandidate = getRandomDiceRectangle(dice, rectangleAllowed)
      const rotation = getDiceRandomRotation()
      const rotatedRectangleCandidate = rotateRectangle(rectangleCandidate, rotation)
      const someOtherDiceCollides = otherRotatedRectangles.some((otherRotatedRectangle) =>
        rotatedRectangleCollidesWithRotatedRectangle(
          rotatedRectangleCandidate,
          otherRotatedRectangle,
        ),
      )
      if (
        !someOtherDiceCollides ||
        // better return a collisioning rectangle than an infinite loop
        count > 50
      ) {
        return {
          rectangle: rectangleCandidate,
          rotation,
          rotatedRectangle: rotatedRectangleCandidate,
        }
      }
      count++
      return next()
    }
    return next()
  }

  dices.forEach((dice) => {
    dice.visibleFaceIndex = getDiceRandomFace(dice)

    const { rectangle, rotation, rotatedRectangle } = getRandomAndCollisionFreeInfo(dice)
    otherRotatedRectangles.push(rotatedRectangle)

    dice.rotation = rotation
    dice.rolledAreaPosition = rectangle[0]
  })

  return dices
}

const getRandomDiceRectangle = (dice, rectangleAllowed) => {
  const positionCandidate = {
    x: getRandomNumberBetweenInterval(rectangleAllowed.left, rectangleAllowed.right),
    y: getRandomNumberBetweenInterval(rectangleAllowed.top, rectangleAllowed.bottom),
  }

  const topLeft = {
    x: positionCandidate.x,
    y: positionCandidate.y,
  }
  const topRight = {
    x: positionCandidate.x + diceSize,
    y: positionCandidate.y,
  }
  const bottomRight = {
    x: positionCandidate.x + diceSize,
    y: positionCandidate.y + diceSize,
  }
  const bottomLeft = {
    x: positionCandidate.x,
    y: positionCandidate.y + diceSize,
  }

  const diceRectangle = [topLeft, topRight, bottomRight, bottomLeft]
  return diceRectangle
}

const getDiceRandomRotation = () => getRandomNumberBetweenInterval(-35, 35)

const getDiceRandomFace = (dice) => getRandomNumberBetweenInterval(0, dice.faces.length - 1)

const getRandomNumberBetweenInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

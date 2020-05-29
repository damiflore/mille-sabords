import { diceSize, detectCollision } from "./dicePosition.js"

export const rollDices = (dices, { diceParentElement }) => {
  const clientRect = diceParentElement.getBoundingClientRect()
  const xMin = 0
  const xMax = clientRect.width - diceSize
  const yMin = 0
  const yMax = clientRect.height - diceSize

  const dicesRolled = []
  dices.forEach((dice) => {
    const diceRolled = rollDice(dice, {
      dicesRolled,
      xMin,
      xMax,
      yMin,
      yMax,
    })
    Object.assign(dice, diceRolled)
    dicesRolled.push(dice.id)
  })
  return dicesRolled
}

const rollDice = (dice, { dicesRolled, xMin, xMax, yMin, yMax }) => {
  const { x, y } = getRandomCollisionFreeDicePosition(dicesRolled, {
    xMin,
    xMax,
    yMin,
    yMax,
  })
  return {
    ...dice,
    visibleFaceIndex: getRandomDiceFace(dice),
    x,
    y,
    rotation: getDiceRotation(),
  }
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

const getRandomDiceFace = (dice) => getRandomNumberBetweenInterval(0, dice.faces.length - 1)

const getRandomNumberBetweenInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min) // min and max are included

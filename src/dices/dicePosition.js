import { rectangleCollides } from "src/helper/rectangle.js"

export const diceSize = 50

// margin because of rotation
const diceSpacing = diceSize / 8

export const detectCollision = (dicePosition, diceArray) => {
  return diceArray.some((otherDice) => {
    return rectangleCollides(
      {
        top: dicePosition.y - diceSpacing,
        left: dicePosition.x - diceSpacing,
        bottom: dicePosition.y + diceSize + diceSpacing,
        right: dicePosition.x + diceSize + diceSpacing,
      },
      {
        top: otherDice.y - diceSpacing,
        left: otherDice.x - diceSpacing,
        bottom: otherDice.y + diceSize + diceSpacing,
        right: otherDice.x + diceSize + diceSpacing,
      },
    )
  })
}

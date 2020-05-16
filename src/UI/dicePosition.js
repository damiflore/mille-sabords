export const diceSize = 50

// margin because of rotation
const diceSpacing = diceSize / 8

export const detectCollision = (dicePosition, diceArray) => {
  return diceArray.some((otherDice) => {
    return rectCollides(
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

const rectCollides = (firstRect, secondRect) => {
  // first left of second
  if (firstRect.right <= secondRect.left) return false
  // first right of second
  if (firstRect.left >= secondRect.right) return false
  // first above second
  if (firstRect.bottom <= secondRect.top) return false
  //  first below second
  if (firstRect.top >= secondRect.bottom) return false
  return true
}

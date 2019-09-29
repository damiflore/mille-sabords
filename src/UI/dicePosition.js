export const diceSize = 40
export const areaWidth = 400

export const detectCollision = (dicePosition, diceArray) => {
  return diceArray.some((otherDice) => {
    if (otherDice.position.x === 0 && otherDice.position.y === 0) return false

    // margin because of rotation
    const margin = diceSize / 8

    return rectCollides(
      {
        top: dicePosition.y - margin,
        left: dicePosition.x - margin,
        bottom: dicePosition.y + diceSize + margin,
        right: dicePosition.x + diceSize + margin,
      },
      {
        top: otherDice.position.y - margin,
        left: otherDice.position.x - margin,
        bottom: otherDice.position.y + diceSize + margin,
        right: otherDice.position.x + diceSize + margin,
      },
    )
  })
}

export const rectCollides = (firstRect, secondRect) => {
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

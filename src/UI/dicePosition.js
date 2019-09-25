export const diceWidth = 40
export const areaWidth = 400

export const detectCollision = (dicePosition, diceArray) => {
  //   console.log("dice position X", dicePosition.x)
  // console.log("diceArray", diceArray)
  let collision = false
  diceArray.forEach((otherDice) => {
    // console.log("otherDice X", otherDice.position.x)
    if (otherDice.position.x === 0 && otherDice.position.y === 0) return collision
    const condition1 =
      dicePosition.x > otherDice.position.x &&
      dicePosition.x < otherDice.position.x + diceWidth &&
      dicePosition.y > otherDice.position.y &&
      dicePosition.y < otherDice.position.y + diceWidth

    const condition2 =
      otherDice.position.x > dicePosition.x &&
      otherDice.position.x < dicePosition.x + diceWidth &&
      otherDice.position.y > dicePosition.y &&
      otherDice.position.y < dicePosition.y + diceWidth

    const condition3 =
      dicePosition.x + diceWidth > otherDice.position.x &&
      dicePosition.x + diceWidth < otherDice.position.x + diceWidth &&
      dicePosition.y + diceWidth > otherDice.position.y &&
      dicePosition.y + diceWidth < otherDice.position.y + diceWidth

    const condition4 =
      otherDice.position.x + diceWidth > dicePosition.x &&
      otherDice.position.x + diceWidth < dicePosition.x + diceWidth &&
      otherDice.position.y + diceWidth > dicePosition.y &&
      otherDice.position.y + diceWidth < dicePosition.y + diceWidth

    if (condition1 || condition2 || condition3 || condition4) {
      console.log(condition1)
      console.log(condition2)
      console.log(condition3)
      console.log(condition4)
      //   console.log("Collision index: ", index)
      //   console.log("dicePosition.x", dicePosition.x)
      //   console.log("otherDice.position.x", otherDice.position.x)
      //   console.log("otherDice.position.x + diceWidth", otherDice.position.x + diceWidth)
      collision = true
    }
    return collision
  })
  return collision
}

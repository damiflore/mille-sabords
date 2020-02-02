import React from "react"
import ReactDOM from "react-dom"

export const createMilleSabordGame = async ({ into }) => {
  const [{ MilleSabordGameBoard }, { getDiceArray }] = await Promise.all([
    import("./MilleSabordGameBoard.js"),
    import("./Dice/DiceHelpers.js"),
  ])

  const diceArray = getDiceArray()

  ReactDOM.render(<MilleSabordGameBoard diceArray={diceArray} />, into)
}

import React from "react"
import ReactDOM from "react-dom"
import { MilleSabordGameBoard } from "./MilleSabordGameBoard.js"
import { getDiceArray } from "./Dice/DiceHelpers.js"

export const createMilleSabordGame = ({ into }) => {
  const diceArray = getDiceArray()

  ReactDOM.render(<MilleSabordGameBoard diceArray={diceArray} />, into)
}

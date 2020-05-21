import React from "react"
import ReactDOM from "react-dom"

export const createMilleSabordGame = async ({ into, initialState = {} }) => {
  const { MilleSabordGameBoard } = await import("./MilleSabordGameBoard.js")

  ReactDOM.render(<MilleSabordGameBoard initialState={initialState} />, into)
}

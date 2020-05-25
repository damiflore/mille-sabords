import React from "react"
import ReactDOM from "react-dom"

export const createMilleSabordGame = async ({ into, gameState = {} }) => {
  const { MilleSabordGame } = await import("./MilleSabordGame.js")

  ReactDOM.render(<MilleSabordGame gameState={gameState} />, into)
}

import React from "react"
import ReactDOM from "react-dom"

export const createMilleSabordGame = async ({ into, gameState = {} }) => {
  const { Game } = await import("./game.component.js")

  ReactDOM.render(<Game gameState={gameState} />, into)
}

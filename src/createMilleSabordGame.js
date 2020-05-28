import React from "react"
import ReactDOM from "react-dom"

import { GameContextProvider } from "src/game.context.js"

export const createMilleSabordGame = async ({ into }) => {
  const { Game } = await import("./game.component.js")

  ReactDOM.render(
    <GameContextProvider>
      <Game />
    </GameContextProvider>,
    into,
  )
}

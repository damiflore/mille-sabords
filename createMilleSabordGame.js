import React from "react"
import ReactDOM from "react-dom"

import { GameContextProvider } from "src/GameContextProvider.js"

export const createMilleSabordGame = async ({ into }) => {
  const { Game } = await import("./src/game.component.js")

  ReactDOM.render(
    <GameContextProvider>
      <Game />
    </GameContextProvider>,
    into,
  )
}

import React from "react"

import { GameContextProvider } from "src/game.store.js"
import { CARD_COIN, SYMBOL_SKULL } from "src/constants.js"
import { createDeck } from "src/Cards/cards.js"
import { Game } from "src/game.component.js"

const link = document.createElement("link")
link.rel = "stylesheet"
link.type = "text/css"
link.href = "/lab/lab.css"
document.head.appendChild(link)

export const Lab = () => {
  const gameState = {
    cardDeck: createDeck({ [CARD_COIN]: 1 }),
    diceCursed: [
      { id: 100, symbol: SYMBOL_SKULL },
      { id: 101, symbol: SYMBOL_SKULL },
    ],
  }

  return (
    <div id="lab">
      <GameContextProvider initialState={gameState}>
        <GameLab />
        <Game gameState={gameState} />
      </GameContextProvider>
    </div>
  )
}

const GameLab = () => {
  return (
    <aside>
      <button
        onClick={() => {
          sessionStorage.clear()
        }}
      >
        Clear storage
      </button>
    </aside>
  )
}

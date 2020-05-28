import React from "react"

import { GameContextProvider, useGameState, useGameDispatch } from "src/game.store.js"
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
        <Game />
      </GameContextProvider>
    </div>
  )
}

const GameLab = () => {
  const state = useGameState()
  const { totalScore } = state
  const setTotalScore = useSetTotalScore()

  return (
    <aside>
      <button
        onClick={() => {
          sessionStorage.clear()
        }}
      >
        Clear storage
      </button>
      <form
        onSubmit={(submitEvent) => {
          submitEvent.preventDefault()
          setTotalScore(parseInt(document.querySelector("form").totalScore.value))
        }}
      >
        <input type="number" name="totalScore" defaultValue={totalScore} onChange={() => {}} />
        <button type="submit">set total score</button>
      </form>
    </aside>
  )
}

const useSetTotalScore = () => {
  const dispatch = useGameDispatch()
  return (totalScore) => {
    dispatch((state) => {
      return { ...state, totalScore }
    })
  }
}

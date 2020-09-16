import React from "react"
import { createAction } from "src/main.store.js"

export const Home = () => {
  return (
    <div>
      <ButtonNewGame />
    </div>
  )
}

const ButtonNewGame = () => {
  const startNewGame = useStartNewGame()

  return <button onClick={startNewGame}>Nouvelle partie</button>
}

const useStartNewGame = createAction((state) => {
  return {
    ...state,
    gameStarted: true,
  }
})

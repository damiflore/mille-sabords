import React from "react"
import { createAction } from "src/main.store.js"
import { symbolSwordUrl } from "src/symbols/symbols.js"

export const Home = () => {
  return <ButtonNewGame />
}

const ButtonNewGame = () => {
  const createNewGame = useCreateNewGame()

  return (
    <div className="new-game">
      <img src={symbolSwordUrl} />
      <button onClick={createNewGame}>Nouvelle partie</button>
    </div>
  )
}

const useCreateNewGame = createAction((state) => {
  return {
    ...state,
    gameCreated: true,
  }
})

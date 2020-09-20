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
  const createNewGame = useCreateNewGame()

  return <button onClick={createNewGame}>Nouvelle partie</button>
}

const useCreateNewGame = createAction((state) => {
  return {
    ...state,
    gameCreated: true,
  }
})

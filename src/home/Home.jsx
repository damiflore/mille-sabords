import React from "react"
import { createAction } from "src/main.store.js"

export const Home = () => {
  return <ButtonNewGame />
}

const ButtonNewGame = () => {
  const createNewGame = useCreateNewGame()

  return (
    <div className="new-game">
      <img src={`src/dices/dice_sword.png`} />
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

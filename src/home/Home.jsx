import React from "react"
import { Image } from "src/generic/Image.jsx"
import { createAction } from "src/main.store.js"
import { symbolSwordUrl } from "src/symbols/symbols.js"

export const Home = () => {
  return <ButtonNewGame />
}

const ButtonNewGame = () => {
  const createNewGame = useCreateNewGame()

  return (
    <div className="new-game">
      <Image src={symbolSwordUrl} />
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

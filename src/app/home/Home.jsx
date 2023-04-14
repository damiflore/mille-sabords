import React from "react"

import { Image } from "/app/generic/Image.jsx"
import { createAction } from "/app/main.store.js"
import { symbolSwordUrl } from "/app/symbols/symbols.js"

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

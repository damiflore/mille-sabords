import React from "react"
import { createAction } from "src/main.store.js"

export const GameConfiguration = () => {
  const setPlayerCount = useSetPlayerCount()

  return (
    <div>
      <p>Combien de joueur?</p>
      {[1, 2, 3, 4, 5].map((playerCount) => {
        return (
          <button
            key={playerCount}
            onClick={() => {
              setPlayerCount(playerCount)
            }}
          >
            {playerCount === 1 ? "1 joueur" : `${playerCount} joueurs`}
          </button>
        )
      })}
    </div>
  )
}

const useSetPlayerCount = createAction((state, playerCount) => {
  return {
    ...state,
    players: new Array(playerCount).fill("").map((_, index) => {
      return {
        id: index + 1,
        number: index + 1,
        score: 0,
      }
    }),
  }
})

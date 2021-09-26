import React from "react"

import { createAction } from "root/src/app/main.store.js"

export const GameConfiguration = () => {
  const setPlayerCount = useSetPlayerCount()

  return (
    <div className="game-configuration">
      <div className="background-image" />
      <div className="content">
        <div className="title">A l’abordage !</div>
        <div className="subtitle">
          Combien de joueurs participent à l’aventure ?
        </div>
        <div className="buttons">
          {[1, 2, 3, 4, 5].map((playerCount) => {
            return (
              <button
                key={playerCount}
                onClick={() => {
                  setPlayerCount(playerCount)
                }}
              >
                {playerCount}
              </button>
            )
          })}
        </div>
      </div>
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

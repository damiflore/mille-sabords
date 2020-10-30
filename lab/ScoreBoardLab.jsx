import React from "react"

import { createAction, usePlayers, useCurrentPlayerId } from "src/main.store.js"

export const ScoreBoardLab = () => {
  const players = usePlayers()
  const currentPlayerId = useCurrentPlayerId()
  const setPlayerScore = useSetPlayerScore()
  const setAsCurrentPlayer = useSetAsCurrentPlayer()

  return (
    <>
      <form
        onSubmit={(submitEvent) => {
          submitEvent.preventDefault()
        }}
      >
        {players.map((player) => {
          const isCurrentPlayer = currentPlayerId === player.id
          return (
            <>
              <fieldset key={player.id}>
                <legend>{`${player.character.name}`}</legend>
                {[0, 3000, 5900].map((score) => {
                  return (
                    <button
                      key={score}
                      onClick={() => {
                        // TODO: remplacer avec un truc qui ajouter/enleve X
                        // au score du joueur, ce qui fait aussi l'animation
                        // en gros ça doit reproduire l'effet du joueur qui
                        // vient de terminer son tour et marque X points
                        // pour ça il faut pouvoir dire que le round est over depuis l'extérieur
                        // hors cela est caché dans Game.jsx
                        // ou alor pouvoir controller le scoreboard directement en lui
                        // passant le roundOverPayload que l'on veut
                        setPlayerScore(player, score)
                      }}
                    >
                      Set score to {score}
                    </button>
                  )
                })}
                <button
                  disabled={isCurrentPlayer}
                  onClick={() => {
                    setAsCurrentPlayer(player)
                  }}
                >
                  {isCurrentPlayer ? "current player" : "set as current player"}
                </button>
              </fieldset>
            </>
          )
        })}
      </form>
    </>
  )
}

const useSetPlayerScore = createAction((state, player, score) => {
  const { players } = state
  player.score = score
  return {
    ...state,
    players: [...players],
  }
})

const useSetAsCurrentPlayer = createAction((state, player) => {
  return {
    ...state,
    currentPlayerId: player.id,
  }
})

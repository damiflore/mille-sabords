import React from "react"

import {
  createAction,
  usePlayers,
  useCurrentPlayerId,
} from "/app/main.store.js"

export const ScoreBoardLab = ({ playerAnimationEmitter }) => {
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
            <fieldset key={player.id}>
              <legend>{`${player.character.name}`}</legend>
              <button
                onClick={() => {
                  const fromScore = player.score
                  const toScore = fromScore + 1000
                  setPlayerScore(player, toScore)
                  playerAnimationEmitter({
                    player,
                    score: {
                      from: fromScore,
                      to: toScore,
                    },
                    roundOverReason: "user-collect",
                    symbolsInChest: [
                      "diamond",
                      "coin",
                      "sword",
                      "sword",
                      "sword",
                      "monkey",
                      "coin",
                    ],
                  })
                }}
              >
                Score +1000
              </button>
              <button
                onClick={() => {
                  const fromScore = player.score
                  const toScore = fromScore - 1000
                  setPlayerScore(player, toScore)
                  playerAnimationEmitter({
                    player,
                    score: {
                      from: fromScore,
                      to: toScore,
                    },
                    roundOverReason: "user-collect",
                  })
                }}
              >
                Score -1000
              </button>
              <button
                onClick={() => {
                  const fromScore = player.score
                  const toScore = fromScore
                  setPlayerScore(player, toScore)
                  playerAnimationEmitter({
                    player,
                    score: {
                      from: fromScore,
                      to: toScore,
                    },
                    roundOverReason: "3-skulls",
                  })
                }}
              >
                3 Skulls
              </button>
              <button
                disabled={isCurrentPlayer}
                onClick={() => {
                  setAsCurrentPlayer(player)
                }}
              >
                {isCurrentPlayer ? "current player" : "set as current player"}
              </button>
            </fieldset>
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

import React from "react"
import { usePlayers, createAction, useGameStarted, useRoundStarted } from "src/main.store.js"
import { Round } from "src/round/Round.jsx"
import { ScoreBoard } from "src/score-board/ScoreBoard.jsx"
import { CharacterSelection } from "src/game/CharacterSelection.jsx"

export const Game = () => {
  const players = usePlayers()
  const roundStarted = useRoundStarted()
  const gameStarted = useGameStarted()
  const needsToChooseNumberOfPlayers = players.length === 0
  const [scoreboardOpenedByUser, scoreboardOpenedByUserSetter] = React.useState(false)
  const [scoreAnimation, scoreAnimationSetter] = React.useState(null)

  if (needsToChooseNumberOfPlayers) {
    return <PlayerCountSelection />
  }

  if (!gameStarted) {
    return <CharacterSelection players={players} />
  }

  if (!roundStarted || scoreboardOpenedByUser) {
    return (
      <ScoreBoard
        openedByUser={scoreboardOpenedByUser}
        closeScoreboard={() => {
          scoreboardOpenedByUserSetter(false)
        }}
        scoreAnimation={scoreAnimation}
      />
    )
  }

  return (
    <Round
      openScoreboard={() => {
        scoreboardOpenedByUserSetter(true)
      }}
      onRoundOver={(roundOverPayload) => {
        if (roundOverPayload.reason === "score-marked") {
          scoreAnimationSetter({
            newScore: roundOverPayload.value,
            onfinish: () => {
              scoreAnimationSetter(null)
            },
          })
        } else {
          scoreAnimationSetter(null)
        }
      }}
    />
  )
}

const PlayerCountSelection = () => {
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

export const useStartPlaying = createAction((state, player) => {
  return {
    ...state,
    currentPlayerId: player.id,
    currentCardId: null,
  }
})

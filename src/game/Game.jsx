import React from "react"
import { usePlayers, createAction, useScoreBoardOpened, useGameStarted } from "src/main.store.js"
import { Round } from "src/round/Round.jsx"
import { ScoreBoard } from "src/score-board/ScoreBoard.jsx"
import { CharacterSelection } from "src/game/CharacterSelection.jsx"

export const Game = () => {
  const players = usePlayers()
  const scoreBoardOpened = useScoreBoardOpened()
  const gameStarted = useGameStarted()
  const needsToChooseNumberOfPlayers = players.length === 0

  if (needsToChooseNumberOfPlayers) {
    return <PlayerCountSelection />
  }

  const playerWithoutCharacter = players.find((player) => !player.character)
  if (!gameStarted) {
    return <CharacterSelection player={playerWithoutCharacter} players={players} />
  }

  if (scoreBoardOpened) {
    return <ScoreBoard />
  }

  return <Round />
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
  }
})

export const useOpenScoreBoard = createAction((state) => {
  return {
    ...state,
    scoreBoardOpened: true,
  }
})

export const useCloseScoreBoard = createAction((state) => {
  return {
    ...state,
    scoreBoardOpened: false,
  }
})

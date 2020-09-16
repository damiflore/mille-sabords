import React from "react"
import { usePlayers, useCurrentPlayerId, createAction } from "src/main.store.js"
import { Round } from "src/round/Round.jsx"
import { CHARACTERS } from "src/players/players.main.js"

export const Game = () => {
  const players = usePlayers()
  const currentPlayerId = useCurrentPlayerId()
  const needsToChooseNumberOfPlayers = players.length === 0

  if (needsToChooseNumberOfPlayers) {
    return <PlayerCountSelection />
  }

  const playerWithoutCharacter = players.find((player) => !player.character)
  if (playerWithoutCharacter) {
    return <CharacterSelection player={playerWithoutCharacter} players={players} />
  }

  if (!currentPlayerId) {
    return <StartGameScreen />
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

const CharacterSelection = ({ player, players }) => {
  const setPlayerCharacter = useSetPlayerCharacter()

  return (
    <div>
      <p>Choisissez un personnage pour le joueur {player.number}</p>
      {CHARACTERS.map((character) => {
        return (
          <button
            key={character.id}
            disabled={!characterIsAvailable(character, players)}
            onClick={() => {
              setPlayerCharacter(player, character)
            }}
          >
            {character.name}
          </button>
        )
      })}
    </div>
  )
}

const characterIsAvailable = (character, players) => {
  return !players.some((player) => player.character === character)
}

const useSetPlayerCharacter = createAction((state, player, character) => {
  const { players } = state
  player.character = character
  return {
    ...state,
    players: [...players],
  }
})

const StartGameScreen = () => {
  const players = usePlayers()
  const startPlaying = useStartPlaying()

  return (
    <div>
      <p>L&apos;équipage est au complet</p>
      <ul>
        {players.map((player) => {
          console.log(player.id)
          return (
            <li key={player.id}>
              {player.character.name} (Joueur {player.number})
            </li>
          )
        })}
      </ul>
      <button onClick={startPlaying}>Démarrer la partie</button>
    </div>
  )
}

const useStartPlaying = createAction((state) => {
  const { players } = state
  return {
    ...state,
    currentPlayerId: players[0].id,
  }
})

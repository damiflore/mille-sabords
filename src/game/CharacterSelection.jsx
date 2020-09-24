import React from "react"
import { CHARACTERS } from "src/players/players.main.js"
import { usePlayers, createAction } from "src/main.store.js"
import { useOpenScoreBoard } from "src/game/Game.jsx"

const CrewMembers = () => {
  const players = usePlayers()

  return (
    <div className="crew">
      <p>L&apos;équipage:</p>
      <ul>
        {players.map((player) => {
          return (
            <li key={player.id}>
              {player.character ? (
                <img
                  className="crew-member-img"
                  src={`src/score-board/${player.character && player.character.img}`}
                  alt="player"
                  style={{
                    border: `4px solid ${(player.character && player.character.color) || "black"}`,
                  }}
                />
              ) : (
                <div className="placeholder-img"></div>
              )}
              <span>{player.character ? player.character.name : `Joueur${player.number}`}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const useStartGame = createAction((state) => {
  return {
    ...state,
    gameStarted: true,
  }
})

export const CharacterSelection = ({ player, players }) => {
  const setPlayerCharacter = useSetPlayerCharacter()
  const openScoreBoard = useOpenScoreBoard()
  const startGame = useStartGame()
  const playerWithoutCharacter = players.find((player) => !player.character)

  return (
    <div className="character-selection-page">
      <CrewMembers />
      {playerWithoutCharacter && (
        <div className="characters">
          <p>Joueur {player.number} : quel pirate êtes vous ?</p>
          {CHARACTERS.map((character) => {
            return (
              <div
                className={`character ${
                  characterIsAvailable(character, players) ? "" : "disabled"
                }`}
                key={character.id}
                onClick={() => {
                  setPlayerCharacter(player, character)
                }}
              >
                <img
                  className="character-img"
                  src={`src/score-board/${character && character.img}`}
                  alt="player"
                  style={{
                    border: `4px solid ${(character && character.color) || "black"}`,
                  }}
                />
                <span>{character.name}</span>
              </div>
            )
          })}
        </div>
      )}

      {!playerWithoutCharacter && (
        <div className="crew-completed">
          <p>Votre équipage est au complet !</p>
          <button
            onClick={() => {
              openScoreBoard()
              startGame()
            }}
          >
            Démarrer la partie
          </button>
        </div>
      )}
    </div>
  )
}

const characterIsAvailable = (character, players) => {
  return !players.some((player) => player.character && player.character.name === character.name)
}

const useSetPlayerCharacter = createAction((state, player, character) => {
  const { players } = state
  player.character = character
  return {
    ...state,
    players: [...players],
  }
})

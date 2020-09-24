import React from "react"
import { CHARACTERS } from "src/players/players.main.js"
import { usePlayers, createAction } from "src/main.store.js"
import { mixDeck } from "src/cards/cards.js"

export const CharacterSelection = ({ players }) => {
  const setPlayerCharacter = useSetPlayerCharacter()
  const startGame = useStartGame()
  const playerWithoutCharacter = players.find((player) => !player.character)

  return (
    <div className="character-selection-page">
      <CrewMembers />
      {playerWithoutCharacter && (
        <>
          <p>Joueur {playerWithoutCharacter.number} : quel pirate êtes vous ?</p>
          <div className="characters-container">
            <div className="characters">
              {CHARACTERS.map((character) => {
                return (
                  <div
                    className={`character ${
                      characterIsAvailable(character, players) ? "" : "disabled"
                    }`}
                    key={character.id}
                    onClick={() => {
                      setPlayerCharacter(playerWithoutCharacter, character)
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
          </div>
        </>
      )}

      {!playerWithoutCharacter && (
        <div className="crew-completed">
          <p>L&lsquo;équipage est au complet !</p>
          <img src={`src/cards/card_small-sword-challenge.png`} />
          <button
            onClick={() => {
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

const CrewMembers = () => {
  const players = usePlayers()

  return (
    <div className={`crew ${players.length > 3 ? "large-crew" : ""}`}>
      <p>Votre équipage:</p>
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
  const { cardIds } = state
  return {
    ...state,
    gameStarted: true,
    cardIds: mixDeck(cardIds),
  }
})

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

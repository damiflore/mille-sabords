import React from "react"
import { createAction } from "src/main.store.js"
import { CHARACTERS } from "src/players/players.main.js"

export const CharacterSelection = ({ player, players }) => {
  const setPlayerCharacter = useSetPlayerCharacter()

  return (
    <div className="character-selection-page">
      <p>Joueur {player.number} : quel pirate êtes vous ?</p>
      <div className="characters">
        {CHARACTERS.map((character) => {
          return (
            <div
              className={`character ${characterIsAvailable(character, players) ? "" : "disabled"}`}
              key={character.id}
              disabled={!characterIsAvailable(character, players)}
              onClick={() => {
                setPlayerCharacter(player, character)
              }}
            >
              <img
                className="player-img"
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

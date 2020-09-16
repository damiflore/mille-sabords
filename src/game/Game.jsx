import React from "react"
import { usePlayers } from "src/main.store.js"
import { Round } from "src/round/Round.jsx"

export const Game = () => {
  const players = usePlayers()
  const needsToChooseNumberOfPlayers = players.length === 0

  if (needsToChooseNumberOfPlayers) {
    return (
      <div>
        Select number of players:
        <br />
        (TODO: put input type radio with 1,2,3,4,5)
      </div>
    )
  }

  const playerWithoutCharacter = players.find((player) => !player.character)
  if (playerWithoutCharacter) {
    return (
      <div>
        {playerWithoutCharacter.name} needs to choose a character:
        <br />
        (TODO: input type radio with characters. The one already choosen by other players are
        disabled)
      </div>
    )
  }

  return <Round />
}

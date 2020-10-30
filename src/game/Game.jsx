import React from "react"
import { usePlayers, useGameStarted, useRoundStarted } from "src/main.store.js"
import { Round } from "src/round/Round.jsx"
import { ScoreBoard } from "src/score-board/ScoreBoard.jsx"
import { GameConfiguration } from "src/game/GameConfiguration.jsx"
import { CharacterSelection } from "src/game/CharacterSelection.jsx"

export const Game = () => {
  const players = usePlayers()
  const roundStarted = useRoundStarted()
  const isOnGameConfigurationScreen = useisOnGameConfigurationScreen()
  const isOnCharacterSelectionScreen = useIsOnCharacterSelectionScreen()

  const [scoreboardOpenedByUser, scoreboardOpenedByUserSetter] = React.useState(false)
  const [roundOverPayload, roundOverPayloadSetter] = React.useState(null)

  const isOnScoreboardScreen = !roundStarted || scoreboardOpenedByUser

  if (isOnGameConfigurationScreen) {
    return <GameConfiguration />
  }

  if (isOnCharacterSelectionScreen) {
    return <CharacterSelection players={players} />
  }

  if (isOnScoreboardScreen) {
    return (
      <ScoreBoard
        openedByUser={scoreboardOpenedByUser}
        closeScoreboard={() => {
          scoreboardOpenedByUserSetter(false)
        }}
        roundOverPayload={roundOverPayload}
      />
    )
  }

  return (
    <Round
      openScoreboard={() => {
        scoreboardOpenedByUserSetter(true)
      }}
      onRoundStart={() => {
        roundOverPayloadSetter(null)
      }}
      onRoundOver={(roundOverPayload) => {
        roundOverPayloadSetter(roundOverPayload)
      }}
    />
  )
}

export const useisOnGameConfigurationScreen = () => {
  const players = usePlayers()
  const needsToChooseNumberOfPlayers = players.length === 0
  return needsToChooseNumberOfPlayers
}

export const useIsOnCharacterSelectionScreen = () => {
  const gameStarted = useGameStarted()
  return !gameStarted
}

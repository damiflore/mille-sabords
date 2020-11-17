import React from "react"
import { usePlayers, useGameStarted, useRoundStarted, useCurrentPlayerId } from "src/main.store.js"
import { Round } from "src/round/Round.jsx"
import { ScoreBoard } from "src/score-board/ScoreBoard.jsx"
import { GameConfiguration } from "src/game/GameConfiguration.jsx"
import { CharacterSelection } from "src/game/CharacterSelection.jsx"

export const Game = ({ playerAnimationListener }) => {
  const players = usePlayers()
  const currentPlayerId = useCurrentPlayerId()
  const roundStarted = useRoundStarted()
  const isOnGameConfigurationScreen = useIsOnGameConfigurationScreen()
  const isOnCharacterSelectionScreen = useIsOnCharacterSelectionScreen()

  const [scoreboardOpenedByUser, scoreboardOpenedByUserSetter] = React.useState(false)
  const [roundOverPayload, roundOverPayloadSetter] = React.useState(null)
  const [playerAnimation, playerAnimationSetter] = React.useState(null)

  const isOnScoreboardScreen = !roundStarted || scoreboardOpenedByUser

  React.useEffect(() => {
    if (roundOverPayload && roundOverPayload.reason === "score-marked") {
      const player = players.find((player) => player.id === currentPlayerId)
      const roundScore = roundOverPayload.value
      const fromScore = player.score - roundScore
      playerAnimationSetter({
        player,
        score: {
          from: fromScore < 0 ? 0 : fromScore,
          to: player.score,
        },
      })
    } else {
      playerAnimationSetter(null)
    }
  }, [roundOverPayload, currentPlayerId])
  React.useEffect(() => {
    if (playerAnimationListener) {
      return playerAnimationListener(playerAnimationSetter)
    }
    return undefined
  }, [playerAnimationListener])

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
        playerAnimation={playerAnimation}
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

export const useIsOnGameConfigurationScreen = () => {
  const players = usePlayers()
  const needsToChooseNumberOfPlayers = players.length === 0
  return needsToChooseNumberOfPlayers
}

export const useIsOnCharacterSelectionScreen = () => {
  const gameStarted = useGameStarted()
  return !gameStarted
}

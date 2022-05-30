import React from "react"

import {
  usePlayers,
  useGameStarted,
  useRoundStarted,
  useCurrentPlayerId,
} from "/src/app/main.store.js"
import { Round } from "/src/app/round/Round.jsx"
import { ScoreBoard } from "/src/app/score-board/ScoreBoard.jsx"
import { GameConfiguration } from "/src/app/game/GameConfiguration.jsx"
import { CharacterSelection } from "/src/app/game/CharacterSelection.jsx"

export const Game = ({ playerAnimationListener }) => {
  const players = usePlayers()
  const currentPlayerId = useCurrentPlayerId()
  const roundStarted = useRoundStarted()
  const isOnGameConfigurationScreen = useIsOnGameConfigurationScreen()
  const isOnCharacterSelectionScreen = useIsOnCharacterSelectionScreen()

  const [scoreboardOpenedByUser, scoreboardOpenedByUserSetter] =
    React.useState(false)
  const [roundOverPayload, roundOverPayloadSetter] = React.useState(null)
  const [playerAnimation, playerAnimationSetter] = React.useState(null)

  const isOnScoreboardScreen = !roundStarted || scoreboardOpenedByUser

  const player = players.find((player) => player.id === currentPlayerId)
  const playerScoreWhenRoundStartedRef = React.useRef(null)

  React.useEffect(() => {
    if (roundOverPayload) {
      playerAnimationSetter({
        player,
        score: {
          from: playerScoreWhenRoundStartedRef.current,
          to: player.score,
        },
        roundOverReason: roundOverPayload.reason,
        symbolsInChest: roundOverPayload.symbolsInChest,
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
        playerScoreWhenRoundStartedRef.current = player.score
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

import React from "react"
import {
  usePlayers,
  createAction,
  useGameStarted,
  useRoundStarted,
  useCurrentPlayerGettingReady,
} from "src/main.store.js"
import { Round } from "src/round/Round.jsx"
import { ScoreBoard } from "src/score-board/ScoreBoard.jsx"
import { GameConfiguration } from "src/game/GameConfiguration.jsx"
import { CharacterSelection } from "src/game/CharacterSelection.jsx"

import { DrawCardDialog } from "src/footer/DrawCardDialog.jsx"
import { useCurrentPlayer } from "src/round/round.selectors.js"

export const Game = () => {
  const players = usePlayers()
  const roundStarted = useRoundStarted()

  const currentPlayerGettingReady = useCurrentPlayerGettingReady()

  const isOnGameConfigurationScreen = useisOnGameConfigurationScreen()
  const isOnCharacterSelectionScreen = useIsOnCharacterSelectionScreen()

  const [scoreboardOpenedByUser, scoreboardOpenedByUserSetter] = React.useState(false)
  const [roundOverPayload, roundOverPayloadSetter] = React.useState(null)

  // dialogue drawCardDialog
  const currentPlayer = useCurrentPlayer()
  const isDrawCardDialogOpen = currentPlayer && currentPlayerGettingReady
  const [drawCardDialogIsOpen, drawCardDialogIsOpenSetter] = React.useState(isDrawCardDialogOpen)
  const openDrawCardDialog = () => {
    drawCardDialogIsOpenSetter(true)
  }
  const closeDrawCardDialog = () => {
    drawCardDialogIsOpenSetter(false)
  }

  if (isOnGameConfigurationScreen) {
    return <GameConfiguration />
  }

  if (isOnCharacterSelectionScreen) {
    return <CharacterSelection players={players} />
  }

  if ((!roundStarted || scoreboardOpenedByUser) && !currentPlayerGettingReady) {
    return (
      <ScoreBoard
        openedByUser={scoreboardOpenedByUser}
        closeScoreboard={() => {
          scoreboardOpenedByUserSetter(false)
        }}
        roundOverPayload={roundOverPayload}
        openDrawCardDialog={openDrawCardDialog}
      />
    )
  }

  return (
    <>
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
      <DrawCardDialog dialogIsOpen={drawCardDialogIsOpen} closeDialog={closeDrawCardDialog} />
    </>
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

export const useStartPlaying = createAction((state, player) => {
  return {
    ...state,
    currentPlayerId: player.id,
    currentCardId: null,
  }
})

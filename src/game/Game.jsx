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
import { CharacterSelection } from "src/game/CharacterSelection.jsx"

import { DrawCardDialog } from "src/footer/DrawCardDialog.jsx"
import { useCurrentPlayer } from "src/round/round.selectors.js"

export const Game = () => {
  const players = usePlayers()
  const roundStarted = useRoundStarted()
  const gameStarted = useGameStarted()
  const currentPlayerGettingReady = useCurrentPlayerGettingReady()

  const needsToChooseNumberOfPlayers = players.length === 0
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

  if (needsToChooseNumberOfPlayers) {
    return <PlayerCountSelection />
  }

  if (!gameStarted) {
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
    currentCardId: null,
  }
})

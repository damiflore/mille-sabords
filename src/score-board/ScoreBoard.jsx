import React from "react"
import {
  usePlayers,
  useRoundStarted,
  useCurrentPlayerGettingReady,
  createAction,
} from "src/main.store.js"
import { useCurrentPlayer } from "src/round/round.selectors.js"
import { useCloseScoreBoard, useStartPlaying } from "src/game/Game.jsx"
import { Dialog } from "src/dialog/Dialog.jsx"
import { DrawCardDialog } from "src/footer/DrawCardDialog.jsx"

const pathList = {
  path1:
    "M39.582,739.564c0-91.824,39.191-96.32,38.045-166.691s-30.042-70.37-47.326-161.729s38.128-86.388,31.276-186.42C55.405,134.602-3.014,89.176,8.812,129.825c5.333,18.333,30.77-21,30.77-129.825",
  path2:
    "M39.582,739.564c0-113.074-5.437-166.074-8.437-198.074s36-20.667,33.019-2c-1.796,11.248-24.583,13.333-23.699-22c1.229-49.158,22.68-111,23.68-169s-38-95-46-181S39.582,0,39.582,0",
  path3:
    "M39.582,739.564c0-71.926-15.437-155.074-17.437-253.074s30-185,31.087-217s-31.087-46-31.087-26s33,10,31-32s-31-110-31-144S39.582,0,39.582,0",
}

const StartPlayerRoundDialog = ({ openDrawCardDialog, closeDialog, dialogIsOpen, player }) => {
  const startPlaying = useStartPlaying()
  const setCurrentPlayerGettingReady = useSetCurrentPlayerGettingReady()
  return (
    <Dialog isOpen={dialogIsOpen} onRequestClose={closeDialog} requestCloseOnClickOutside={true}>
      <div>Au tour de {player.character.name}</div>
      <button
        onClick={() => {
          closeDialog()
          setCurrentPlayerGettingReady()
          startPlaying(player)
          openDrawCardDialog()
        }}
      >
        Jouer
      </button>
    </Dialog>
  )
}

export const ScoreBoard = () => {
  const players = usePlayers()
  const currentPlayer = useCurrentPlayer()
  const roundStarted = useRoundStarted()
  const currentPlayerGettingReady = useCurrentPlayerGettingReady()

  const closeScoreBoard = useCloseScoreBoard()

  // dialogue StartPlayerRoundDialog
  const [startPlayerRoundDialogIsOpen, startPlayerRoundDialogIsOpenSetter] = React.useState(false)
  const openStartPlayerRoundDialog = () => {
    startPlayerRoundDialogIsOpenSetter(true)
  }
  const closeStartPlayerRoundDialog = () => {
    startPlayerRoundDialogIsOpenSetter(false)
  }

  // dialogue StartPlayerRoundDialog
  const isDrawCardDialogOpen = currentPlayer && currentPlayerGettingReady
  const [drawCardDialogIsOpen, drawCardDialogIsOpenSetter] = React.useState(isDrawCardDialogOpen)

  const openDrawCardDialog = () => {
    drawCardDialogIsOpenSetter(true)
  }
  const closeDrawCardDialog = () => {
    drawCardDialogIsOpenSetter(false)
  }

  let nextPlayer
  if (currentPlayer) {
    const currentPlayerIndex = players.findIndex((player) => player.id === currentPlayer.id)
    nextPlayer =
      currentPlayerIndex === players.length - 1 ? players[0] : players[currentPlayerIndex + 1]
  } else {
    nextPlayer = players[0]
  }

  return (
    <div className="score-board-container">
      <div className="cross" onClick={closeScoreBoard}>
        X
      </div>

      {!roundStarted && (
        <button
          onClick={() => {
            openStartPlayerRoundDialog()
          }}
        >
          {currentPlayer ? "Joueur suivant" : "Commencer à jouer"}
        </button>
      )}

      <img className="win-treasure-img" src="src/score-board/win-treasure.png" alt="win-treasure" />
      <div className="users-path">
        {players.map((player) => {
          return (
            <UserPath
              key={player.id}
              player={player}
              previousScore={player.score}
              newScore={player.score}
            />
          )
        })}
      </div>
      <StartPlayerRoundDialog
        dialogIsOpen={startPlayerRoundDialogIsOpen}
        closeDialog={closeStartPlayerRoundDialog}
        openDrawCardDialog={openDrawCardDialog}
        player={nextPlayer}
      />
      <DrawCardDialog dialogIsOpen={drawCardDialogIsOpen} closeDialog={closeDrawCardDialog} />
    </div>
  )
}

const UserPath = ({ previousScore, newScore, player }) => {
  const playerId = player.id

  const pathId = `path-${playerId}`
  const pathCoordinates = pathList[`path${playerId}`] || null

  const pathElement = document.getElementById(pathId)

  if (pathElement) {
    const pathLength = pathElement.getTotalLength()
    // path-foreground line fill
    pathElement.style.strokeDashoffset = `${pathLength - (previousScore * (pathLength / 2)) / 3000}`
    pathElement.animate(
      [
        { strokeDashoffset: `${pathLength - (previousScore * (pathLength / 2)) / 3000}` },
        { strokeDashoffset: `${pathLength - (newScore * (pathLength / 2)) / 3000}` },
      ],
      {
        duration: 1000,
        fill: "forwards",
      },
    )
  }

  const ScoreIndicatorId = `score-indicator-${playerId}`
  const scoreIndicatorElement = document.getElementById(ScoreIndicatorId)

  // score indicator
  if (scoreIndicatorElement) {
    scoreIndicatorElement.style.offsetDistance = `${(previousScore * 50) / 3000}%`
    scoreIndicatorElement.style.offsetPath = `path('${pathCoordinates}')`
    scoreIndicatorElement.animate(
      [
        { offsetDistance: `${(previousScore * 50) / 3000}%` },
        { offsetDistance: `${(newScore * 50) / 3000}%` },
      ],
      {
        duration: 1000,
        fill: "forwards",
      },
    )
  }

  return (
    <div className="user-path">
      <div className="path path-background">
        <Path coordinates={pathCoordinates} />
      </div>
      <div className="path path-foreground">
        <Path
          coordinates={pathCoordinates}
          pathId={pathId}
          player={player}
          ScoreIndicatorId={ScoreIndicatorId}
        />
      </div>
      <div className="speech-bubble">{newScore}</div>
      <div className="user-avatar">
        <Avatar player={player} />
      </div>
    </div>
  )
}

const Avatar = ({ player }) => (
  <>
    <img
      className="player-img"
      src={`src/score-board/${player && player.character.img}`}
      alt="player"
      style={{
        borderColor: (player && player.character.color) || "white",
      }}
    />
  </>
)

const Path = ({ coordinates, pathId, player, ScoreIndicatorId }) => (
  <svg width="79.164px" height="739.564px" viewBox="0 0 79.164 739.564">
    <path fill="#FFFFFF" d={coordinates} id={pathId ? pathId : "path"} />
    {player && (
      <circle
        className="score-indicator"
        id={ScoreIndicatorId}
        r="13"
        fill={player.character.color || "white"}
      />
    )}
  </svg>
)

const useSetCurrentPlayerGettingReady = createAction((state) => {
  return {
    ...state,
    currentPlayerGettingReady: true,
  }
})

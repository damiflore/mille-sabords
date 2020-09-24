import React from "react"
import { usePlayers, useRoundStarted, useCurrentPlayerGettingReady } from "src/main.store.js"
import { useCurrentPlayer } from "src/round/round.selectors.js"
import { DrawCardDialog } from "src/footer/DrawCardDialog.jsx"
import { StartPlayerRoundDialog } from "src/score-board/StartPlayerRoundDialog.jsx"

const pathList = {
  path1:
    "M39.582,739.564c0-91.824,39.191-96.32,38.045-166.691s-30.042-70.37-47.326-161.729s38.128-86.388,31.276-186.42C55.405,134.602-3.014,89.176,8.812,129.825c5.333,18.333,30.77-21,30.77-129.825",
  path2:
    "M39.582,739.564c0-113.074-5.437-166.074-8.437-198.074s36-20.667,33.019-2c-1.796,11.248-24.583,13.333-23.699-22c1.229-49.158,22.68-111,23.68-169s-38-95-46-181S39.582,0,39.582,0",
  path3:
    "M39.582,739.564c0-71.926-15.437-155.074-17.437-253.074s30-185,31.087-217s-31.087-46-31.087-26s33,10,31-32s-31-110-31-144S39.582,0,39.582,0",
  path4:
    "M39.582,739.564c0-113.074-5.437-166.074-8.437-198.074s36-20.667,33.019-2c-1.796,11.248-24.583,13.333-23.699-22c1.229-49.158,22.68-111,23.68-169s-38-95-46-181S39.582,0,39.582,0",
}

export const ScoreBoard = ({ openedByUser, closeScoreboard, scoreAnimation }) => {
  const players = usePlayers()
  const currentPlayer = useCurrentPlayer()
  const roundStarted = useRoundStarted()
  const currentPlayerGettingReady = useCurrentPlayerGettingReady()

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
      {openedByUser && (
        <div className="cross" onClick={closeScoreboard}>
          X
        </div>
      )}

      {!roundStarted && (
        <button
          className="score-board-action"
          onClick={() => {
            openStartPlayerRoundDialog()
          }}
        >
          {currentPlayer ? "Joueur suivant" : "Commencer à jouer"}
        </button>
      )}

      <img className="win-treasure-img" src="src/score-board/win-treasure.png" alt="win-treasure" />
      <div className="users-path">
        {players.map((player) => (
          <UserPath
            key={player.id}
            pathCoordinates={pathList[`path${player.id}`]}
            score={player.score}
            character={player.character}
            scoreAnimation={
              currentPlayer && player.id === currentPlayer.id && scoreAnimation
                ? {
                    from: player.score - scoreAnimation.newScore,
                    to: player.score,
                  }
                : null
            }
            // uncomment line below to test animation
            // scoreAnimation={{ from: player.score, to: player.score + 1000 }}
          />
        ))}
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

const UserPath = ({ scoreAnimation, pathCoordinates, character, score }) => {
  const pathForegroundElementRef = React.useRef(null)
  const circleElementRef = React.useRef(null)

  React.useEffect(() => {
    if (!scoreAnimation) return

    const from = scoreAnimation.from
    const to = scoreAnimation.to

    const pathForegroundElement = pathForegroundElementRef.current
    const pathLength = pathForegroundElement.getTotalLength()
    pathForegroundElement.style.strokeDashoffset = `${
      pathLength - (from * (pathLength / 2)) / 3000
    }`
    pathForegroundElement.animate(
      [
        { strokeDashoffset: `${pathLength - (from * (pathLength / 2)) / 3000}` },
        { strokeDashoffset: `${pathLength - (to * (pathLength / 2)) / 3000}` },
      ],
      {
        duration: 1000,
        fill: "forwards",
      },
    )

    const circleElement = circleElementRef.current
    circleElement.style.offsetDistance = `${(from * 50) / 3000}%`
    circleElement.animate(
      [{ offsetDistance: `${(from * 50) / 3000}%` }, { offsetDistance: `${(to * 50) / 3000}%` }],
      {
        duration: 1000,
        fill: "forwards",
      },
    )
  }, [scoreAnimation])

  React.useEffect(() => {
    // path-foreground line fill
    const pathForegroundElement = pathForegroundElementRef.current
    const pathLength = pathForegroundElement.getTotalLength()
    pathForegroundElement.style.strokeDasharray = pathLength
    pathForegroundElement.style.strokeDashoffset = pathLength - (score / 6000) * pathLength
  }, [score])

  return (
    <div className="user-path">
      <svg viewBox="0 0 79.164 739.564">
        <path d={pathCoordinates} className="path-background" />
        <path ref={pathForegroundElementRef} d={pathCoordinates} className="path-foreground" />
        <circle
          ref={circleElementRef}
          r="13"
          fill={character.color || "white"}
          className="score-indicator"
          style={{
            offsetPath: `path('${pathCoordinates}')`,
            offsetDistance: `${(score / 6000) * 100}%`,
          }}
        />
      </svg>
      <div className="speech-bubble">{score}</div>
      <div className="user-avatar">
        <Avatar character={character} />
      </div>
    </div>
  )
}

const Avatar = ({ character }) => (
  <img
    className="player-img"
    src={`src/score-board/${character.img}`}
    alt="player"
    style={{
      boxShadow: `inset 0px 0px 0px 4px ${character.color || "black"}`,
    }}
  />
)

import React from "react"
import { usePlayers, useRoundStarted } from "src/main.store.js"
import { useCurrentPlayer } from "src/round/round.selectors.js"
import { StartPlayerRoundDialog } from "src/score-board/StartPlayerRoundDialog.jsx"
import winTreasureUrl from "src/score-board/win-treasure.png"

const SCORE_MAX = 6000

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

export const ScoreBoard = ({ openedByUser, closeScoreboard, playerAnimation }) => {
  const players = usePlayers()
  const currentPlayer = useCurrentPlayer()
  const roundStarted = useRoundStarted()

  // dialogue StartPlayerRoundDialog
  const [startPlayerRoundDialogIsOpen, startPlayerRoundDialogIsOpenSetter] = React.useState(false)
  const openStartPlayerRoundDialog = () => {
    startPlayerRoundDialogIsOpenSetter(true)
  }
  const closeStartPlayerRoundDialog = () => {
    startPlayerRoundDialogIsOpenSetter(false)
  }

  const nextPlayer = getNextPlayer()

  return (
    <div className="score-board-container">
      {openedByUser && (
        <div className="cross" onClick={closeScoreboard}>
          X
        </div>
      )}
      {!roundStarted && !currentPlayer && (
        <div className="action-container">
          <button
            className="score-board-action"
            onClick={() => {
              openStartPlayerRoundDialog()
            }}
          >
            Commencer à jouer
          </button>
        </div>
      )}
      <img className="win-treasure-img" src={winTreasureUrl} alt="win-treasure" />
      <div className="users-path">
        {players.map((player) => (
          <PlayerPath
            key={player.id}
            player={player}
            pathCoordinates={pathList[`path${player.id}`]}
            score={player.score}
            character={player.character}
            openStartPlayerRoundDialog={openStartPlayerRoundDialog}
            isCurrentPlayer={currentPlayer && player.id === currentPlayer.id}
            playerAnimation={playerAnimation}
          />
        ))}
      </div>
      <StartPlayerRoundDialog
        dialogIsOpen={startPlayerRoundDialogIsOpen}
        closeDialog={closeStartPlayerRoundDialog}
        player={nextPlayer}
      />
    </div>
  )
}

const getNextPlayer = () => {
  const currentPlayer = useCurrentPlayer()
  const players = usePlayers()

  let nextPlayer
  if (currentPlayer) {
    const currentPlayerIndex = players.findIndex((player) => player.id === currentPlayer.id)
    nextPlayer =
      currentPlayerIndex === players.length - 1 ? players[0] : players[currentPlayerIndex + 1]
  } else {
    nextPlayer = players[0]
  }
  return nextPlayer
}

const PlayerPath = ({
  pathCoordinates,
  player,
  character,
  score,
  openStartPlayerRoundDialog,
  playerAnimation,
}) => {
  const pathForegroundElementRef = React.useRef(null)
  const circleElementRef = React.useRef(null)
  const nextPlayer = getNextPlayer()

  const [scoreAnimation, scoreAnimationSetter] = React.useState()

  React.useEffect(() => {
    if (playerAnimation && playerAnimation.player === player) {
      scoreAnimationSetter(playerAnimation.score)
    } else {
      scoreAnimationSetter(null)
    }
  }, [playerAnimation, player])

  React.useEffect(() => {
    if (!scoreAnimation) return () => {}

    const { from, to } = scoreAnimation
    const pathForegroundElement = pathForegroundElementRef.current
    const pathLength = pathForegroundElement.getTotalLength()
    const pathForegroundAnimation = pathForegroundElement.animate(
      [
        { strokeDashoffset: ratioToStrokeDashOffset(from / SCORE_MAX, pathLength) },
        { strokeDashoffset: ratioToStrokeDashOffset(to / SCORE_MAX, pathLength) },
      ],
      {
        duration: 1000,
        fill: "forwards",
      },
    )
    const circleElement = circleElementRef.current
    const circleAnimation = circleElement.animate(
      [
        { offsetDistance: ratioToOffsetDistance(from / SCORE_MAX) },
        { offsetDistance: ratioToOffsetDistance(to / SCORE_MAX) },
      ],
      {
        duration: 1000,
        fill: "forwards",
      },
    )

    pathForegroundAnimation.onfinish = () => {
      if (circleAnimation.playState === "finished") scoreAnimationSetter(null)
    }
    circleAnimation.onfinish = () => {
      if (pathForegroundAnimation.playState === "finished") scoreAnimationSetter(null)
    }

    return () => {
      pathForegroundAnimation.cancel()
      circleAnimation.cancel()
    }
  }, [scoreAnimation])

  // uncomment to test score animation
  // React.useEffect(() => {
  //   scoreAnimationSetter({
  //     from: 0,
  //     to: -1000,
  //   })
  // }, [])

  React.useEffect(() => {
    // path-foreground line fill
    const pathForegroundElement = pathForegroundElementRef.current
    const pathLength = pathForegroundElement.getTotalLength()
    pathForegroundElement.style.strokeDasharray = pathLength
    pathForegroundElement.style.strokeDashoffset = ratioToStrokeDashOffset(
      score / SCORE_MAX,
      pathLength,
    )
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
            offsetDistance: ratioToOffsetDistance(score / SCORE_MAX),
          }}
        />
      </svg>
      <div className="speech-bubble">{score}</div>
      <div
        className={`user-avatar ${nextPlayer.character.id === character.id ? "next-player" : ""}`}
        onClick={() => {
          if (nextPlayer.character.id === character.id) openStartPlayerRoundDialog()
        }}
      >
        <Avatar character={character} />
      </div>
    </div>
  )
}

const ratioToOffsetDistance = (ratio) => `${ratio * 100}%`

const ratioToStrokeDashOffset = (ratio, pathLength) => pathLength - ratio * pathLength

const Avatar = ({ character }) => (
  <img
    className="player-img"
    src={character.img}
    alt="player"
    style={{
      boxShadow: `inset 0px 0px 0px 4px ${character.color || "black"}`,
    }}
  />
)

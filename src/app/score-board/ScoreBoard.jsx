import React from "react"

import { Image } from "root/src/app/generic/Image.jsx"
import { usePlayers, useRoundStarted } from "root/src/app/main.store.js"
import { useCurrentPlayer } from "root/src/app/round/round.selectors.js"
import { StartPlayerRoundDialog } from "root/src/app/score-board/StartPlayerRoundDialog.jsx"
import {
  symbolSkullUrl,
  symbolToImageUrl,
} from "root/src/app/symbols/symbols.js"

const winTreasureUrl = new URL(
  "./win-treasure.png",
  import.meta.url,
)
const boarUrl = new URL("./boat.png", import.meta.url)
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

export const ScoreBoard = ({
  openedByUser,
  closeScoreboard,
  playerAnimation,
}) => {
  const players = usePlayers()
  const currentPlayer = useCurrentPlayer()
  const roundStarted = useRoundStarted()

  // dialogue StartPlayerRoundDialog
  const [startPlayerRoundDialogIsOpen, startPlayerRoundDialogIsOpenSetter] =
    React.useState(false)
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
      <Image
        className="win-treasure-img"
        src={winTreasureUrl}
        alt="win-treasure"
        width="230"
        height="150"
      />
      <div className="users-path">
        {players.map((player) => (
          <PlayerPath
            key={player.id}
            player={player}
            openedByUser={openedByUser}
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
    const currentPlayerIndex = players.findIndex(
      (player) => player.id === currentPlayer.id,
    )
    nextPlayer =
      currentPlayerIndex === players.length - 1
        ? players[0]
        : players[currentPlayerIndex + 1]
  } else {
    nextPlayer = players[0]
  }
  return nextPlayer
}

const PlayerPath = ({
  pathCoordinates,
  player,
  openedByUser,
  character,
  score,
  openStartPlayerRoundDialog,
  playerAnimation,
}) => {
  const pathForegroundElementRef = React.useRef(null)
  const boatElementRef = React.useRef(null)
  const animation3SkullsElementRef = React.useRef(null)
  const animationSymbolsElementRef = React.useRef(null)

  const nextPlayer = getNextPlayer()

  const [scoreAnimation, scoreAnimationSetter] = React.useState(null)
  const [symbolsAnimation, symbolsAnimationSetter] = React.useState([])
  const [skullsAnimation, skullsAnimationSetter] = React.useState(false)

  React.useEffect(() => {
    if (playerAnimation && playerAnimation.player === player) {
      if (playerAnimation.roundOverReason === "user-collect") {
        scoreAnimationSetter(playerAnimation.score)
        symbolsAnimationSetter(playerAnimation.symbolsInChest)
      } else if (playerAnimation.roundOverReason === "3-skulls") {
        skullsAnimationSetter(true)
      } else if (playerAnimation.roundOverReason === "chalenge-failed") {
        scoreAnimationSetter(playerAnimation.score)
      }
    } else {
      scoreAnimationSetter(null)
    }
  }, [playerAnimation, player])

  // // symbols animation
  // React.useEffect(() => {
  //   if (symbolsAnimation) {
  //     console.log(symbolsAnimation)
  //     //  HERE
  //   }
  // }, [symbolsAnimation])

  // score progress animation
  React.useEffect(() => {
    if (!scoreAnimation) return undefined
    const { from, to } = scoreAnimation

    // Boat animation along the path
    const boatElement = boatElementRef.current
    const boatAnimation = boatElement.animate(
      [
        { offsetDistance: ratioToOffsetDistance(from / SCORE_MAX) },
        { offsetDistance: ratioToOffsetDistance(to / SCORE_MAX) },
      ],
      {
        duration: 1000,
        fill: "forwards",
      },
    )

    // Symbols animation along the path (if exist)
    const symbolsElement = animationSymbolsElementRef.current
    let symbolsAnimation = null
    if (symbolsElement) {
      symbolsAnimation = symbolsElement.animate(
        [
          { offsetDistance: ratioToOffsetDistance(from / SCORE_MAX) },
          { offsetDistance: ratioToOffsetDistance(to / SCORE_MAX) },
        ],
        {
          duration: 1000,
          fill: "forwards",
        },
      )
    }

    // path animation
    const pathForegroundElement = pathForegroundElementRef.current
    const pathLength = pathForegroundElement.getTotalLength()
    console.log("from", from)
    console.log("to", to)
    const pathForegroundAnimation = pathForegroundElement.animate(
      [
        {
          strokeDashoffset: ratioToStrokeDashOffset(
            from / SCORE_MAX,
            pathLength,
          ),
        },
        {
          strokeDashoffset: ratioToStrokeDashOffset(to / SCORE_MAX, pathLength),
        },
      ],
      {
        duration: 1000,
        fill: "forwards",
      },
    )

    pathForegroundAnimation.onfinish = () => {
      if (boatAnimation.playState === "finished") scoreAnimationSetter(null)
    }
    boatAnimation.onfinish = () => {
      if (pathForegroundAnimation.playState === "finished")
        scoreAnimationSetter(null)
    }

    return () => {
      pathForegroundAnimation.cancel()
      boatAnimation.cancel()
      if (symbolsAnimation) symbolsAnimation.cancel()
    }
  }, [scoreAnimation])

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
      <svg
        viewBox="0 0 79.164 739.564"
        width="50"
        height="450"
        fill="none"
        stroke="none"
      >
        <path d={pathCoordinates} className="path-background" />
        <path
          ref={pathForegroundElementRef}
          d={pathCoordinates}
          className="path-foreground"
        />
        <g className="score-indicator">
          <image
            ref={boatElementRef}
            href={boarUrl}
            width="26"
            height="26"
            className="boat"
            style={{
              offsetPath: `path('${pathCoordinates}')`,
              offsetDistance: ratioToOffsetDistance(score / SCORE_MAX),
            }}
          />
          {symbolsAnimation && symbolsAnimation.length > 0 && (
            <g
              className="animation-symbols"
              ref={animationSymbolsElementRef}
              style={{
                offsetPath: `path('${pathCoordinates}')`,
                offsetDistance: ratioToOffsetDistance(score / SCORE_MAX),
              }}
            >
              {symbolsAnimation.map((symbol, index) => (
                <image
                  key={index}
                  width="30"
                  height="30"
                  className={`symbol symbol-${index + 1}`}
                  href={symbolToImageUrl(symbol)}
                />
              ))}
            </g>
          )}
        </g>
      </svg>
      <div className="speech-bubble">{score}</div>
      <div
        className={`user-avatar ${
          nextPlayer.character.id === character.id && !openedByUser
            ? "next-player"
            : ""
        }`}
        onClick={() => {
          if (nextPlayer.character.id === character.id && !openedByUser)
            openStartPlayerRoundDialog()
        }}
      >
        {skullsAnimation && (
          <div className="animation-3skulls" ref={animation3SkullsElementRef}>
            <ThreeSkullsAnimated />
          </div>
        )}
        <Avatar character={character} />
      </div>
    </div>
  )
}

const ratioToOffsetDistance = (ratio) => `${ratio * 100}%`

const ratioToStrokeDashOffset = (ratio, pathLength) =>
  pathLength - ratio * pathLength

const ThreeSkullsAnimated = () =>
  new Array(3)
    .fill("")
    .map((item, index) => (
      <Image
        key={index}
        width="30"
        height="30"
        className={`skull skull-${index + 1}`}
        src={symbolSkullUrl}
        animateLoaded={false}
      />
    ))

const Avatar = ({ character }) => (
  <Image
    className="player-img"
    src={character.img}
    alt="player"
    width="40"
    height="40"
    style={{
      boxShadow: `inset 0px 0px 0px 4px ${character.color || "black"}`,
    }}
  />
)

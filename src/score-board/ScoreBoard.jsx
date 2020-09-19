import React from "react"
import { usePlayers, useCurrentPlayerId } from "src/main.store.js"

const path1 =
  "M39.582,739.564c0-91.824,39.191-96.32,38.045-166.691s-30.042-70.37-47.326-161.729s38.128-86.388,31.276-186.42C55.405,134.602-3.014,89.176,8.812,129.825c5.333,18.333,30.77-21,30.77-129.825"
const path2 =
  "M39.582,739.564c0-113.074-5.437-166.074-8.437-198.074s36-20.667,33.019-2c-1.796,11.248-24.583,13.333-23.699-22c1.229-49.158,22.68-111,23.68-169s-38-95-46-181S39.582,0,39.582,0"
const path3 =
  "M39.582,739.564c0-71.926-15.437-155.074-17.437-253.074s30-185,31.087-217s-31.087-46-31.087-26s33,10,31-32s-31-110-31-144S39.582,0,39.582,0"

export const ScoreBoard = () => {
  const players = usePlayers()
  const currentPlayerId = useCurrentPlayerId()

  return (
    <div className="score-board-container">
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
  )
}

const UserPath = ({ previousScore, newScore, player }) => {
  const playerId = player.id

  const ScoreIndicatorId = `score-indicator-${playerId}`
  const scoreIndicatorElement = document.getElementById(ScoreIndicatorId)

  const pathId = `path-${playerId}`
  const PathElement = document.getElementById(pathId)

  // eslint-disable-next-line no-eval
  const pathCoordinates = eval(`path${playerId}`) ? eval(`path${playerId}`) : null

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
        delay: 3000,
        fill: "forwards",
      },
    )
  }

  if (PathElement) {
    console.log(PathElement)
    console.log((previousScore * 412.5) / 3000)
    PathElement.style.strokeDashoffset = `${825 - (previousScore * 412.5) / 3000}`
    // 412.5 = half of the path lengt (825), and  3000 is half of the total score
  }

  return (
    <div className="user-path">
      <div className="path path-background">
        <Path coordinates={pathCoordinates} />
      </div>
      <div className="path path-foreground">
        <Path coordinates={pathCoordinates} pathId={pathId} />
      </div>
      <div className="score-indicator" id={ScoreIndicatorId}>
        <Circle player={player} />
      </div>
      <div className="speech-bubble">{newScore}</div>
      <div className="user-avatar">
        <Avatar player={player} />
      </div>
    </div>
  )
}

const Circle = ({ player }) => (
  <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" fill={(player && player.character.color) || "white"} />
  </svg>
)

const Avatar = ({ player }) => (
  <>
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" stroke={(player && player.character.color) || "white"} />
    </svg>
    <span className="player-name">{player && player.character.name}</span>
  </>
)

const Path = ({ coordinates, pathId }) => (
  <svg width="79.164px" height="739.564px" viewBox="0 0 79.164 739.564">
    <path fill="#FFFFFF" stroke="#000000" d={coordinates} id={pathId ? pathId : "path"} />
  </svg>
)

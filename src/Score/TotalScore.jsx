import React from "react"
import { useGameStore } from "src/MilleSabordGame.js"

export const TotalScore = () => {
  const { totalScore } = useGameStore()

  return (
    <div>
      <span className="subtitle"> Total score: </span>
      <span className="totalScore">{totalScore}</span>
    </div>
  )
}

import React from "react"

export const ButtonNextRound = ({ nextRoundPermission, nextRound }) => {
  if (nextRoundPermission.allowed) {
    return <button onClick={() => nextRound()}>Next round</button>
  }

  return null
}

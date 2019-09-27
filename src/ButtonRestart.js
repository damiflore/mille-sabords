import React from "react"

export const ButtonRestart = ({ restartPermission, clearDiceSet }) => {
  if (restartPermission.allowed) {
    return <button onClick={() => clearDiceSet()}>Restart</button>
  }

  return null
}

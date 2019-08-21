import React from "react"

export const ButtonRestart = ({ roundFinished, clearDiceSet }) => {
  return <>{roundFinished && <button onClick={() => clearDiceSet()}>Restart</button>}</>
}

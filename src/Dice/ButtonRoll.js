import React from "react"

export const ButtonRoll = ({ rollDicePermission, onClick }) => {
  if (rollDicePermission.allowed) {
    return <button onClick={onClick}>Roll!</button>
  }

  if (rollDicePermission.reaon === "3 skulls or more") {
    return null
  }

  return (
    <>
      <button disabled={true}>Roll!</button>
      <span>{`(${rollDicePermission.reason})`}</span>
    </>
  )
}

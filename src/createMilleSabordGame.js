import React from "react"
import ReactDOM from "react-dom"

export const createMilleSabordGame = async ({ into, initialState = {} }) => {
  const { MilleSabordGame } = await import("./MilleSabordGame.js")

  ReactDOM.render(<MilleSabordGame initialState={initialState} />, into)
}

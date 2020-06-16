import React from "react"

import { useMarkScore } from "src/game.actions.js"
import { useHasRolledOnce, useMarkScoreAllowed, useRoundScore } from "src/game.selectors.js"

import { ButtonNextRound } from "src/footer/ButtonNextRound.js"
import { DrawCardDialog } from "src/footer/DrawCardDialog.jsx"
import { ButtonRoll } from "./ButtonRoll.js"

export const Footer = () => {
  const markScore = useMarkScore()
  const roundScore = useRoundScore()

  const [dialogIsOpen, setDialogIsOpen] = React.useState(false)

  const openDialog = () => {
    setDialogIsOpen(true)
  }

  const closeDialog = () => {
    setDialogIsOpen(false)
  }

  return (
    <div className="actions">
      <ButtonRoll />
      <ButtonMarkScore
        onClick={() => {
          markScore(roundScore)
        }}
      />
      <ButtonNextRound openDialog={openDialog} />
      <DrawCardDialog dialogIsOpen={dialogIsOpen} closeDialog={closeDialog} />
    </div>
  )
}

const ButtonMarkScore = ({ onClick }) => {
  const hasRolledOnce = useHasRolledOnce()
  const markScoreAllowed = useMarkScoreAllowed()
  const roundScore = useRoundScore()

  const sign = roundScore < 0 ? "-" : "+"

  if (markScoreAllowed && hasRolledOnce)
    return (
      <div className="collect-action">
        <button onClick={onClick}>
          <span>Collecter</span>
          <span className="score">
            {sign} {Math.abs(roundScore)}
          </span>
        </button>
      </div>
    )

  return null
}

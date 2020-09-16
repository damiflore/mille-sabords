import React from "react"

import { useMarkScore } from "src/round/round.actions.js"
// import { useRoundStarted } from "src/game.store.js"
import {
  useMarkScoreAllowed,
  useMarkScoreButtonVisible,
  useRoundScore,
} from "src/round/round.selectors.js"

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

  // const roundStarted = useRoundStarted()
  // if (!roundStarted && !dialogIsOpen) openDialog()
  // TODO: fix bug in DialogBase: dialog cannot be instantiated open

  return (
    <div className="actions">
      <ButtonRoll />
      <ButtonNextRound openDialog={openDialog} />
      <ButtonMarkScore
        onClick={() => {
          markScore(roundScore)
        }}
      />
      <DrawCardDialog dialogIsOpen={dialogIsOpen} closeDialog={closeDialog} />
    </div>
  )
}

const ButtonMarkScore = ({ onClick }) => {
  const markScoreAllowed = useMarkScoreAllowed()
  const markScoreButtonVisible = useMarkScoreButtonVisible()
  const roundScore = useRoundScore()

  const sign = roundScore < 0 ? "-" : "+"

  if (markScoreButtonVisible)
    return (
      <div className="collect-action">
        <button onClick={onClick} disabled={!markScoreAllowed}>
          <span>Collecter</span>
          <span className="score">
            {sign} {Math.abs(roundScore)}
          </span>
        </button>
        {!markScoreAllowed && <img src={`src/dices/dice_skull.png`} className="skull-symbol" />}
      </div>
    )

  return null
}

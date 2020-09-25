import React from "react"

import { useMarkScore } from "src/round/round.actions.js"
import {
  useMarkScoreAllowed,
  useMarkScoreButtonVisible,
  useStartNextRoundAllowed,
  useRoundScore,
} from "src/round/round.selectors.js"
import { createAction } from "src/main.store.js"

import { ButtonRoll } from "./ButtonRoll.js"

export const Footer = ({ onRoundOver, rolledAreaRef }) => {
  // const roundStarted = useRoundStarted()
  // if (!roundStarted && !dialogIsOpen) openDialog()
  // TODO: fix bug in DialogBase: dialog cannot be instantiated open

  return (
    <div className="footer actions">
      <ButtonRoll rolledAreaRef={rolledAreaRef} />
      <ButtonMarkScore />
      <ButtonEndRound onRoundOver={onRoundOver} />
    </div>
  )
}

const ButtonMarkScore = () => {
  const roundScore = useRoundScore()
  const markScore = useMarkScore()
  const markScoreAllowed = useMarkScoreAllowed()
  const markScoreButtonVisible = useMarkScoreButtonVisible()

  const sign = roundScore < 0 ? "-" : "+"

  if (markScoreButtonVisible) {
    return (
      <div className="collect-action">
        <button
          onClick={() => {
            markScore(roundScore)
          }}
          disabled={!markScoreAllowed}
        >
          <span>Collecter</span>
          <span className="score">
            {sign} {Math.abs(roundScore)}
          </span>
        </button>
        {!markScoreAllowed && <img src={`/src/dices/dice_skull.png`} className="skull-symbol" />}
      </div>
    )
  }

  return null
}

const ButtonEndRound = ({ onRoundOver }) => {
  const startNextRoundAllowed = useStartNextRoundAllowed()
  const endRound = useEndRound()
  const roundScore = useRoundScore()

  if (startNextRoundAllowed) {
    return (
      <div className="next-round-action">
        <button
          onClick={() => {
            // ici on sait que le round est terminé
            // on peut dire a ceux que ça intéresse
            // comment ça s'est passé (scoreboard)
            // qui va alors animé le fait qu'on a marqué un score
            // on devrait aussi animer le cas ou on fail sword challenge
            // et le cas ou on se tape 3 tete
            endRound()
            onRoundOver({
              // a faire ici:
              // si on fail sword-challenge ou qu'on fait 3 skulls
              // alors la raison doit changer
              // et le scoreboard fera une autre animation
              reason: "score-marked",
              value: roundScore,
            })
          }}
        >
          Terminer mon tour
        </button>
      </div>
    )
  }

  return null
}

const useEndRound = createAction((state) => {
  return {
    ...state,
    roundStarted: false,
  }
})

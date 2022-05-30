import React from "react"

import {
  useMarkScore,
  useEndPlayerRound,
} from "/src/app/round/round.actions.js"
import { Image } from "/src/app/generic/Image.jsx"
import {
  useMarkScoreAllowed,
  useMarkScoreButtonVisible,
  useStartNextRoundAllowed,
  useRoundScore,
  useThreeSkullsOrMoreInCursedArea,
  useSwordChallengeOnGoing,
  useSymbolsInChest,
} from "/src/app/round/round.selectors.js"
import { symbolSkullUrl } from "/src/app/symbols/symbols.js"

import { ButtonRoll } from "./ButtonRoll.jsx"

export const Footer = ({ onRoundOver, rolledAreaRef }) => {
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
        {!markScoreAllowed && (
          <Image src={symbolSkullUrl} className="skull-symbol" />
        )}
      </div>
    )
  }

  return null
}

const ButtonEndRound = ({ onRoundOver }) => {
  const startNextRoundAllowed = useStartNextRoundAllowed()
  const endPlayerRound = useEndPlayerRound()
  const roundScore = useRoundScore()
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()
  const swordChallengeOnGoing = useSwordChallengeOnGoing()
  const symbolsInChest = useSymbolsInChest()

  const computeReason = () => {
    // TODO: case of the treasure chest card => some score will be marked even if 3 skulls (canMarkScore ?)
    if (threeSkullsOrMoreInCursedArea) return "3-skulls"
    // sword challenge is ongoing means is not resolved
    // if the user clicks on 'Terminer mon tour' with an unresolved challenge, it means that he failed it
    if (swordChallengeOnGoing) return "chalenge-failed"
    return "user-collect"
  }

  if (startNextRoundAllowed) {
    return (
      <div className="next-round-action">
        <button
          onClick={() => {
            // ici on sait que le round est terminé
            // on dit a ceux que ça intéresse comment ça s'est passé (scoreboard)
            // qui va alors animer le fait qu'on a marqué un score, fail sword challenge
            // ou qu'on s'est tapé 3 tete
            endPlayerRound()
            onRoundOver({
              reason: computeReason(),
              value: roundScore,
              symbolsInChest,
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

import React from "react"

import { useCurrentCard, useRoundStarted } from "src/game.store.js"
import { useRoundScore } from "src/game.selectors.js"

import { isPirateCard } from "src/cards/cards.js"
import { Dialog } from "src/dialog/Dialog.jsx"

export const RoundScore = () => {
  const currentCard = useCurrentCard()

  return <div className="score-area">{currentCard ? <ScoreDisplay /> : null}</div>
}

const ScoreDisplay = () => {
  const roundScore = useRoundScore()
  const currentCard = useCurrentCard()

  const [dialogIsOpen, setDialogIsOpen] = React.useState(false)

  const openDialog = () => {
    setDialogIsOpen(true)
  }

  const closeDialog = () => {
    setDialogIsOpen(false)
  }

  // const { isOnSkullIsland } = state
  // if (isOnSkullIsland) {
  //   return <span>Skull Island!</span>
  // }

  return (
    <>
      <div className="bonds"></div>
      {isPirateCard(currentCard) ? <DoubleScoreIndicator /> : null}
      <div
        className="round-score"
        onClick={() => {
          openDialog()
        }}
      >
        {roundScore}
      </div>
      <ScoreRulesDialog dialogIsOpen={dialogIsOpen} closeDialog={closeDialog} />
    </>
  )
}

const DoubleScoreIndicator = () => {
  const roundStarted = useRoundStarted()
  if (roundStarted) return <div className="pirate-hook"></div>
  return <div style={{ display: "none" }} className="pirate-hook"></div>
}

const ScoreRulesDialog = ({ dialogIsOpen, closeDialog }) => (
  <Dialog isOpen={dialogIsOpen} onRequestClose={closeDialog} requestCloseOnClickOutside={true}>
    <div className="border border-right"></div>
    <div className="border border-left"></div>
    <div className="border border-top"></div>
    <div className="border border-bottom"></div>

    <div className="dialog-title">Score</div>

    <div className="dialog-content score-rules-dialog">
      <div className="dialog-body">
        <div className="dialog-box">
          <div className="dialog-label">Combinaisons de dés</div>
          <div className="columns">
            <div className="column">
              <div className="column-title">Symbols identiques</div>
              <span className="symbol-number">3</span>
              <span className="symbol-number">4</span>
              <span className="symbol-number">5</span>
              <span className="symbol-number">6</span>
              <span className="symbol-number">7</span>
              <span className="symbol-number">8</span>
            </div>
            <div className="column">
              <div className="column-title">Points</div>
              <span className="points">+100</span>
              <span className="points">+200</span>
              <span className="points">+500</span>
              <span className="points">+1000</span>
              <span className="points">+2000</span>
              <span className="points">+4000</span>
            </div>
          </div>
        </div>
        <div className="dialog-box">
          <div className="dialog-label">Dés spéciaux</div>
          <div className="columns">
            <div className="column">
              <div className="column-title">Symbol</div>
              <img src={`src/dices/dice_coin.png`} />
              <img src={`src/dices/dice_diamond.png`} />
            </div>
            <div className="column">
              <div className="column-title">Points</div>
              <span className="points">+100</span>
              <span className="points">+100</span>
            </div>
          </div>
        </div>
        <div className="dialog-box last">
          <div className="dialog-label">Bonus coffre plein</div>
          <div className="columns">
            <div className="column">
              <div className="column-title">Dés utilisés</div>
              <span className="symbol-number">8</span>
            </div>
            <div className="column">
              <div className="column-title">Points</div>
              <span className="points">+500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
)

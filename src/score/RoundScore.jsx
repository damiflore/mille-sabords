import React from "react"

import { useCurrentCard, useRoundStarted } from "src/game.store.js"
import { useRoundScore, useSymbolsInChest } from "src/game.selectors.js"

import { isPirateCard, isSwordChallengeCard } from "src/cards/cards.js"
import { useBecomes } from "src/hooks.js"
import { Dialog } from "src/dialog/Dialog.jsx"
import { SYMBOL_SWORD } from "src/symbols/symbols.js"
import { useSwordQuantityRequired } from "src/header/SwordChallengeIndicator.jsx"
import { countSymbol } from "src/score/computeRoundScore.js"

const { useState, useEffect } = React

const swordChallengeOngoing = () => {
  const currentCard = useCurrentCard()
  const symbolsInChest = useSymbolsInChest()
  const quantityKept = countSymbol(symbolsInChest, SYMBOL_SWORD)
  const quantityRequired = useSwordQuantityRequired()

  if (!isSwordChallengeCard(currentCard)) return false

  const challengeWon = quantityKept >= quantityRequired
  return !challengeWon
}

export const RoundScore = () => {
  const currentCard = useCurrentCard()

  return (
    <div className={`score-area ${swordChallengeOngoing() ? "animated" : ""}`}>
      {currentCard ? <ScoreDisplay /> : null}
    </div>
  )
}

const ScoreDisplay = () => {
  const roundScore = useRoundScore()
  const currentCard = useCurrentCard()

  const [dialogIsOpen, setDialogIsOpen] = useState(false)

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
      {isPirateCard(currentCard) ? <DoubleScoreIndicator /> : null}
      <div
        className={`round-score ${swordChallengeOngoing() ? "hidden" : ""}`}
        onClick={() => {
          openDialog()
        }}
      >
        {roundScore}
      </div>
      {isSwordChallengeCard(currentCard) ? <NegativeScoreSign /> : null}
      <ScoreRulesDialog dialogIsOpen={dialogIsOpen} closeDialog={closeDialog} />
    </>
  )
}

const DoubleScoreIndicator = () => {
  const roundStarted = useRoundStarted()
  if (roundStarted) return <div className="pirate-hook"></div>
  return <div style={{ display: "none" }} className="pirate-hook"></div>
}

const NegativeScoreSign = () => {
  const roundScore = useRoundScore()

  const symbolsInChest = useSymbolsInChest()
  const quantityKept = countSymbol(symbolsInChest, SYMBOL_SWORD)
  const quantityRequired = useSwordQuantityRequired()
  const quantityRequiredArray = new Array(quantityRequired).fill("")
  const challengeWon = quantityKept >= quantityRequired

  const swordNumberIncreased = useBecomes(
    (quantityKeptPrevious) => quantityKeptPrevious < quantityKept,
    [quantityKept],
  )

  const [swordSliceAnimation, swordSliceAnimationSetter] = useState(false)

  useEffect(() => {
    if (swordNumberIncreased) {
      swordSliceAnimationSetter(true)
    }
  }, [swordNumberIncreased])

  useEffect(() => {
    if (swordSliceAnimation) {
      const timeout = setTimeout(() => {
        swordSliceAnimationSetter(false)
      }, 300)
      return () => {
        clearTimeout(timeout)
      }
    }
    return () => {}
  }, [swordSliceAnimation])

  return (
    <>
      <div className={`ropes ${challengeWon ? "challenge-won" : ""}`}>
        {quantityRequiredArray.map((value, index) => {
          if (quantityKept >= index + 1)
            return <div key={index} className={`rope rope-${index + 1} cut-rope`}></div>
          return <div key={index} className={`rope rope-${index + 1}`}></div>
        })}
      </div>
      {swordSliceAnimation && quantityKept <= quantityRequired ? (
        <div className="sword-slice">
          <div className="triangle-left"></div>
          <div className="triangle-right"></div>
        </div>
      ) : null}
      <div
        className={`negative-round-score rotate-${quantityKept} ${challengeWon ? "removed" : ""}`}
      >
        {roundScore}
      </div>
    </>
  )
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

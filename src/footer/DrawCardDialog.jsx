import React from "react"

import { useCurrentCard, useCardDeck } from "src/game.store.js"
import { useDrawCard, useShuffleDeck } from "src/cards/cards.actions.js"

import { cardsRules } from "src/cards/cards-rules.js"
import { Dialog } from "src/dialog/Dialog.jsx"

export const DrawCardDialog = ({ dialogIsOpen, closeDialog }) => {
  return (
    <Dialog isOpen={dialogIsOpen} onRequestClose={closeDialog} requestCloseOnClickOutside={false}>
      <div className="border border-right"></div>
      <div className="border border-left"></div>
      <div className="border border-top"></div>
      <div className="border border-bottom"></div>

      <div className="dialog-title">Tour suivant</div>

      <div className="dialog-content draw-card-dialog">
        <div className="dialog-body">
          <div className="dialog-label">Piochez une carte pour le tour suivant</div>
          <div className="card-area">
            <BackCard />
            <TopCard />
          </div>
          <CardDescription />
          <div className="dialog-actions">
            <DeckButton />
            <StartButton closeDialog={closeDialog} />
          </div>
        </div>
      </div>
    </Dialog>
  )
}

const TopCard = () => {
  const card = useCurrentCard()

  if (card)
    return (
      <div className="card current-card">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div
                className="card default-card"
                style={{ backgroundImage: "url('src/cards/card_default.png')" }}
              ></div>
            </div>
            <div className="flip-card-back">
              <img src={`src/cards/card_${card}.png`} alt={card} />
            </div>
          </div>
        </div>
      </div>
    )
  return null
}

const CardDescription = () => {
  const card = useCurrentCard()

  if (card) {
    return <div className="subtitle">{cardsRules[card].name}</div>
  }
  return null
}

const BackCard = () => {
  const cardDeck = useCardDeck()
  return (
    <div
      className="card default-card"
      style={{ backgroundImage: "url('src/cards/card_default.png')" }}
    >
      <div className="remaining-cards-number">{cardDeck.length}</div>
    </div>
  )
}

const DeckButton = () => {
  const currentCard = useCurrentCard()
  const cardDeck = useCardDeck()

  if (currentCard) return null

  if (cardDeck.length === 0) return <ShuffleDeckButton />

  return <DrawCardButton />
}

const DrawCardButton = () => {
  const drawCard = useDrawCard()

  return (
    <button className="draw-card-btn" onClick={drawCard}>
      Piocher
    </button>
  )
}

const ShuffleDeckButton = () => {
  const shuffleDeck = useShuffleDeck()

  return (
    <button className="draw-card-btn" onClick={shuffleDeck}>
      Mélanger le paquet
    </button>
  )
}

const StartButton = ({ closeDialog }) => {
  const currentCard = useCurrentCard()

  if (currentCard) {
    return (
      <button className="draw-card-btn" onClick={closeDialog}>
        Commencer
      </button>
    )
  }
  return null
}

import React from "react"

import { useCurrentCardId } from "src/main.store.js"
import { useCardDeck } from "src/round/round.selectors.js"
import { useDrawCard, useShuffleDeck } from "src/cards/cards.actions.js"
import { useStartRound } from "src/round/round.actions.js"

import { cardsRules } from "src/cards/cards-rules.js"
import { Dialog } from "src/dialog/Dialog.jsx"
import { cardIdToCard } from "src/cards/cards.js"

export const DrawCardDialog = ({ dialogIsOpen, closeDialog }) => {
  const cardDeck = useCardDeck()
  const currentCardId = useCurrentCardId()
  const currentCard = cardIdToCard(currentCardId) || null

  return (
    <Dialog isOpen={dialogIsOpen} onRequestClose={closeDialog} requestCloseOnClickOutside={false}>
      <div className="border border-right"></div>
      <div className="border border-left"></div>
      <div className="border border-top"></div>
      <div className="border border-bottom"></div>

      <div className="dialog-title">Suivant</div>

      <div className="dialog-content draw-card-dialog">
        <div className="dialog-body">
          <div className="dialog-label">
            {cardDeck.length === 0 && !currentCardId
              ? "Paquet de cartes épuisé. Mélangez-le pour pouvoir piocher à nouveau."
              : "Piochez une carte pour le tour suivant."}
          </div>
          <div className="card-area">
            <BackCard remainingCardCount={cardDeck.length} />
            <TopCard currentCard={currentCard} />
          </div>
          <CardDescription card={currentCard} />
        </div>
        <div className="dialog-actions">
          <DeckButton cardDeck={cardDeck} />
          <StartButton currentCard={currentCard} closeDialog={closeDialog} />
        </div>
      </div>
    </Dialog>
  )
}

const TopCard = ({ currentCard }) => {
  if (!currentCard) {
    return null
  }

  return (
    <div className="card current-card">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div
              className="card default-card"
              style={{ backgroundImage: "url('/src/cards/card_default.png')" }}
            ></div>
          </div>
          <div className="flip-card-back">
            <img src={`/src/cards/card_${currentCard.type}.png`} alt={currentCard.type} />
          </div>
        </div>
      </div>
    </div>
  )
}

const CardDescription = ({ card }) => {
  const [moreInfoVisible, setMoreInfoVisible] = React.useState(false)
  const toggleMoreInfoVisibility = () => {
    setMoreInfoVisible(!moreInfoVisible)
  }

  if (!card) {
    return null
  }

  return (
    <div className="card-description">
      <span className="subtitle">{cardsRules[card].name}</span>
      <button className="moreInfoIcon" onClick={() => toggleMoreInfoVisibility()}>
        {moreInfoVisible ? <IconMinus /> : <IconPlus />}
      </button>
      <MoreInfo card={card} moreInfoVisible={moreInfoVisible} />
    </div>
  )
}

const MoreInfo = ({ card, moreInfoVisible }) => {
  if (!moreInfoVisible) {
    return null
  }

  if (cardsRules[card].more) {
    return (
      <>
        <div className="text-rule">{cardsRules[card].rule}</div>
        <div className="text-rule">{cardsRules[card].more}</div>
      </>
    )
  }

  return <div className="text-rule">{cardsRules[card].rule}</div>
}

const IconPlus = () => (
  <svg viewBox="0 0 24 24" height="24px" width="24px">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </svg>
)

const IconMinus = () => (
  <svg viewBox="0 0 24 24" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </svg>
)

const BackCard = ({ remainingCardCount }) => {
  return (
    <div
      className="card default-card"
      id="back-deck-card"
      style={{ backgroundImage: "url('/src/cards/card_default.png')" }}
    >
      <div className="remaining-cards-number">{remainingCardCount}</div>
    </div>
  )
}

const DeckButton = ({ cardDeck, currentCard }) => {
  if (currentCard) {
    return null
  }

  if (cardDeck.length === 0) {
    return <ShuffleDeckButton />
  }

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

  const shuffleDeckAnimation = () => {
    document.getElementById("back-deck-card").setAttribute("shaking-deck", "")
    setTimeout(() => {
      document.getElementById("back-deck-card").removeAttribute("shaking-deck", "")
      shuffleDeck()
    }, 1000)
  }
  return (
    <button className="draw-card-btn" onClick={shuffleDeckAnimation}>
      Mélanger le paquet
    </button>
  )
}

const StartButton = ({ currentCard, closeDialog }) => {
  const startRound = useStartRound()

  if (!currentCard) {
    return null
  }

  return (
    <button
      className="draw-card-btn"
      onClick={() => {
        startRound()
        closeDialog()
      }}
    >
      Commencer
    </button>
  )
}

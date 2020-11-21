/* eslint-disable import/max-dependencies */
import React from "react"

import { useCurrentCardId, useAnimationsDisabled } from "src/main.store.js"
import { Image } from "src/generic/Image.jsx"
import { useCardDeck } from "src/round/round.selectors.js"
import { useDrawCard, useShuffleDeck } from "src/cards/cards.actions.js"
import { useActivateCurrentCard } from "src/round/round.actions.js"

import { cardsRules } from "src/cards/cards-rules.js"
import { Dialog } from "src/dialog/dialog.component.jsx"
import { cardIdToCard, cardToImageUrl, cardDefaultUrl } from "src/cards/cards.js"
import { SmallCard } from "src/cards/SmallCard.jsx"
import { getDomNodeRectangle } from "src/dom/dom.position.js"

export const DrawCardDialog = ({ dialogIsOpen, closeDialog, headerSmallCardRef }) => {
  const cardDeck = useCardDeck()
  const currentCardId = useCurrentCardId()
  const currentCard = cardIdToCard(currentCardId) || null

  const backCardRef = React.useRef()
  const topCardRef = React.useRef()
  const smallCardRef = React.useRef()

  const shuffleCardsText = "Paquet de cartes épuisé. Mélangez-le pour pouvoir piocher à nouveau !"
  const drawCardText = "Piochez une carte pour le tour suivant."

  return (
    <Dialog
      className="draw-card-dialog dialog-spacing-10 dialog-spacing-fluid"
      isOpen={dialogIsOpen}
      onRequestClose={closeDialog}
      requestCloseOnClickOutside={false}
    >
      <div className="dialog-content">
        <div className="dialog-body">
          <div className="dialog-label">
            {cardDeck.length === 0 && !currentCard && shuffleCardsText}
            {cardDeck.length !== 0 && !currentCard && drawCardText}
            {currentCard && <span className="card-name">{cardsRules[currentCard.type].name}</span>}
          </div>
          <div className="card-area">
            <div
              style={{
                position: "relative",
              }}
            >
              <BackCard
                backCardRef={backCardRef}
                currentCard={currentCard}
                remainingCardCount={cardDeck.length}
              />
              <TopCard
                topCardRef={topCardRef}
                smallCardRef={smallCardRef}
                currentCard={currentCard}
              />
            </div>
          </div>
        </div>
        <div className="dialog-actions">
          <DeckButton backCardRef={backCardRef} cardDeck={cardDeck} currentCard={currentCard} />
          {currentCard ? (
            <StartButton
              headerSmallCardRef={headerSmallCardRef}
              smallCardRef={smallCardRef}
              backCardRef={backCardRef}
              topCardRef={topCardRef}
              currentCard={currentCard}
              closeDialog={closeDialog}
            />
          ) : null}
        </div>
      </div>
    </Dialog>
  )
}

const BackCard = ({ backCardRef, currentCard, remainingCardCount }) => {
  return (
    <div ref={backCardRef} className="card default-card" style={{ background: "none" }}>
      <Image src={cardDefaultUrl} width="150" />
      {currentCard ? null : <div className="remaining-cards-number">{remainingCardCount}</div>}
    </div>
  )
}

const TopCard = ({ topCardRef, smallCardRef, currentCard }) => {
  if (!currentCard) {
    return null
  }

  return (
    <>
      <div className="card current-card" ref={topCardRef}>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Image className="card default-card" src={cardDefaultUrl} />
            </div>
            <div className="flip-card-back">
              <Image
                className="card-img"
                src={cardToImageUrl(currentCard)}
                width="150"
                alt={currentCard.type}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="small-card">
        <SmallCard card={currentCard} ref={smallCardRef} />
      </div>
    </>
  )
}

const DeckButton = ({ backCardRef, cardDeck, currentCard }) => {
  if (currentCard) {
    return null
  }

  if (cardDeck.length === 0) {
    return <ButtonShuffleDeck backCardRef={backCardRef} />
  }

  return <ButtonDrawCard />
}

const ButtonDrawCard = () => {
  const drawCard = useDrawCard()

  return (
    <button className="button-card-main button-draw-card" onClick={drawCard}>
      Piocher
    </button>
  )
}

const ButtonShuffleDeck = ({ backCardRef }) => {
  const animationsDisabled = useAnimationsDisabled()
  const shuffleDeck = useShuffleDeck()
  const [shufflePending, sufflePendingSetter] = React.useState(false)

  const startShuffle = () => {
    sufflePendingSetter(true)
  }

  React.useEffect(() => {
    if (!shufflePending) {
      return () => {}
    }

    shuffleDeck()

    if (animationsDisabled) {
      sufflePendingSetter(false)
      return () => {}
    }
    return animateDeckShuffle({
      backCard: backCardRef.current,
      duration: 1000,
      onfinish: () => {
        sufflePendingSetter(false)
      },
    })
  }, [shufflePending])

  return (
    <button className="button-card-main button-shuffle-deck" onClick={startShuffle}>
      Mélanger
    </button>
  )
}

const animateDeckShuffle = ({ backCard, duration, onfinish }) => {
  backCard.setAttribute("shaking-deck", "")
  const timeoutId = setTimeout(() => {
    backCard.removeAttribute("shaking-deck", "")
    onfinish()
  }, duration)
  return () => {
    backCard.removeAttribute("shaking-deck", "")
    clearTimeout(timeoutId)
  }
}

const StartButton = ({ headerSmallCardRef, smallCardRef, backCardRef, topCardRef }) => {
  const animationsDisabled = useAnimationsDisabled()
  const activateCurrentCard = useActivateCurrentCard()

  const [cardActivating, cardActivatingSetter] = React.useState(false)

  const start = () => {
    if (cardActivating) {
      return
    }
    cardActivatingSetter(true)
  }

  React.useEffect(() => {
    if (!cardActivating) {
      return () => {}
    }

    if (animationsDisabled) {
      activateCurrentCard()
      return () => {}
    }

    return animateCardActivation({
      headerSmallCard: headerSmallCardRef.current,
      smallCard: smallCardRef.current,
      backCard: backCardRef.current,
      topCard: topCardRef.current,
      duration: 500,
      onfinish: () => {
        activateCurrentCard()
      },
    })
  }, [cardActivating])

  return (
    <button
      className="button-card-main button-activate-card"
      onClick={() => {
        start()
      }}
    >
      Commencer
    </button>
  )
}

const animateCardActivation = ({
  headerSmallCard,
  topCard,
  backCard,
  smallCard,
  duration,
  onfinish,
}) => {
  backCard.style.opacity = 0

  const headerSmallCardRectangle = getDomNodeRectangle(headerSmallCard)

  const topCardAnimation = topCard.animate(
    [
      {
        transform: "scale(1)",
        opacity: 1,
      },
      {
        transform: "scale(0)",
        opacity: 0,
      },
    ],
    {
      duration,
      fill: "forwards",
    },
  )

  const smallCardAnimation = smallCard.animate(
    [
      {
        transform: "scale(0)",
        opacity: 0,
        position: "fixed",
        top: `${headerSmallCardRectangle.top}.px`,
        left: `${headerSmallCardRectangle.left}.px`,
      },
      {
        transform: "scale(1)",
        opacity: 1,
        position: "fixed",
        top: `${headerSmallCardRectangle.top}.px`,
        left: `${headerSmallCardRectangle.left}.px`,
      },
    ],
    {
      duration,
      fill: "forwards",
    },
  )
  smallCardAnimation.onfinish = onfinish

  return () => {
    topCardAnimation.cancel()
    smallCardAnimation.cancel()
  }
}

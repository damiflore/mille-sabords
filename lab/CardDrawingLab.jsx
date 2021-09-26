import React from "react"

import {
  useCardIds,
  useDispatch,
  useCardUsedIds,
} from "root/src/app/main.store.js"
import { cardIdToCard, cardToSmallImageUrl } from "root/src/app/cards/cards.js"
import { useEndPlayerRound } from "root/src/app/round/round.actions.js"

export const CardDrawingLab = () => {
  const cardIds = useCardIds()
  const cardUsedIds = useCardUsedIds()
  const moveCardToTopOfTheDeck = useMoveCardToTopOfTheDeck()
  const moveCardToUsedCards = useMoveCardToUsedCards()
  const endPlayerRound = useEndPlayerRound()

  return (
    <form
      onSubmit={(submitEvent) => {
        submitEvent.preventDefault()
      }}
    >
      <fieldset className="next-card-lab">
        <legend>Prochaines cartes</legend>
        <ol>
          {cardIds.map((cardId) => {
            return (
              <li key={cardId}>
                <img src={cardToSmallImageUrl(cardIdToCard(cardId))} />
                <span>{cardIdToCard(cardId).type}</span>
                <button
                  onClick={() => {
                    moveCardToTopOfTheDeck(cardId)
                  }}
                >
                  Mettre en haut du paquet
                </button>
                <button
                  onClick={() => {
                    moveCardToUsedCards(cardId)
                  }}
                >
                  Utiliser
                </button>
              </li>
            )
          })}
        </ol>
      </fieldset>
      <fieldset>
        <legend>Cartes utilisées</legend>
        <ol>
          {cardUsedIds.map((cardId) => {
            return (
              <li key={cardId}>
                <span>{cardIdToCard(cardId).type}</span>
              </li>
            )
          })}
        </ol>
      </fieldset>
      <button
        onClick={() => {
          endPlayerRound()
        }}
      >
        End player round
      </button>
    </form>
  )
}

const useMoveCardToTopOfTheDeck = () => {
  const dispatch = useDispatch()
  return (cardId) => {
    dispatch((state) => {
      const { cardIds } = state
      const cardIndex = cardIds.indexOf(cardId)
      return {
        ...state,
        cardIds: [
          cardId,
          ...cardIds.slice(0, cardIndex),
          ...cardIds.slice(cardIndex + 1),
        ],
      }
    })
  }
}

const useMoveCardToUsedCards = () => {
  const dispatch = useDispatch()
  return (cardId) => {
    dispatch((state) => {
      const { cardIds, cardUsedIds } = state
      return {
        ...state,
        cardIds: cardIds.filter(
          (cardIdCandidate) => cardIdCandidate !== cardId,
        ),
        cardUsedIds: [...cardUsedIds, cardId],
      }
    })
  }
}

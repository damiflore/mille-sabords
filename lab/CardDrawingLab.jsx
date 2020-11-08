import React from "react"
import { useCardIds, useDispatch } from "src/main.store.js"
import {
  CARD_ANIMALS,
  CARD_COIN,
  CARD_DIAMOND,
  CARD_ONE_SKULL,
  CARD_TWO_SWORDS_CHALLENGE,
  CARD_THREE_SWORDS_CHALLENGE,
  CARD_FOUR_SWORDS_CHALLENGE,
  CARD_PIRATE,
  CARD_CHEST,
  CARD_TWO_SKULLS,
  CARD_WITCH,
  cardIdToCard,
} from "src/cards/cards.js"
import { useEndPlayerRound } from "src/round/round.actions.js"

export const CardDrawingLab = () => {
  const cardIds = useCardIds()
  const nextCardId = cardIds[0]
  const nextCard = cardIdToCard(nextCardId)
  const endPlayerRound = useEndPlayerRound()

  return (
    <form
      onSubmit={(submitEvent) => {
        submitEvent.preventDefault()
      }}
    >
      <fieldset>
        <legend>Next card in the deck</legend>
        {[
          CARD_ANIMALS,
          CARD_PIRATE,
          CARD_WITCH,
          CARD_CHEST,
          CARD_COIN,
          CARD_DIAMOND,
          CARD_ONE_SKULL,
          CARD_TWO_SKULLS,
          CARD_TWO_SWORDS_CHALLENGE,
          CARD_THREE_SWORDS_CHALLENGE,
          CARD_FOUR_SWORDS_CHALLENGE,
        ].map((cardType) => {
          return (
            <CardTypeButton
              key={cardType}
              cardType={cardType}
              nextCard={nextCard}
              cardIds={cardIds}
            />
          )
        })}
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

const CardTypeButton = ({ cardType, nextCard, cardIds }) => {
  const setNextCardId = useSetNextCardId()
  const isActive = nextCard.type === cardType
  const cardIdWithThisType = cardIds.find((cardId) => cardIdToCard(cardId).type === cardType)

  return (
    <button
      data-active={isActive ? "" : undefined}
      onClick={() => {
        if (isActive) {
          return
        }
        setNextCardId(cardIdWithThisType)
      }}
    >
      {cardType}
    </button>
  )
}

const useSetNextCardId = () => {
  const cardIds = useCardIds()
  const dispatch = useDispatch()
  return (nextCardId) => {
    dispatch((state) => {
      return {
        ...state,
        cardIds: [nextCardId, ...cardIds.slice(1)],
      }
    })
  }
}

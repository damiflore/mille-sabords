import React from "react"

import { GameContextProvider, useGameState, useGameDispatch } from "src/game.store.js"
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
  SYMBOL_SKULL,
} from "src/constants.js"
import { Game } from "src/game.component.js"

const link = document.createElement("link")
link.rel = "stylesheet"
link.type = "text/css"
link.href = "/lab/lab.css"
document.head.appendChild(link)

export const Lab = () => {
  const gameState = {
    diceCursed: [
      { id: 100, symbol: SYMBOL_SKULL },
      { id: 101, symbol: SYMBOL_SKULL },
    ],
  }

  return (
    <div id="lab">
      <GameContextProvider initialState={gameState}>
        <GameLab />
        <Game />
      </GameContextProvider>
    </div>
  )
}

const GameLab = () => {
  const state = useGameState()
  const { cardDeck } = state
  const setTotalScore = useSetTotalScore()
  const nextCard = cardDeck[0]

  return (
    <aside>
      <button
        onClick={() => {
          sessionStorage.clear()
        }}
      >
        Clear storage
      </button>
      <form
        onSubmit={(submitEvent) => {
          submitEvent.preventDefault()
        }}
      >
        <fieldset>
          <legend>Total score</legend>
          {[0, 3000, 5900].map((score) => {
            return (
              <button
                key={score}
                onClick={() => {
                  setTotalScore(score)
                }}
              >
                Set to {score}
              </button>
            )
          })}
        </fieldset>
      </form>
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
          ].map((card) => {
            return <NextCardInput active={card === nextCard} key={card} card={card} />
          })}
        </fieldset>
      </form>
    </aside>
  )
}

const NextCardInput = ({ active, card }) => {
  const setNextCard = useSetNextCard()

  return (
    <button
      data-active={active ? "" : undefined}
      onClick={() => {
        setNextCard(card)
      }}
    >
      {card}
    </button>
  )
}

const useSetTotalScore = () => {
  const dispatch = useGameDispatch()
  return (totalScore) => {
    dispatch((state) => {
      return { ...state, totalScore }
    })
  }
}

const useSetNextCard = () => {
  const { cardDeck } = useGameState()
  const dispatch = useGameDispatch()
  return (card) => {
    dispatch((state) => {
      return {
        ...state,
        cardDeck: [card, ...cardDeck.slice(1)],
      }
    })
  }
}

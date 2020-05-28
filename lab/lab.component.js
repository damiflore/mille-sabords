import React from "react"

import {
  GameContextProvider,
  useGameState,
  useGameDispatch,
  useGameNode,
} from "src/game.context.js"
import {
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_MONKEY,
  SYMBOL_PARROT,
  SYMBOL_SKULL,
  SYMBOL_SWORD,
} from "src/constants.js"
import { faces } from "src/dices/dices.js"
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
} from "src/cards/cards.js"
import { createDiceOnSkull } from "src/test/test.material.js"
import { Game } from "src/game.component.js"

const link = document.createElement("link")
link.rel = "stylesheet"
link.type = "text/css"
link.href = "/lab/lab.css"
document.head.appendChild(link)

export const Lab = () => {
  const gameState = {
    diceCursed: [createDiceOnSkull(), createDiceOnSkull()],
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
  const { cardDeck, dices } = state
  const setTotalScore = useSetTotalScore()
  const nextCard = cardDeck[0]

  return (
    <aside>
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
      <form
        onSubmit={(submitEvent) => {
          submitEvent.preventDefault()
        }}
      >
        <fieldset>
          <legend>Dices</legend>
          {dices.map((dice) => {
            return <DiceVariants key={dice.id} dice={dice} />
          })}
        </fieldset>
      </form>
      <button
        onClick={() => {
          sessionStorage.clear()
        }}
      >
        Clear storage
      </button>
    </aside>
  )
}

const VARIANTS = [
  "random",
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_MONKEY,
  SYMBOL_PARROT,
  SYMBOL_SKULL,
  SYMBOL_SWORD,
]

const DiceVariants = ({ dice }) => {
  const diceNode = useGameNode(dice.id)

  return (
    <div className="dice-variants">
      <button
        disabled={!diceNode}
        onClick={() => {
          const outline = diceNode.style.outline
          diceNode.style.outline = "5px solid red"
          setTimeout(() => {
            diceNode.style.outline = outline
          }, 1000)
        }}
      >
        inspect
      </button>
      {VARIANTS.map((variant) => {
        return <DiceVariant key={variant} variant={variant} dice={dice} />
      })}
    </div>
  )
}

const diceIsCheated = (dice) => dice.faces[0] === dice.faces[1]

const DiceVariant = ({ dice, variant }) => {
  const isCurrent = diceIsCheated(dice) ? dice.faces[0] === variant : variant === "random"
  const dispatch = useGameDispatch()

  return (
    <button
      className="dice-variant"
      data-active={isCurrent ? "" : undefined}
      // should also be disabled if the dice is in kept area (but we don't iterate over thoose)
      disabled={isCurrent}
      onClick={() => {
        if (variant === "random") {
          dice.faces = faces
        } else {
          dice.faces = dice.faces.map(() => variant)
        }
        console.log(dice)
        dispatch((state) => {
          return { ...state }
        })
      }}
    >
      {variant === "random" ? (
        "?"
      ) : (
        <img width="32" height="32" src={`src/dices/assets/dice_${variant}.png`} />
      )}
    </button>
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
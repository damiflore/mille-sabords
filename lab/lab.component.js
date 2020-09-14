import React from "react"

import {
  GameContextProvider,
  useCardDeck,
  useDicesRolled,
  useDicesCursed,
  useChestSlots,
  useGameDispatch,
  useDiceDomNode,
} from "src/game.store.js"

import {
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_MONKEY,
  SYMBOL_PARROT,
  SYMBOL_SKULL,
  SYMBOL_SWORD,
} from "src/symbols/symbols.js"
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
// import { createSkullFromDice } from "src/test/test.material.js"
import { Stylesheet } from "src/generic/Stylesheet.jsx"
import { Game } from "src/game.component.js"

export const Lab = () => {
  const gameState = {
    totalScore: 100,
  }

  return (
    <div id="lab">
      <Stylesheet href="/lab/lab.css" />
      <GameContextProvider initialState={gameState}>
        <GameLab />
        <Game />
      </GameContextProvider>
    </div>
  )
}

const GameLab = () => {
  const cardDeck = useCardDeck()
  const dicesRolled = useDicesRolled()
  const chestSlots = useChestSlots()
  const dicesCursed = useDicesCursed()
  const setTotalScore = useSetTotalScore()
  const nextCard = cardDeck[0]

  const dicesKept = Object.keys(chestSlots)
    .filter((chestSlot) => chestSlots[chestSlot] && chestSlots[chestSlot].type === "dice")
    .map((chestSlot) => chestSlots[chestSlot].value)

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
          <legend>Dices rolled</legend>
          {dicesRolled.map((dice) => {
            return <DiceVariants key={dice.id} dice={dice} />
          })}
        </fieldset>
        <fieldset>
          <legend>Dices cursed</legend>
          {dicesCursed.map((dice) => {
            return <DiceVariants key={dice.id} dice={dice} />
          })}
        </fieldset>
        <fieldset>
          <legend>Dices kept</legend>
          {dicesKept.map((dice) => {
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
  const diceDomNode = useDiceDomNode(dice.id)

  return (
    <div className="dice-variants">
      <button
        disabled={!diceDomNode}
        onClick={() => {
          const outline = diceDomNode.style.outline
          diceDomNode.style.outline = "5px solid red"
          setTimeout(() => {
            diceDomNode.style.outline = outline
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
        // force re-render of rolled, cursed and kept area
        // (in theory we could optimize to render depening where the dice is)
        dispatch((state) => {
          const { dicesRolled, dicesCursed, chestSlots } = state
          return {
            ...state,
            dicesRolled: [...dicesRolled],
            dicesCursed: [...dicesCursed],
            chestSlots: { ...chestSlots },
          }
        })
      }}
    >
      {variant === "random" ? (
        "?"
      ) : (
        <img width="32" height="32" src={`src/dices/dice_${variant}.png`} />
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
  const cardDeck = useCardDeck()
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

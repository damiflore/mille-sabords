/* eslint-disable import/max-dependencies */
import React from "react"

import {
  useCardIds,
  useDiceRolledIds,
  useDiceCursedIds,
  useChestSlots,
  useDispatch,
  useRoundStarted,
} from "src/main.store.js"
import { useDiceDomNode } from "src/dom/dom.main.js"
import { ContextProvider } from "src/main.context.js"

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
import { Main } from "src/main.component.js"
import { useCurrentPlayer } from "src/round/round.selectors.js"
import labCssUrl from "mille-sabords/lab/lab.css"

export const Lab = () => {
  const [labOpened, labOpenedSetter] = React.useState(
    localStorage.getItem("lab-menu-opened") || false,
  )
  React.useEffect(() => {
    localStorage.setItem("lab-menu-opened", labOpened)
  }, [labOpened])
  const openLab = React.useCallback(() => labOpenedSetter(true))
  const closeLab = React.useCallback(() => labOpenedSetter(false))

  return (
    <div id="lab">
      <Stylesheet href={labCssUrl} />
      <ContextProvider>
        <Main />
        {labOpened ? <GameLab closeLab={closeLab} /> : <ButtonOpenLab onClick={openLab} />}
      </ContextProvider>
    </div>
  )
}

const GameLab = ({ closeLab }) => {
  const roundStarted = useRoundStarted()

  return (
    <aside>
      <ButtonCloseLab onClick={closeLab} />
      {roundStarted ? <RoundLab /> : `Waiting for a round to start`}
    </aside>
  )
}

const RoundLab = () => {
  const cardDeck = useCardIds()
  const dicesRolled = useDiceRolledIds()
  const chestSlots = useChestSlots()
  const dicesCursed = useDiceCursedIds()
  const setCurrentPlayerScore = useSetCurrentPlayerScore()

  const nextCard = cardDeck[0]

  const dicesKept = Object.keys(chestSlots)
    .filter((chestSlot) => chestSlots[chestSlot] && chestSlots[chestSlot].type === "dice")
    .map((chestSlot) => chestSlots[chestSlot].value)

  return (
    <>
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
                  setCurrentPlayerScore(score)
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
          localStorage.clear()
        }}
      >
        Clear storage
      </button>
    </>
  )
}

const ButtonOpenLab = ({ onClick }) => {
  return (
    <button className="button-open-lab" onClick={onClick}>
      <svg viewBox="0 -53 384 384">
        <path
          fill="currentColor"
          d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
        />
        <path
          fill="currentColor"
          d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
        />
        <path
          fill="currentColor"
          d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
        />
      </svg>
    </button>
  )
}

const ButtonCloseLab = ({ onClick }) => {
  return (
    <button className="button-close-lab" onClick={onClick}>
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M10.586 12L3.515 4.929a1 1 0 011.414-1.414L12 10.585l7.071-7.07a1 1 0 011.414 1.414L13.415 12l7.07 7.071a1 1 0 01-1.414 1.414L12 13.415l-7.071 7.07a1 1 0 01-1.414-1.414L10.585 12z"
        ></path>
      </svg>
    </button>
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
  const dispatch = useDispatch()

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

const useSetCurrentPlayerScore = () => {
  const dispatch = useDispatch()
  return (score) => {
    dispatch((state) => {
      const { currentPlayerId, players } = state
      const currentPlayer = useCurrentPlayer(currentPlayerId, { players })
      currentPlayer.score = score
      return {
        ...state,
        players: [...players],
      }
    })
  }
}

const useSetNextCard = () => {
  const cardIds = useCardIds()
  const dispatch = useDispatch()
  return (card) => {
    dispatch((state) => {
      return {
        ...state,
        cardDeck: [card.id, ...cardIds.slice(1)],
      }
    })
  }
}

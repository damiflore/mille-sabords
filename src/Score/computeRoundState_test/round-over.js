import { assert } from "@dmail/assert"
import {
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
  SYMBOL_SKULL,
  SYMBOL_DIAMOND,
} from "/src/symbols/symbol-types.js"
import { CARD_ANIMALS } from "src/Cards/card-types.js"
import { computeRoundState } from "../ScoreHelpers.js"

// with 3 skulls
{
  const actual = computeRoundState({
    currentCard: { type: CARD_ANIMALS },
    diceCursed: [SYMBOL_SKULL, SYMBOL_SKULL, SYMBOL_SKULL],
    diceKept: [
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
      SYMBOL_DIAMOND,
    ],
    rollIndex: 1,
    scoreMarked: false,
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: true,
    isRoundOver: true,
    score: 0,
  }
  assert({ actual, expected })
}

// with 4 skulls - First round
{
  const actual = computeRoundState({
    currentCard: { type: CARD_ANIMALS },
    diceCursed: [
      { symbol: SYMBOL_SKULL },
      { symbol: SYMBOL_SKULL },
      { symbol: SYMBOL_SKULL },
      { symbol: SYMBOL_SKULL },
    ],
    diceKept: [
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_SWORD },
      SYMBOL_SWORD,
    ],
    rollIndex: 0,
    scoreMarked: false,
  })
  const expected = {
    isOnSkullIsland: true,
    hasThreeSkullsOrMore: true,
    isRoundOver: true,
    score: 0,
  }
  assert({ actual, expected })
}

// with 4 skulls - Second round
{
  const actual = computeRoundState({
    currentCard: { type: CARD_ANIMALS },
    diceCursed: [
      { symbol: SYMBOL_SKULL },
      { symbol: SYMBOL_SKULL },
      { symbol: SYMBOL_SKULL },
      { symbol: SYMBOL_SKULL },
    ],
    diceKept: [
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_SWORD },
      SYMBOL_SWORD,
    ],
    rollIndex: 1,
    scoreMarked: false,
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: true,
    isRoundOver: true,
    score: 0,
  }
  assert({ actual, expected })
}

// user has clicked on "Mark score"
{
  const actual = computeRoundState({
    currentCard: { type: CARD_ANIMALS },
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_DIAMOND },
      { symbol: SYMBOL_DIAMOND },
    ],
    rollIndex: 1,
    scoreMarked: true,
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: true,
    score: 0,
  }
  assert({ actual, expected })
}

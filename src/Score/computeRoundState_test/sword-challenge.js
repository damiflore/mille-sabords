import { assert } from "@dmail/assert"
import {
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
  SYMBOL_SKULL,
  SYMBOL_COIN,
} from "/src/symbols/symbol-types.js"
import { CARD_SWORD_CHALLENGE } from "src/Cards/card-types.js"
import { computeRoundState } from "../ScoreHelpers.js"

// 8 coin
{
  const actual = computeRoundState({
    currentCard: { type: CARD_SWORD_CHALLENGE, goal: 2, gamble: 300 },
    diceCursed: [],
    diceKept: [
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
    ],
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: -300,
  }
  assert({ actual, expected })
}

// 2 sword completed with 2 sword
{
  const actual = computeRoundState({
    currentCard: { type: CARD_SWORD_CHALLENGE, goal: 2, gamble: 300 },
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
    ],
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 300,
  }
  assert({ actual, expected })
}

// 2 sword completed with 3 sword
{
  const actual = computeRoundState({
    currentCard: { type: CARD_SWORD_CHALLENGE, goal: 2, gamble: 300 },
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
    ],
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 400,
  }
  assert({ actual, expected })
}

// 3 skulls
{
  const actual = computeRoundState({
    currentCard: { type: CARD_SWORD_CHALLENGE, goal: 2, gamble: 300 },
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      SYMBOL_COIN,
    ],
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: true,
    isRoundOver: true,
    score: -300,
  }
  assert({ actual, expected })
}

import { assert } from "@dmail/assert"
import {
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
  SYMBOL_SKULL,
  SYMBOL_COIN,
} from "/src/symbols/symbol-types.js"
import { CARD_PIRATE } from "src/Cards/card-types.js"
import { computeRoundState } from "../ScoreHelpers.js"

// with nothing
{
  const actual = computeRoundState({
    card: { type: CARD_PIRATE },
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_MONKEY },
    ],
  })
  const expected = {
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 0,
  }
  assert({ actual, expected })
}

// with 3 coin
{
  const actual = computeRoundState({
    card: { type: CARD_PIRATE },
    diceCursed: [{ symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
    ],
  })
  const expected = {
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 800,
  }
  assert({ actual, expected })
}

// with 3 coin + 5 sword
{
  const actual = computeRoundState({
    card: { type: CARD_PIRATE },
    diceCursed: [],
    diceKept: [
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
    ],
  })
  // 300 from 3 coins
  // 100 from 3 coins
  // 500 from 5 swords
  // 500 from "perfect" rule
  // x2 from pirate
  // -> 2800
  const expected = {
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 2800,
  }
  assert({ actual, expected })
}

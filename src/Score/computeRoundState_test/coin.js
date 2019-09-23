import { assert } from "@dmail/assert"
import {
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
  SYMBOL_SKULL,
  SYMBOL_COIN,
} from "/src/symbols/symbol-types.js"
import { CARD_COIN } from "src/Cards/card-types.js"
import { computeRoundState } from "../ScoreHelpers.js"

// with nothing
{
  const actual = computeRoundState({
    card: { type: CARD_COIN },
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
    score: 100,
  }
  assert({ actual, expected })
}

// with 7 coin + 1 parrot
{
  const actual = computeRoundState({
    card: { type: CARD_COIN },
    diceCursed: [],
    diceKept: [
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_PARROT },
    ],
  })
  // 4000 from "8 identic symbols"
  // 800 from "coin = 100"
  // -> 4800
  const expected = {
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 4800,
  }
  assert({ actual, expected })
}

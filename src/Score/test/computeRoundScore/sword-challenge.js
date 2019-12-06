import { assert } from "@jsenv/assert"
import {
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
  SYMBOL_SKULL,
  SYMBOL_COIN,
} from "src/symbols/symbol-types.js"
import { CARD_SWORD_CHALLENGE } from "src/Cards/card-types.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"

// 8 coin
{
  const actual = computeRoundScore({
    card: { type: CARD_SWORD_CHALLENGE, goal: 2, gamble: 300 },
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
    markScoreAllowed: true,
  })
  const expected = -300
  assert({ actual, expected })
}

// 2 sword completed with 2 sword
{
  const actual = computeRoundScore({
    card: { type: CARD_SWORD_CHALLENGE, goal: 2, gamble: 300 },
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
    ],
    markScoreAllowed: true,
  })
  const expected = 300
  assert({ actual, expected })
}

// 2 sword completed with 3 sword
{
  const actual = computeRoundScore({
    card: { type: CARD_SWORD_CHALLENGE, goal: 2, gamble: 300 },
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
    ],
    markScoreAllowed: true,
  })
  const expected = 400
  assert({ actual, expected })
}

// cannot mark score (because 3skulls)
{
  const actual = computeRoundScore({
    card: { type: CARD_SWORD_CHALLENGE, goal: 2, gamble: 300 },
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      SYMBOL_COIN,
    ],
    markScoreAllowed: false,
  })
  const expected = -300
  assert({ actual, expected })
}
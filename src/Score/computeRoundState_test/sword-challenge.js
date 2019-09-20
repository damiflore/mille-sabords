import { assert } from "@dmail/assert"
import {
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
  SYMBOL_SKULL,
  SYMBOL_COIN,
} from "/src/symbols/symbol-types.js"
import { CARD_SWORD_CHALLENGE } from "src/Cards/card-types.js"
// eslint-disable-next-line import/named
import { computeScore } from "../ScoreHelpers.js"

// 8 coin
{
  const actual = computeScore({
    currentCard: { type: CARD_SWORD_CHALLENGE, goal: 2, gamble: 300 },
    symbolArrayFromDiceKept: [
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
    ],
  })
  const expected = -300
  assert({ actual, expected })
}

// 2 sword completed with 2 sword
{
  const actual = computeScore({
    currentCard: { type: CARD_SWORD_CHALLENGE, goal: 2, gamble: 300 },
    symbolArrayFromDiceKept: [
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
      SYMBOL_SKULL,
      SYMBOL_SKULL,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
    ],
  })
  const expected = 300
  assert({ actual, expected })
}

// 2 sword completed with 3 sword
{
  const actual = computeScore({
    currentCard: { type: CARD_SWORD_CHALLENGE, goal: 2, gamble: 300 },
    symbolArrayFromDiceKept: [
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_MONKEY,
      SYMBOL_SKULL,
      SYMBOL_SKULL,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
    ],
  })
  const expected = 400
  assert({ actual, expected })
}

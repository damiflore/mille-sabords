import { assert } from "@dmail/assert"
import {
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
  SYMBOL_SKULL,
  SYMBOL_COIN,
} from "/src/symbols/symbol-types.js"
import { CARD_COIN } from "src/Cards/card-types.js"
// eslint-disable-next-line import/named
import { computeScore } from "../ScoreHelpers.js"

// with nothing
{
  const actual = computeScore({
    currentCard: { type: CARD_COIN },
    symbolArrayFromDiceKept: [
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
      SYMBOL_SKULL,
      SYMBOL_SKULL,
    ],
  })
  const expected = 100
  assert({ actual, expected })
}

// with 7 coin + 1 parrot
{
  const actual = computeScore({
    currentCard: { type: CARD_COIN },
    symbolArrayFromDiceKept: [
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_PARROT,
    ],
  })
  // 4000 from "8 identic symbols"
  // 800 from "coin = 100"
  // -> 4800
  const expected = 4800
  assert({ actual, expected })
}

import { assert } from "@dmail/assert"
import {
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
  SYMBOL_SKULL,
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
} from "/src/symbols/symbol-types.js"
import { CARD_ANIMALS } from "src/Cards/card-types.js"
import { computeScore } from "../ScoreHelpers.js"

// with 1 coin and 1 damond
{
  const actual = computeScore({
    currentCard: { type: CARD_ANIMALS },
    diceKept: [
      SYMBOL_PARROT,
      SYMBOL_MONKEY,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_SKULL,
      SYMBOL_SKULL,
      SYMBOL_COIN,
      SYMBOL_DIAMOND,
    ],
  })
  const expected = 200
  assert({ actual, expected })
}

// with 3 monkey and 2 parrot
{
  const actual = computeScore({
    currentCard: { type: CARD_ANIMALS },
    diceKept: [
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_SKULL,
      SYMBOL_SKULL,
      SYMBOL_SWORD,
    ],
  })
  const expected = 500
  assert({ actual, expected })
}

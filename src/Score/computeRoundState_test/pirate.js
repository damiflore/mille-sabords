import { assert } from "@dmail/assert"
import {
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
  SYMBOL_SKULL,
  SYMBOL_COIN,
} from "/src/symbols/symbol-types.js"
import { CARD_PIRATE } from "src/Cards/card-types.js"
// eslint-disable-next-line import/named
import { computeScore } from "../ScoreHelpers.js"

// with nothing
{
  const actual = computeScore({
    currentCard: { type: CARD_PIRATE },
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
  const expected = 0
  assert({ actual, expected })
}

// with 3 coin
{
  const actual = computeScore({
    currentCard: { type: CARD_PIRATE },
    symbolArrayFromDiceKept: [
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_SKULL,
    ],
  })
  const expected = 800
  assert({ actual, expected })
}

// with 3 coin + 5 sword
{
  const actual = computeScore({
    currentCard: { type: CARD_PIRATE },
    symbolArrayFromDiceKept: [
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
    ],
  })
  // 300 from 3 coins
  // 100 from 3 coins
  // 500 from 5 swords
  // 500 from "perfect" rule
  // x2 from pirate
  // -> 2800
  const expected = 2800
  assert({ actual, expected })
}

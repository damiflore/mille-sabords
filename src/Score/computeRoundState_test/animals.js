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
import { computeRoundState } from "../ScoreHelpers.js"

// with 1 coin and 1 diamond
{
  const actual = computeRoundState({
    currentCard: { type: CARD_ANIMALS },
    symbolArrayFromDiceKept: [
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
  const expected = {
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    isOnSkullIsland: false,
    score: 200,
  }
  assert({ actual, expected })
}

// with 3 monkey and 2 parrot
{
  const actual = computeRoundState({
    currentCard: { type: CARD_ANIMALS },
    symbolArrayFromDiceKept: [
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
  const expected = {
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    isOnSkullIsland: false,
    score: 500,
  }
  assert({ actual, expected })
}

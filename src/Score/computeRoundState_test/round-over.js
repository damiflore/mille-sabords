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
    symbolArrayFromDiceKept: [
      SYMBOL_PARROT,
      SYMBOL_MONKEY,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_SKULL,
      SYMBOL_SKULL,
      SYMBOL_SKULL,
      SYMBOL_DIAMOND,
    ],
    currentRoundIndex: 2,
    scoreMarked: false,
  })
  const expected = {
    hasThreeSkullsOrMore: true,
    isRoundOver: true,
    isOnSkullIsland: false,
    score: 0,
  }
  assert({ actual, expected })
}

// with 4 skulls - First round
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
      SYMBOL_SKULL,
      SYMBOL_SKULL,
    ],
    currentRoundIndex: 1,
    scoreMarked: false,
  })
  const expected = {
    hasThreeSkullsOrMore: true,
    isRoundOver: true,
    isOnSkullIsland: true,
    score: 0,
  }
  assert({ actual, expected })
}

// with 4 skulls - Second round
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
      SYMBOL_SKULL,
      SYMBOL_SKULL,
    ],
    currentRoundIndex: 2,
    scoreMarked: false,
  })
  const expected = {
    hasThreeSkullsOrMore: true,
    isRoundOver: true,
    isOnSkullIsland: false,
    score: 0,
  }
  assert({ actual, expected })
}

// user has clicked on "Mark score"
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
      SYMBOL_DIAMOND,
      SYMBOL_DIAMOND,
    ],
    currentRoundIndex: 2,
    scoreMarked: true,
  })
  const expected = {
    hasThreeSkullsOrMore: false,
    isRoundOver: true,
    isOnSkullIsland: false,
    score: 0,
  }
  assert({ actual, expected })
}


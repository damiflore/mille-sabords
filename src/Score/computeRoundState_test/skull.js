import { assert } from "@dmail/assert"
import {
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
  SYMBOL_SKULL,
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
} from "/src/symbols/symbol-types.js"
import { CARD_SKULL } from "src/Cards/card-types.js"
import { computeRoundState } from "../ScoreHelpers.js"

// with 2 skulls (dice) + 1 sull (card)
{
  const actual = computeRoundState({
    currentCard: { type: CARD_SKULL, skullAmount: 1},
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
    hasThreeSkullsOrMore: true,
    isRoundOver: true,
    isOnSkullIsland: false,
    score: 0,
  }
  assert({ actual, expected })
}

// with 2 skulls (dice) + 2 sull (card) - First round
{
    const actual = computeRoundState({
      currentCard: { type: CARD_SKULL, skullAmount: 2},
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
      currentRoundIndex: 1
    })
    const expected = {
      hasThreeSkullsOrMore: true,
      isRoundOver: true,
      isOnSkullIsland: true,
      score: 0,
    }
    assert({ actual, expected })
  }

// with 2 skulls (dice) + 2 sull (card) - Second round
{
    const actual = computeRoundState({
      currentCard: { type: CARD_SKULL, skullAmount: 2},
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
      currentRoundIndex: 2
    })
    const expected = {
      hasThreeSkullsOrMore: true,
      isRoundOver: true,
      isOnSkullIsland: false,
      score: 0,
    }
    assert({ actual, expected })
  }


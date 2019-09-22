import { assert } from "@dmail/assert"
import {
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SWORD,
  SYMBOL_SKULL,
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
} from "/src/symbols/symbol-types.js"
import { CARD_CHEST } from "src/Cards/card-types.js"
import { computeRoundState } from "../ScoreHelpers.js"

// with nothing
{
  const actual = computeRoundState({
    currentCard: { type: CARD_CHEST },
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
    ],
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 0,
  }
  assert({ actual, expected })
}

// with 3 parrot
{
  const actual = computeRoundState({
    currentCard: { type: CARD_CHEST },
    diceCursed: [{ symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
    ],
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 100,
  }
  assert({ actual, expected })
}

// with 4 parrot
{
  const actual = computeRoundState({
    currentCard: { type: CARD_CHEST },
    diceCursed: [],
    diceKept: [
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
    ],
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 200,
  }
  assert({ actual, expected })
}

// with 5 parrot
{
  const actual = computeRoundState({
    currentCard: { type: CARD_CHEST },
    diceCursed: [{ symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_MONKEY },
    ],
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 500,
  }
  assert({ actual, expected })
}

// with 6 parrot
{
  const actual = computeRoundState({
    currentCard: { type: CARD_CHEST },
    diceCursed: [],
    diceKept: [
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_MONKEY },
    ],
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 1000,
  }
  assert({ actual, expected })
}

// with 7 parrot
{
  const actual = computeRoundState({
    currentCard: { type: CARD_CHEST },
    diceCursed: [],
    diceKept: [
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
    ],
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 2000,
  }
  assert({ actual, expected })
}

// with 8 parrot
{
  const actual = computeRoundState({
    currentCard: { type: CARD_CHEST },
    diceCursed: [],
    diceKept: [
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
    ],
  })
  // 4000 from "8 identic symbols"
  // 500 from "perfect" rule
  // -> 4500
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 4500,
  }
  assert({ actual, expected })
}

// with 1 coin
{
  const actual = computeRoundState({
    currentCard: { type: CARD_CHEST },
    diceCursed: [{ symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
    ],
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 100,
  }
  assert({ actual, expected })
}

// with 1 diamond
{
  const actual = computeRoundState({
    currentCard: { type: CARD_CHEST },
    diceCursed: [{ symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_DIAMOND },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
    ],
  })
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 100,
  }
  assert({ actual, expected })
}

// with 3 coin
{
  const actual = computeRoundState({
    currentCard: { type: CARD_CHEST },
    diceCursed: [{ symbol: SYMBOL_SKULL }],
    diceKept: [
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
    ],
  })
  // 100 from 3 identic coin
  // 300 from 3 coin
  // -> 400
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 400,
  }
  assert({ actual, expected })
}

// with 3 parrot and 3 diamond
{
  const actual = computeRoundState({
    currentCard: { type: CARD_CHEST },
    diceCursed: [],
    diceKept: [
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_DIAMOND },
      { symbol: SYMBOL_DIAMOND },
      { symbol: SYMBOL_DIAMOND },
      { symbol: SYMBOL_SWORD },
      { symbol: SYMBOL_SWORD },
    ],
  })
  // 100 from 3 identic parrot
  // 100 from 3 identic diamond
  // 300 from 3 diamond
  // -> 500
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 500,
  }
  assert({ actual, expected })
}

// with 3 parrot and 3 monkey and 2 coin
{
  const actual = computeRoundState({
    currentCard: { type: CARD_CHEST },
    diceCursed: [],
    diceKept: [
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_PARROT },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_MONKEY },
      { symbol: SYMBOL_COIN },
      { symbol: SYMBOL_COIN },
    ],
  })
  // 100 from 3 identic parrot
  // 100 from 3 identic monkey
  // 200 from 2 coin
  // 500 from "perfect" rule
  // -> 900
  const expected = {
    isOnSkullIsland: false,
    hasThreeSkullsOrMore: false,
    isRoundOver: false,
    score: 900,
  }
  assert({ actual, expected })
}

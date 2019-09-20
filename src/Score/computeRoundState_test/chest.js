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
// eslint-disable-next-line import/named
import { computeScore } from "../ScoreHelpers.js"

// with nothing
{
  const actual = computeScore({
    currentCard: { type: CARD_CHEST },
    symbolArrayFromDiceKept: [
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_SKULL,
      SYMBOL_SKULL,
    ],
  })
  const expected = 0
  assert({ actual, expected })
}

// with 3 parrot
{
  const actual = computeScore({
    currentCard: { type: CARD_CHEST },
    symbolArrayFromDiceKept: [
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_SKULL,
    ],
  })
  const expected = 100
  assert({ actual, expected })
}

// with 4 parrot
{
  const actual = computeScore({
    currentCard: { type: CARD_CHEST },
    symbolArrayFromDiceKept: [
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
    ],
  })
  const expected = 200
  assert({ actual, expected })
}

// with 5 parrot
{
  const actual = computeScore({
    currentCard: { type: CARD_CHEST },
    symbolArrayFromDiceKept: [
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
      SYMBOL_SKULL,
    ],
  })
  const expected = 500
  assert({ actual, expected })
}

// with 6 parrot
{
  const actual = computeScore({
    currentCard: { type: CARD_CHEST },
    symbolArrayFromDiceKept: [
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
    ],
  })
  const expected = 1000
  assert({ actual, expected })
}

// with 7 parrot
{
  const actual = computeScore({
    currentCard: { type: CARD_CHEST },
    symbolArrayFromDiceKept: [
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_MONKEY,
    ],
  })
  const expected = 2000
  assert({ actual, expected })
}

// with 8 parrot
{
  const actual = computeScore({
    currentCard: { type: CARD_CHEST },
    symbolArrayFromDiceKept: [
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
    ],
  })
  // 4000 from "8 identic symbols"
  // 500 from "perfect" rule
  // -> 4500
  const expected = 4500
  assert({ actual, expected })
}

// with 1 coin
{
  const actual = computeScore({
    currentCard: { type: CARD_CHEST },
    symbolArrayFromDiceKept: [
      SYMBOL_COIN,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_SKULL,
    ],
  })
  const expected = 100
  assert({ actual, expected })
}

// with 1 diamond
{
  const actual = computeScore({
    currentCard: { type: CARD_CHEST },
    symbolArrayFromDiceKept: [
      SYMBOL_DIAMOND,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_SKULL,
    ],
  })
  const expected = 100
  assert({ actual, expected })
}

// with 3 coin
{
  const actual = computeScore({
    currentCard: { type: CARD_CHEST },
    symbolArrayFromDiceKept: [
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_COIN,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
      SYMBOL_SKULL,
    ],
  })
  // 100 from 3 identic coin
  // 300 from 3 coin
  // -> 400
  const expected = 400
  assert({ actual, expected })
}

// with 3 parrot and 3 diamond
{
  const actual = computeScore({
    currentCard: { type: CARD_CHEST },
    symbolArrayFromDiceKept: [
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_DIAMOND,
      SYMBOL_DIAMOND,
      SYMBOL_DIAMOND,
      SYMBOL_SWORD,
      SYMBOL_SWORD,
    ],
  })
  // 100 from 3 identic parrot
  // 100 from 3 identic diamond
  // 300 from 3 diamond
  // -> 500
  const expected = 500
  assert({ actual, expected })
}

// with 3 parrot and 3 monkey and 2 coin
{
  const actual = computeScore({
    currentCard: { type: CARD_CHEST },
    symbolArrayFromDiceKept: [
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_PARROT,
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
      SYMBOL_MONKEY,
      SYMBOL_COIN,
      SYMBOL_COIN,
    ],
  })
  // 100 from 3 identic parrot
  // 100 from 3 identic monkey
  // 200 from 2 coin
  // 500 from "perfect" rule
  // -> 900
  const expected = 900
  assert({ actual, expected })
}

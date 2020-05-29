import { assert } from "@jsenv/assert"
import { CARD_CHEST } from "src/cards/cards.js"
import {
  createCoinFromDice,
  createDiamondFromDice,
  createSwordFromDice,
  createMonkeyFromDice,
  createParrotFromDice,
} from "src/test/test.material.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"

// with nothing
{
  const actual = computeRoundScore({
    card: CARD_CHEST,
    symbolsFromDicesKept: [
      createParrotFromDice(),
      createParrotFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 0
  assert({ actual, expected })
}

// with 3 parrot
{
  const actual = computeRoundScore({
    card: CARD_CHEST,
    symbolsFromDicesKept: [
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 100
  assert({ actual, expected })
}

// with 4 parrot
{
  const actual = computeRoundScore({
    card: CARD_CHEST,
    symbolsFromDicesKept: [
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 200
  assert({ actual, expected })
}

// with 5 parrot
{
  const actual = computeRoundScore({
    card: CARD_CHEST,
    symbolsFromDicesKept: [
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 500
  assert({ actual, expected })
}

// with 6 parrot
{
  const actual = computeRoundScore({
    card: CARD_CHEST,
    symbolsFromDicesKept: [
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 1000
  assert({ actual, expected })
}

// with 7 parrot
{
  const actual = computeRoundScore({
    card: CARD_CHEST,
    symbolsFromDicesKept: [
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createMonkeyFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 2000
  assert({ actual, expected })
}

// with 8 parrot
{
  const actual = computeRoundScore({
    card: CARD_CHEST,
    symbolsFromDicesKept: [
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
    ],
    markScoreAllowed: true,
  })
  // 4000 from "8 identic symbols"
  // 500 from "perfect" rule
  // -> 4500
  const expected = 4500
  assert({ actual, expected })
}

// with 1 coin
{
  const actual = computeRoundScore({
    card: CARD_CHEST,
    symbolsFromDicesKept: [
      createCoinFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 100
  assert({ actual, expected })
}

// with 1 diamond
{
  const actual = computeRoundScore({
    card: CARD_CHEST,
    symbolsFromDicesKept: [
      createDiamondFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 100
  assert({ actual, expected })
}

// with 3 coin
{
  const actual = computeRoundScore({
    card: CARD_CHEST,
    symbolsFromDicesKept: [
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
    ],
    markScoreAllowed: true,
  })
  // 100 from 3 identic coin
  // 300 from 3 coin
  // -> 400
  const expected = 400
  assert({ actual, expected })
}

// with 3 parrot and 3 diamond
{
  const actual = computeRoundScore({
    card: CARD_CHEST,
    symbolsFromDicesKept: [
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createDiamondFromDice(),
      createDiamondFromDice(),
      createDiamondFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
    ],
    markScoreAllowed: true,
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
  const actual = computeRoundScore({
    card: CARD_CHEST,
    symbolsFromDicesKept: [
      createParrotFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
    ],
    markScoreAllowed: true,
  })
  // 100 from 3 identic parrot
  // 100 from 3 identic monkey
  // 200 from 2 coin
  // 500 from "perfect" rule
  // -> 900
  const expected = 900
  assert({ actual, expected })
}

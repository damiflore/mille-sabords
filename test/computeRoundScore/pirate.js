import { assert } from "@jsenv/assert"
import { CARD_PIRATE } from "src/cards/cards.js"
import {
  createCoinFromDice,
  createSwordFromDice,
  createMonkeyFromDice,
  createParrotFromDice,
} from "../test.material.js"
import { computeRoundScore } from "src/score/computeRoundScore.js"

// with nothing
{
  const actual = computeRoundScore({
    card: CARD_PIRATE,
    symbolsFromDicesKept: [
      createSwordFromDice(),
      createSwordFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 0
  assert({ actual, expected })
}

// with 3 coin
{
  const actual = computeRoundScore({
    card: CARD_PIRATE,
    symbolsFromDicesKept: [
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 800
  assert({ actual, expected })
}

// with 3 coin + 5 sword
{
  const actual = computeRoundScore({
    card: CARD_PIRATE,
    symbolsFromDicesKept: [
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
    ],
    markScoreAllowed: true,
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

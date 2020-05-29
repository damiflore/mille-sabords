import { assert } from "@jsenv/assert"
import { CARD_COIN } from "src/cards/cards.js"
import {
  createCoinFromDice,
  createSwordFromDice,
  createMonkeyFromDice,
  createParrotFromDice,
} from "src/test/test.material.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"

// with nothing
{
  const actual = computeRoundScore({
    card: CARD_COIN,
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
  const expected = 100
  assert({ actual, expected })
}

// with 7 coin + 1 parrot
{
  const actual = computeRoundScore({
    card: CARD_COIN,
    symbolsFromDicesKept: [
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createParrotFromDice(),
    ],
    markScoreAllowed: true,
  })
  // 4000 from "8 identic symbols"
  // 800 from "coin = 100"
  // -> 4800
  const expected = 4800
  assert({ actual, expected })
}

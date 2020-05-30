import { assert } from "@jsenv/assert"
import { CARD_TWO_SWORDS_CHALLENGE } from "src/cards/cards.js"
import {
  createCoinFromDice,
  createSwordFromDice,
  createMonkeyFromDice,
  createParrotFromDice,
} from "src/test/test.material.js"
import { computeRoundScore } from "src/score/computeRoundScore.js"

// 8 coin
{
  const actual = computeRoundScore({
    card: CARD_TWO_SWORDS_CHALLENGE,
    symbolsFromDicesKept: [
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = -300
  assert({ actual, expected })
}

// 2 sword completed with 2 sword
{
  const actual = computeRoundScore({
    card: CARD_TWO_SWORDS_CHALLENGE,
    symbolsFromDicesKept: [
      createSwordFromDice(),
      createSwordFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 300
  assert({ actual, expected })
}

// 2 sword completed with 3 sword
{
  const actual = computeRoundScore({
    card: CARD_TWO_SWORDS_CHALLENGE,
    symbolsFromDicesKept: [
      createSwordFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
      createMonkeyFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 400
  assert({ actual, expected })
}

// cannot mark score (because 3skulls)
{
  const actual = computeRoundScore({
    card: CARD_TWO_SWORDS_CHALLENGE,
    symbolsFromDicesKept: [
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
    ],
    markScoreAllowed: false,
  })
  const expected = -300
  assert({ actual, expected })
}

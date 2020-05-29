import { assert } from "@jsenv/assert"
import { CARD_ANIMALS } from "src/cards/cards.js"
import {
  createCoinFromDice,
  createDiamondFromDice,
  createSwordFromDice,
  createMonkeyFromDice,
  createParrotFromDice,
} from "src/test/test.material.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"

// with 1 coin and 1 diamond
{
  const actual = computeRoundScore({
    card: CARD_ANIMALS,
    symbolsFromDiceKept: [
      createParrotFromDice(),
      createMonkeyFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
      createCoinFromDice(),
      createDiamondFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 200
  assert({ actual, expected })
}

// with 3 monkey and 2 parrot
{
  const actual = computeRoundScore({
    card: CARD_ANIMALS,
    symbolsFromDiceKept: [
      createMonkeyFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createSwordFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expected = 500
  assert({ actual, expected })
}

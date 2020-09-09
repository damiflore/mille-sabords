import { assert } from "@jsenv/assert"
import { CARD_ANIMALS } from "src/cards/cards.js"
import { computeRoundScore } from "src/score/computeRoundScore.js"
import {
  createCoinFromDice,
  createDiamondFromDice,
  createSwordFromDice,
  createMonkeyFromDice,
  createParrotFromDice,
} from "../test.material.js"

// with 1 coin and 1 diamond
{
  const actual = computeRoundScore({
    card: CARD_ANIMALS,
    symbolsInChest: [
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
    symbolsInChest: [
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

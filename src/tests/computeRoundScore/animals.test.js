import { assert } from "@jsenv/assert"

import { computeRoundScore } from "/app/round/computeRoundScore.js"
import {
  createCoinFromDice,
  createDiamondFromDice,
  createSwordFromDice,
  createMonkeyFromDice,
  createParrotFromDice,
  getFirstAnimalsCardFromDeck,
} from "../test.material.js"

// with 1 coin and 1 diamond
{
  const actual = computeRoundScore({
    card: getFirstAnimalsCardFromDeck(),
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
  const expect = 200
  assert({ actual, expect })
}

// with 3 monkey and 2 parrot
{
  const actual = computeRoundScore({
    card: getFirstAnimalsCardFromDeck(),
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
  const expect = 500
  assert({ actual, expect })
}

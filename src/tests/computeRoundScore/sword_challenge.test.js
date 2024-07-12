import { assert } from "@jsenv/assert"

import { computeRoundScore } from "/app/round/computeRoundScore.js"
import {
  createCoinFromDice,
  createSwordFromDice,
  createMonkeyFromDice,
  createParrotFromDice,
  getFirstTwoSwordsChallengeCardFromDeck,
} from "../test.material.js"

// 8 coin
{
  const actual = computeRoundScore({
    card: getFirstTwoSwordsChallengeCardFromDeck(),
    symbolsInChest: [
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
  const expect = -300
  assert({ actual, expect })
}

// 2 sword completed with 2 sword
{
  const actual = computeRoundScore({
    card: getFirstTwoSwordsChallengeCardFromDeck(),
    symbolsInChest: [
      createSwordFromDice(),
      createSwordFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expect = 300
  assert({ actual, expect })
}

// 2 sword completed with 3 sword
{
  const actual = computeRoundScore({
    card: getFirstTwoSwordsChallengeCardFromDeck(),
    symbolsInChest: [
      createSwordFromDice(),
      createSwordFromDice(),
      createSwordFromDice(),
      createMonkeyFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expect = 400
  assert({ actual, expect })
}

// cannot mark score (because 3skulls)
{
  const actual = computeRoundScore({
    card: getFirstTwoSwordsChallengeCardFromDeck(),
    symbolsInChest: [
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
      createCoinFromDice(),
    ],
    markScoreAllowed: false,
  })
  const expect = -300
  assert({ actual, expect })
}

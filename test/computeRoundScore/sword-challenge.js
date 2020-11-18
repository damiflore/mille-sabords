import { assert } from "@jsenv/assert"
import {
  createCoinFromDice,
  createSwordFromDice,
  createMonkeyFromDice,
  createParrotFromDice,
  getFirstTwoSwordsChallengeCardFromDeck,
} from "../test.material.js"
import { computeRoundScore } from "src/round/computeRoundScore.js"

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
  const expected = -300
  assert({ actual, expected })
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
  const expected = 300
  assert({ actual, expected })
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
  const expected = 400
  assert({ actual, expected })
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
  const expected = -300
  assert({ actual, expected })
}

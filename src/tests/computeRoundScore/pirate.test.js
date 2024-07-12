import { assert } from "@jsenv/assert"

import { computeRoundScore } from "/app/round/computeRoundScore.js"
import {
  createCoinFromDice,
  createSwordFromDice,
  createMonkeyFromDice,
  createParrotFromDice,
  getFirstPirateCardFromDeck,
} from "../test.material.js"

// with nothing
{
  const actual = computeRoundScore({
    card: getFirstPirateCardFromDeck(),
    symbolsInChest: [
      createSwordFromDice(),
      createSwordFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expect = 0
  assert({ actual, expect })
}

// with 3 coin
{
  const actual = computeRoundScore({
    card: getFirstPirateCardFromDeck(),
    symbolsInChest: [
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
  const expect = 800
  assert({ actual, expect })
}

// with 3 coin + 5 sword
{
  const actual = computeRoundScore({
    card: getFirstPirateCardFromDeck(),
    symbolsInChest: [
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
  const expect = 2800
  assert({ actual, expect })
}

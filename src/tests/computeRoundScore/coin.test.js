import { assert } from "@jsenv/assert"

import { computeRoundScore } from "/app/round/computeRoundScore.js"
import {
  createCoinFromDice,
  createSwordFromDice,
  createMonkeyFromDice,
  createParrotFromDice,
  createCoinFromCard,
  getFirstCoinCardFromDeck,
} from "../test.material.js"

// with nothing
{
  const actual = computeRoundScore({
    card: getFirstCoinCardFromDeck(),
    symbolsInChest: [
      createCoinFromCard(),

      createSwordFromDice(),
      createSwordFromDice(),
      createParrotFromDice(),
      createParrotFromDice(),
      createMonkeyFromDice(),
      createMonkeyFromDice(),
    ],
    markScoreAllowed: true,
  })
  const expect = 100
  assert({ actual, expect })
}

// with 7 coin + 1 parrot
{
  const actual = computeRoundScore({
    card: getFirstCoinCardFromDeck(),
    symbolsInChest: [
      createCoinFromCard(),

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
  const expect = 4800
  assert({ actual, expect })
}

import { assert } from "@jsenv/assert"

import { computeRoundScore } from "root/src/app/round/computeRoundScore.js"
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
  const expected = 100
  assert({ actual, expected })
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
  const expected = 4800
  assert({ actual, expected })
}

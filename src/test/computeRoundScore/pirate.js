import { assert } from "@jsenv/assert"
import { CARD_PIRATE } from "src/cards/cards.js"
import {
  createDiceOnCoin,
  createDiceOnSkull,
  createDiceOnSword,
  createDiceOnMonkey,
  createDiceOnParrot,
} from "src/test/test.material.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"

// with nothing
{
  const actual = computeRoundScore({
    card: CARD_PIRATE,
    diceCursed: [createDiceOnSkull(), createDiceOnSkull()],
    diceKept: [
      createDiceOnSword(),
      createDiceOnSword(),
      createDiceOnParrot(),
      createDiceOnParrot(),
      createDiceOnMonkey(),
      createDiceOnMonkey(),
    ],
    markScoreAllowed: true,
  })
  const expected = 0
  assert({ actual, expected })
}

// with 3 coin
{
  const actual = computeRoundScore({
    card: CARD_PIRATE,
    diceCursed: [createDiceOnSkull()],
    diceKept: [
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnMonkey(),
      createDiceOnMonkey(),
      createDiceOnParrot(),
      createDiceOnParrot(),
    ],
    markScoreAllowed: true,
  })
  const expected = 800
  assert({ actual, expected })
}

// with 3 coin + 5 sword
{
  const actual = computeRoundScore({
    card: CARD_PIRATE,
    diceCursed: [],
    diceKept: [
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnSword(),
      createDiceOnSword(),
      createDiceOnSword(),
      createDiceOnSword(),
      createDiceOnSword(),
    ],
    markScoreAllowed: true,
  })
  // 300 from 3 coins
  // 100 from 3 coins
  // 500 from 5 swords
  // 500 from "perfect" rule
  // x2 from pirate
  // -> 2800
  const expected = 2800
  assert({ actual, expected })
}

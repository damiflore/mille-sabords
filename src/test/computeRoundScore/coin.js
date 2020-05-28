import { assert } from "@jsenv/assert"
import { CARD_COIN, DICE_COIN_FROM_CARD_COIN } from "src/cards/cards.js"
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
    card: CARD_COIN,
    diceCursed: [createDiceOnSkull(), createDiceOnSkull()],
    diceKept: [
      DICE_COIN_FROM_CARD_COIN,
      createDiceOnSword(),
      createDiceOnSword(),
      createDiceOnParrot(),
      createDiceOnParrot(),
      createDiceOnMonkey(),
      createDiceOnMonkey(),
    ],
    markScoreAllowed: true,
  })
  const expected = 100
  assert({ actual, expected })
}

// with 7 coin + 1 parrot
{
  const actual = computeRoundScore({
    card: CARD_COIN,
    diceCursed: [],
    diceKept: [
      DICE_COIN_FROM_CARD_COIN,
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnParrot(),
    ],
    markScoreAllowed: true,
  })
  // 4000 from "8 identic symbols"
  // 800 from "coin = 100"
  // -> 4800
  const expected = 4800
  assert({ actual, expected })
}

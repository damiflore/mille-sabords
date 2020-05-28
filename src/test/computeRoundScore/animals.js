import { assert } from "@jsenv/assert"
import { CARD_ANIMALS } from "src/cards/cards.js"
import {
  createDiceOnCoin,
  createDiceOnDiamond,
  createDiceOnSkull,
  createDiceOnSword,
  createDiceOnMonkey,
  createDiceOnParrot,
} from "src/test/test.material.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"

// with 1 coin and 1 diamond
{
  const actual = computeRoundScore({
    card: CARD_ANIMALS,
    diceCursed: [createDiceOnSkull(), createDiceOnSkull()],
    diceKept: [
      createDiceOnParrot(),
      createDiceOnMonkey(),
      createDiceOnSword(),
      createDiceOnSword(),
      createDiceOnCoin(),
      createDiceOnDiamond(),
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
    diceCursed: [createDiceOnSkull(), createDiceOnSkull()],
    diceKept: [
      createDiceOnMonkey(),
      createDiceOnMonkey(),
      createDiceOnMonkey(),
      createDiceOnParrot(),
      createDiceOnParrot(),
      createDiceOnSword(),
    ],
    markScoreAllowed: true,
  })
  const expected = 500
  assert({ actual, expected })
}

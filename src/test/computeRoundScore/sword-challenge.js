import { assert } from "@jsenv/assert"
import { CARD_TWO_SWORDS_CHALLENGE } from "src/cards/cards.js"
import {
  createDiceOnCoin,
  createDiceOnSkull,
  createDiceOnSword,
  createDiceOnMonkey,
  createDiceOnParrot,
} from "src/test/test.material.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"

// 8 coin
{
  const actual = computeRoundScore({
    card: CARD_TWO_SWORDS_CHALLENGE,
    diceCursed: [],
    diceKept: [
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
    ],
    markScoreAllowed: true,
  })
  const expected = -300
  assert({ actual, expected })
}

// 2 sword completed with 2 sword
{
  const actual = computeRoundScore({
    card: CARD_TWO_SWORDS_CHALLENGE,
    diceCursed: [createDiceOnSkull(), createDiceOnSkull()],
    diceKept: [
      createDiceOnSword(),
      createDiceOnSword(),
      createDiceOnMonkey(),
      createDiceOnMonkey(),
      createDiceOnParrot(),
      createDiceOnParrot(),
    ],
    markScoreAllowed: true,
  })
  const expected = 300
  assert({ actual, expected })
}

// 2 sword completed with 3 sword
{
  const actual = computeRoundScore({
    card: CARD_TWO_SWORDS_CHALLENGE,
    diceCursed: [createDiceOnSkull(), createDiceOnSkull()],
    diceKept: [
      createDiceOnSword(),
      createDiceOnSword(),
      createDiceOnSword(),
      createDiceOnMonkey(),
      createDiceOnParrot(),
      createDiceOnParrot(),
    ],
    markScoreAllowed: true,
  })
  const expected = 400
  assert({ actual, expected })
}

// cannot mark score (because 3skulls)
{
  const actual = computeRoundScore({
    card: CARD_TWO_SWORDS_CHALLENGE,
    diceCursed: [createDiceOnSkull(), createDiceOnSkull(), createDiceOnSkull()],
    diceKept: [
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
      createDiceOnCoin(),
    ],
    markScoreAllowed: false,
  })
  const expected = -300
  assert({ actual, expected })
}

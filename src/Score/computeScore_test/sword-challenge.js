import { assert } from "@dmail/assert"
import { computeScore } from "../ScoreHelpers.js"

// 8 coin
{
  const actual = computeScore({
    currentCard: { type: "sword-challenge", goal: 2, gamble: 300 },
    diceKept: ["coin", "coin", "coin", "coin", "coin", "coin", "coin", "coin"],
  })
  const expected = -300
  assert({ actual, expected })
}

// 2 sword completed with 2 sword
{
  const actual = computeScore({
    currentCard: { type: "sword-challenge", goal: 2, gamble: 300 },
    diceKept: ["sword", "sword", "monkey", "monkey", "skull", "skull", "parrot", "parrot"],
  })
  const expected = 300
  assert({ actual, expected })
}

// 2 sword completed with 3 sword
{
  const actual = computeScore({
    currentCard: { type: "sword-challenge", goal: 2, gamble: 300 },
    diceKept: ["sword", "sword", "sword", "monkey", "skull", "skull", "parrot", "parrot"],
  })
  const expected = 400
  assert({ actual, expected })
}

import { assert } from "@dmail/assert"
import { computeScore } from "../ScoreHelpers.js"

// with 1 coin and 1 damond
{
  const actual = computeScore({
    currentCard: { type: "animals" },
    diceKept: ["parrot", "monkey", "sword", "sword", "skull", "skull", "coin", "diamond"],
  })
  const expected = 200
  assert({ actual, expected })
}

// with 3 monkey and 2 parrot
{
  const actual = computeScore({
    currentCard: { type: "animals" },
    diceKept: ["monkey", "monkey", "monkey", "parrot", "parrot", "skull", "skull", "sword"],
  })
  const expected = 500
  assert({ actual, expected })
}

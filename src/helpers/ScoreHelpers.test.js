import { assert } from "@dmail/assert"
import { computeScore } from "./ScoreHelpers.js"

{
  const actual = computeScore([
    "coin",
    "coin",
    "coin",
    "diamond",
    "diamond",
    "diamond",
    "skull",
    "skull",
  ])
  const expected = 800
  assert({ actual, expected })
}

{
  const actual = computeScore([
    "coin",
    "coin",
    "coin",
    "coin",
    "coin",
    "parrot",
    "parrot",
    "parrot",
  ])
  const expected = 1100
  assert({ actual, expected })
}

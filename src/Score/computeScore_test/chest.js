import { assert } from "@dmail/assert"
import { computeScore } from "../ScoreHelpers.js"

// with nothing
{
  const actual = computeScore({
    currentCard: { type: "chest" },
    diceKept: ["parrot", "parrot", "monkey", "monkey", "sword", "sword", "skull", "skull"],
  })
  const expected = 0
  assert({ actual, expected })
}

// with 3 parrot
{
  const actual = computeScore({
    currentCard: { type: "chest" },
    diceKept: ["parrot", "parrot", "parrot", "monkey", "monkey", "sword", "sword", "skull"],
  })
  const expected = 100
  assert({ actual, expected })
}

// with 4 parrot
{
  const actual = computeScore({
    currentCard: { type: "chest" },
    diceKept: ["parrot", "parrot", "parrot", "parrot", "monkey", "monkey", "sword", "sword"],
  })
  const expected = 200
  assert({ actual, expected })
}

// with 5 parrot
{
  const actual = computeScore({
    currentCard: { type: "chest" },
    diceKept: ["parrot", "parrot", "parrot", "parrot", "parrot", "monkey", "monkey", "skull"],
  })
  const expected = 500
  assert({ actual, expected })
}

// with 6 parrot
{
  const actual = computeScore({
    currentCard: { type: "chest" },
    diceKept: ["parrot", "parrot", "parrot", "parrot", "parrot", "parrot", "monkey", "monkey"],
  })
  const expected = 1000
  assert({ actual, expected })
}

// with 7 parrot
{
  const actual = computeScore({
    currentCard: { type: "chest" },
    diceKept: ["parrot", "parrot", "parrot", "parrot", "parrot", "parrot", "parrot", "monkey"],
  })
  const expected = 2000
  assert({ actual, expected })
}

// with 8 parrot
{
  const actual = computeScore({
    currentCard: { type: "chest" },
    diceKept: ["parrot", "parrot", "parrot", "parrot", "parrot", "parrot", "parrot", "parrot"],
  })
  // 4000 from "8 identic symbols"
  // 500 from "perfect" rule
  // -> 4500
  const expected = 4500
  assert({ actual, expected })
}

// with 1 coin
{
  const actual = computeScore({
    currentCard: { type: "chest" },
    diceKept: ["coin", "parrot", "parrot", "monkey", "monkey", "sword", "sword", "skull"],
  })
  const expected = 100
  assert({ actual, expected })
}

// with 1 diamond
{
  const actual = computeScore({
    currentCard: { type: "chest" },
    diceKept: ["diamond", "parrot", "parrot", "monkey", "monkey", "sword", "sword", "skull"],
  })
  const expected = 100
  assert({ actual, expected })
}

// with 3 coin
{
  const actual = computeScore({
    currentCard: { type: "chest" },
    diceKept: ["coin", "coin", "coin", "parrot", "parrot", "sword", "sword", "skull"],
  })
  // 100 from 3 identic coin
  // 300 from 3 coin
  // -> 400
  const expected = 400
  assert({ actual, expected })
}

// with 3 parrot and 3 diamond
{
  const actual = computeScore({
    currentCard: { type: "chest" },
    diceKept: ["parrot", "parrot", "parrot", "diamond", "diamond", "diamond", "sword", "sword"],
  })
  // 100 from 3 identic parrot
  // 100 from 3 identic diamond
  // 300 from 3 diamond
  // -> 500
  const expected = 500
  assert({ actual, expected })
}

// with 3 parrot and 3 monkey and 2 coin
{
  const actual = computeScore({
    currentCard: { type: "chest" },
    diceKept: ["parrot", "parrot", "parrot", "monkey", "monkey", "monkey", "coin", "coin"],
  })
  // 100 from 3 identic parrot
  // 100 from 3 identic monkey
  // 200 from 2 coin
  // 500 from "perfect" rule
  // -> 900
  const expected = 900
  assert({ actual, expected })
}

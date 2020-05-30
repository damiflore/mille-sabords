import { assert } from "@jsenv/assert"
import { CARD_ANIMALS, CARD_CHEST } from "src/cards/cards.js"
import { useMarkScoreAllowed } from "src/game.selectors.js"

// with 3 skulls
{
  const actual = useMarkScoreAllowed({
    hasRolledMoreThanOnce: false,
    scoreMarked: false,
    card: CARD_ANIMALS,
    threeSkullsOrMoreInCursedArea: true,
    hasDicesToCurse: false,
  })
  const expected = false
  assert({ actual, expected })
}

// no skull and user clicked on "Mark score"
{
  const actual = useMarkScoreAllowed({
    hasRolledMoreThanOnce: false,
    scoreMarked: true,
    card: CARD_ANIMALS,
    threeSkullsOrMoreInCursedArea: false,
    hasDicesToCurse: false,
  })
  const expected = false
  assert({ actual, expected })
}

// with 3 skulls first roll + chest
{
  const actual = useMarkScoreAllowed({
    hasRolledMoreThanOnce: false,
    scoreMarked: false,
    card: CARD_CHEST,
    threeSkullsOrMoreInCursedArea: true,
    hasDicesToCurse: false,
  })
  const expected = false
  assert({ actual, expected })
}

// with 3 skulls second roll + chest
{
  const actual = useMarkScoreAllowed({
    hasRolledMoreThanOnce: true,
    scoreMarked: false,
    card: CARD_CHEST,
    threeSkullsOrMoreInCursedArea: true,
    hasDicesToCurse: false,
  })
  const expected = true
  assert({ actual, expected })
}

// less than 3 skulls, not clicked on mark score
{
  const actual = useMarkScoreAllowed({
    hasRolledMoreThanOnce: true,
    scoreMarked: false,
    card: CARD_CHEST,
    threeSkullsOrMoreInCursedArea: false,
    hasDicesToCurse: false,
  })
  const expected = true
  assert({ actual, expected })
}

// skull in rolled area (= cursed animation ongoing)
{
  const actual = useMarkScoreAllowed({
    hasRolledMoreThanOnce: false,
    scoreMarked: false,
    card: CARD_ANIMALS,
    threeSkullsOrMoreInCursedArea: false,
    hasDicesToCurse: true,
  })
  const expected = false
  assert({ actual, expected })
}

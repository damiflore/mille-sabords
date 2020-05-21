import { isWitchCard } from "src/Cards/cards.js"
import { SYMBOL_SKULL } from "src/symbols/symbol-types.js"

export const unkeepDice = (
  {
    card,
    diceKept,
    setCardEffectUsed,
    diceCursed,
    setDiceCursed,
    setDiceKept,
    diceInGame,
    setDiceInGame,
  },
  dice,
) => {
  if (dice.symbol === SYMBOL_SKULL) {
    if (isWitchCard(card)) {
      setCardEffectUsed(true)
    }
    const cursedArrayWithoutThisDice = diceCursed.filter((diceCandidate) => diceCandidate !== dice)
    setDiceCursed(cursedArrayWithoutThisDice)
  } else {
    const keptArrayWithoutThisDice = diceKept.filter((diceCandidate) => diceCandidate !== dice)
    setDiceKept(keptArrayWithoutThisDice)
  }

  const onGoingArrayWithThisDice = [...diceInGame, dice]
  setDiceInGame(onGoingArrayWithThisDice)
}

export const markScore = ({ setTotalScore, totalScore, roundScore, setScoreMarked }) => {
  setTotalScore(Math.max(totalScore + roundScore, 0))
  setScoreMarked(true)
}

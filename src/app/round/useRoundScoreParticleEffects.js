import React from "react"

import { useUpdateEffect } from "/app/hooks.js"
import { useChestSlots, useDices, useCurrentCardId } from "/app/main.store.js"
import { chestSlotContentToSymbol } from "/app/chest/chest.util.js"
import { cardIdToCard, isAnimalsCard } from "/app/cards/cards.js"
import {
  symbolIsCoin,
  symbolIsDiamond,
  symbolIsMonkey,
  symbolIsParrot,
  SYMBOLS,
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
} from "/app/symbols/symbols.js"
import { getScoreAndPerfectBonus } from "/app/round/computeRoundScore.js"
import { useSwordChallengeOnGoing } from "/app/round/round.selectors.js"

export const useRoundScoreParticleEffects = ({ addScoreParticle }) => {
  useCoinEffect({ addScoreParticle })
  useDiamondEffect({ addScoreParticle })
  useComboEffect({ addScoreParticle })
  usePerfectEffect({ addScoreParticle })
}

const useCoinEffect = ({ addScoreParticle }) => {
  const chestSlots = useChestSlots()
  const dices = useDices()
  const effectSuspended = useSwordChallengeOnGoing()

  Object.keys(chestSlots).forEach((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    const chestSlotSymbol = chestSlotContentToSymbol(chestSlotContent, dices)
    const chestSlotContentIsCoin =
      chestSlotSymbol && symbolIsCoin(chestSlotSymbol)

    useUpdateEffect(() => {
      if (effectSuspended) return undefined

      if (!chestSlotContentIsCoin) return undefined

      return addScoreParticle({
        id: `chest-slot-${chestSlot}-coin`,
        type: "bonus",
        value: 100,
        symbol: SYMBOL_COIN,
        chestSlot,
      })
    }, [effectSuspended, chestSlotContentIsCoin])
  })
}

const useDiamondEffect = ({ addScoreParticle }) => {
  const chestSlots = useChestSlots()
  const dices = useDices()
  const effectSuspended = useSwordChallengeOnGoing()

  Object.keys(chestSlots).forEach((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    const chestSlotSymbol = chestSlotContentToSymbol(chestSlotContent, dices)
    const chestSlotContentIsDiamond =
      chestSlotSymbol && symbolIsDiamond(chestSlotSymbol)

    useUpdateEffect(() => {
      if (effectSuspended) return undefined

      if (!chestSlotContentIsDiamond) return undefined

      return addScoreParticle({
        id: `chest-slot-${chestSlot}-diamond`,
        type: "bonus",
        value: 100,
        symbol: SYMBOL_DIAMOND,
        chestSlot,
      })
    }, [effectSuspended, chestSlotContentIsDiamond])
  })
}

const usePerfectEffect = ({ addScoreParticle }) => {
  const chestSlots = useChestSlots()
  const dices = useDices()
  const effectSuspended = useSwordChallengeOnGoing()
  const perfect = React.useMemo(() => {
    const symbols = []
    Object.keys(chestSlots).forEach((chestSlot) => {
      const chestSlotContent = chestSlots[chestSlot]
      if (!chestSlotContent) {
        return
      }

      const chestSlotHasDice = chestSlotContent.type === "dice"
      if (!chestSlotHasDice) {
        return
      }

      symbols.push(chestSlotContentToSymbol(chestSlotContent, dices))
    })
    const { perfectBonus } = getScoreAndPerfectBonus(symbols)
    return Boolean(perfectBonus)
  }, [chestSlots, dices])

  useUpdateEffect(() => {
    if (effectSuspended) return undefined

    if (!perfect) return undefined

    return addScoreParticle({
      id: "perfect",
      type: "perfect",
      value: 500,
    })
  }, [effectSuspended, perfect])
}

// on voudrait aussi déclencher une animation
// sur les chest slots faisant partie de la combo

const useComboEffect = ({ addScoreParticle }) => {
  const chestSlots = useChestSlots()
  const dices = useDices()
  const currentCardId = useCurrentCardId()
  const currentCard = cardIdToCard(currentCardId)
  const effectSuspended = useSwordChallengeOnGoing()

  SYMBOLS.forEach((symbol) => {
    const chestSlotsWithThatSymbol = []
    Object.keys(chestSlots).forEach((chestSlot) => {
      const chestSlotContent = chestSlots[chestSlot]
      const chestSlotSymbol = chestSlotContentToSymbol(chestSlotContent, dices)

      if (!chestSlotSymbol) {
        return
      }

      if (compareSymbols(chestSlotSymbol, symbol, currentCard)) {
        chestSlotsWithThatSymbol.push(chestSlot)
      }
    })
    const symbolCount = chestSlotsWithThatSymbol.length
    const comboScore = COMBO_SCORES[symbolCount] || 0
    const comboScorePreviousRef = React.useRef(comboScore)
    // si la combo vient se se produire -> animation
    // si la combo part -> on annule l'ancienne
    // si la combo increases -> annule l'ancienne + joue la nouvelle
    // si la combo decrease -> on annule juste l'ancienne
    // attention avec la carte animals on a 2 fois la combo singe et perroquet
    // donc il ne faudra en faire que une
    const animationRef = React.useRef(() => {})

    useUpdateEffect(() => {
      const comboScorePrevious = comboScorePreviousRef.current
      // const comboFound = Boolean(!comboScorePrevious && comboScore)
      const comboIncreased = Boolean(
        comboScorePrevious && comboScore && comboScorePrevious < comboScore,
      )
      const comboDecreased = Boolean(
        comboScorePrevious && comboScore && comboScorePrevious > comboScore,
      )
      // const comboLost = Boolean(comboScorePrevious && !comboScore)
      comboScorePreviousRef.current = comboScore

      // ne tiens pas compte des parrot lorsqu'ils sont transformé
      // en singe par la carte animals
      if (isAnimalsCard(currentCard) && symbolIsParrot(symbol)) return undefined

      if (effectSuspended) return undefined

      if (!comboScore) return undefined

      if (comboDecreased) {
        animationRef.current()
        return undefined
      }

      if (comboIncreased) {
        animationRef.current()
      }

      const id = `${symbolCount}-${symbol}-combo`
      const value = comboScore - comboScorePrevious
      const cleanupScoreParticle = addScoreParticle({
        id,
        type: "combo",
        value,
        symbol,
        symbolCount,
      })
      animationRef.current = cleanupScoreParticle

      const chestSlotAnimationCleanups = chestSlotsWithThatSymbol.map(
        (chestSlotWithThatSymbol) => {
          const chestSlotDomNodeSymbol =
            document.querySelector(
              `[data-chest-slot="${chestSlotWithThatSymbol}"] image`,
            ) ||
            // symbol coming from coin or diamond card have a different html structure
            // (they use an <img> tag)
            document.querySelector(
              `[data-chest-slot="${chestSlotWithThatSymbol}"] img`,
            )
          // attention: l'animation de combo
          // peut etre delay
          // et dans ce cas on voudrait que le scaling se fasse en meme temps ?
          const animation = chestSlotDomNodeSymbol.animate(
            [
              {
                transform: "scale(1)",
                transformOrigin: "center center",
              },
              {
                transform: "scale(1.2)",
                transformOrigin: "center center",
              },
              {
                transform: "scale(1)",
                transformOrigin: "center center",
              },
            ],
            { duration: 400 },
          )
          return () => {
            animation.cancel()
          }
        },
      )
      return () => {
        cleanupScoreParticle()
        chestSlotAnimationCleanups.forEach((chestSlotAnimationCleanup) => {
          chestSlotAnimationCleanup()
        })
      }
    }, [effectSuspended, currentCard, comboScore])
  })
}

const compareSymbols = (leftSymbol, rightSymbol, currentCard) => {
  if (leftSymbol === rightSymbol) {
    return true
  }

  if (isAnimalsCard(currentCard)) {
    if (symbolIsMonkey(leftSymbol) && symbolIsParrot(rightSymbol)) {
      return true
    }
    if (symbolIsParrot(leftSymbol) && symbolIsMonkey(rightSymbol)) {
      return true
    }
  }

  return false
}

const COMBO_SCORES = {
  3: 100,
  4: 200,
  5: 500,
  6: 1000,
  7: 2000,
  8: 4000,
}

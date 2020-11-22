import React from "react"
import { useUpdateEffect } from "src/hooks.js"
import { getDomNodeRectangle } from "src/dom/dom.position.js"
import { getRectangleCenterPoint } from "src/helper/rectangle.js"
import { useChestSlots, useDices, useCurrentCardId } from "src/main.store.js"
import { chestSlotContentToSymbol } from "src/chest/chest.component.jsx"
import { cardIdToCard, isAnimalsCard } from "src/cards/cards.js"
import {
  symbolIsCoin,
  symbolIsDiamond,
  symbolIsMonkey,
  symbolIsParrot,
  SYMBOLS,
} from "src/symbols/symbols.js"
import { getScoreAndPerfectBonus } from "src/round/computeRoundScore.js"
import { useSwordChallengeOnGoing } from "src/round/round.selectors.js"

export const useRoundScoreParticleEffects = ({ addScoreParticle }) => {
  // le sword challenge
  // il faut le faire, et aussi il est tres important parce que
  // tant qu'il est actif les coin,diamond et combo sont désactivé
  // et au moment ou le sword challenge est complété
  // on veut afficher tout ce qui se débloque

  useComboEffect({ addScoreParticle })
  usePerfectEffect({ addScoreParticle })
  useCoinEffect({ addScoreParticle })
  useDiamondEffect({ addScoreParticle })
}

const useCoinEffect = ({ addScoreParticle }) => {
  const chestSlots = useChestSlots()
  const dices = useDices()
  const effectSuspended = useSwordChallengeOnGoing()

  Object.keys(chestSlots).forEach((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    const chestSlotSymbol = chestSlotContentToSymbol(chestSlotContent, dices)
    const chestSlotContentIsCoin = chestSlotSymbol && symbolIsCoin(chestSlotSymbol)

    useUpdateEffect(() => {
      if (effectSuspended) return undefined

      if (!chestSlotContentIsCoin) return undefined

      return addScoreParticle({
        id: `chest-slot-${chestSlot}-coin`,
        value: 100,
        children: "+100",
        animationType: "moveToTotalScore",
        ...chestSlotDomNodeToScoreParticlePosition(
          document.querySelector(`[data-chest-slot="${chestSlot}"]`),
        ),
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
    const chestSlotContentIsDiamond = chestSlotSymbol && symbolIsDiamond(chestSlotSymbol)

    useUpdateEffect(() => {
      if (effectSuspended) return undefined

      if (!chestSlotContentIsDiamond) return undefined

      return addScoreParticle({
        id: `chest-slot-${chestSlot}-diamond`,
        value: 100,
        children: "+100",
        animationType: "moveToTotalScore",
        ...chestSlotDomNodeToScoreParticlePosition(
          document.querySelector(`[data-chest-slot="${chestSlot}"]`),
        ),
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
      value: 500,
      children: "Coffre parfait",
      animationType: "popOnPlace",
      ...chestSlotDomNodeToScoreParticlePosition(document.querySelector(`.chest .box`)),
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
    // si la combo increases -> animation de la nouvelle et on annule pas l'ancienne
    // si la conbo decrease -> on annule juste l'ancienne
    // attention avec la carte animals on a 2 fois la combo singe et perroquet
    // donc il ne faudra en faire que une
    const animationRef = React.useRef(() => {})

    useUpdateEffect(() => {
      const comboScorePrevious = comboScorePreviousRef.current
      // const comboFound = Boolean(!comboScorePrevious && comboScore)
      // const comboIncreased = Boolean(
      //   comboScorePrevious && comboScore && comboScorePrevious < comboScore,
      // )
      const comboDecreased = Boolean(
        comboScorePrevious && comboScore && comboScorePrevious > comboScore,
      )
      // const comboLost = Boolean(comboScorePrevious && !comboScore)
      comboScorePreviousRef.current = comboScore

      if (effectSuspended) return undefined

      if (!comboScore) return undefined

      if (comboDecreased) {
        animationRef.current()
        return undefined
      }

      const id = `${symbolCount}-${symbol}-combo`
      const value = comboScore - comboScorePrevious
      const cleanupScoreParticle = addScoreParticle({
        id,
        value,
        children: `Combo ${symbolCount}`,
        animationType: "popOnPlace",
        ...chestSlotDomNodeToScoreParticlePosition(document.querySelector(`.chest .box`)),
      })
      animationRef.current = cleanupScoreParticle

      const chestSlotAnimationCleanups = chestSlotsWithThatSymbol.map((chestSlotWithThatSymbol) => {
        const chestSlotDomNode = document.querySelector(
          `[data-chest-slot="${chestSlotWithThatSymbol}"]`,
        )
        // attention: l'animation de combo
        // peut etre delay
        // et dans ce cas on voudrait que le scaling se fasse en meme temps
        const animation = chestSlotDomNode.animate(
          [
            {
              transform: "scale(1)",
            },
            {
              transform: "scale(1.2)",
            },
            {
              transform: "scale(1)",
            },
          ],
          { duration: 400 },
        )
        return () => {
          animation.cancel()
        }
      })
      return () => {
        cleanupScoreParticle()
        chestSlotAnimationCleanups.forEach((chestSlotAnimationCleanup) => {
          chestSlotAnimationCleanup()
        })
      }
    }, [effectSuspended, comboScore])
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

// const useChestSlotUpdatesWithoutMoves = () => {
//   const chestSlots = useChestSlots()
//   const chestSlotsPreviousRef = React.useRef(null)

//   const chestSlotsUpdates = React.useMemo(() => {
//     const chestSlotsPrevious = chestSlotsPreviousRef.current
//     chestSlotsPreviousRef.current = chestSlots

//     const updates = []
//     if (chestSlotsPrevious === null) {
//       return updates
//     }

//     Object.keys(chestSlots).forEach((chestSlot) => {
//       const chestSlotContent = chestSlots[chestSlot]
//       const chestSlotContentPreviousSlot = Object.keys(chestSlotsPrevious).find(
//         (chestSlotPrevious) => {
//           const chestSlotContentPrevious = chestSlotsPrevious[chestSlotPrevious]
//           return compareChestSlotContent(chestSlotContent, chestSlotContentPrevious)
//         },
//       )
//       if (!chestSlotContentPreviousSlot) {
//         const chestSlotContentPrevious = chestSlotsPrevious[chestSlot]
//         updates.push({
//           chestSlot,
//           chestSlotContentPrevious,
//           chestSlotContent,
//         })
//       }
//     })
//     return updates
//   }, [chestSlots])

//   return chestSlotsUpdates
// }

const chestSlotDomNodeToScoreParticlePosition = (chestSlotDomNode) => {
  const domNodeRectangle = getDomNodeRectangle(chestSlotDomNode)
  const centerPoint = getRectangleCenterPoint(domNodeRectangle)
  return centerPoint
}

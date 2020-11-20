import React from "react"
import { useUpdateEffect } from "src/hooks.js"
import { getDomNodeRectangle } from "src/dom/dom.position.js"
import { getRectangleCenterPoint } from "src/helper/rectangle.js"
import { useChestSlots, useDices } from "src/main.store.js"
import { chestSlotContentToSymbol, compareChestSlotContent } from "src/chest/chest.component.jsx"
import { SYMBOL_COIN, SYMBOL_DIAMOND } from "src/symbols/symbols.js"
import { getScoreAndPerfectBonus } from "src/round/computeRoundScore.js"

export const useRoundScoreParticleEffects = ({ addScoreParticle }) => {
  useSymbolEffect({
    symbol: SYMBOL_COIN,
    symbolEffect: ({ chestSlot }) => {
      return addScoreParticle({
        id: `chest-slot-${chestSlot}-coin`,
        value: 100,
        children: "+100",
        animationType: 'moveToTotalScore',
        ...chestSlotDomNodeToScoreParticlePosition(
          document.querySelector(`[data-chest-slot="${chestSlot}"]`),
        ),
      })
    },
  })
  useSymbolEffect({
    symbol: SYMBOL_DIAMOND,
    symbolEffect: ({ chestSlot }) => {
      return addScoreParticle({
        id: `chest-slot-${chestSlot}-diamond`,
        value: 100,
        children: "+100",
        animationType: 'moveToTotalScore',
        ...chestSlotDomNodeToScoreParticlePosition(
          document.querySelector(`[data-chest-slot="${chestSlot}"]`),
        ),
      })
    },
  })
  useComboEffect({ addScoreParticle })
  usePerfectEffect({ addScoreParticle })
  // reste le sword challenge
}

const useSymbolEffect = ({ symbol, symbolEffect }) => {
  const chestSlotUpdates = useChestSlotUpdatesWithoutMoves()
  const dices = useDices()
  const updatesWithThatSymbol = React.useMemo(() => {
    return chestSlotUpdates.filter(({ chestSlotContent }) => {
      const chestSlotSymbol = chestSlotContentToSymbol(chestSlotContent, dices)
      return chestSlotSymbol && chestSlotSymbol === symbol
    })
  }, [
    symbol,
    chestSlotUpdates,
    // don't put dices as dependency here oherwise movings dices in rolled area
    // influences dices in chest and we replay the animation
    // it could be fixed by listening only dices in the chestSlot ?
    // dices
  ])

  useUpdateEffect(() => {
    const effectReturnValues = updatesWithThatSymbol.map((updateWithThatSymbol) => {
      return symbolEffect(updateWithThatSymbol)
    })
    return () => {
      effectReturnValues.forEach((effectReturnValue) => {
        if (typeof effectReturnValue === "function") {
          effectReturnValue()
        }
      })
    }
  }, [updatesWithThatSymbol])
}

const useComboEffect = ({ addScoreParticle }) => {
  const chestSlots = useChestSlots()
  const dices = useDices()
  const chestSlotsGroupedBySymbols = React.useMemo(() => {
    const chestSlotsGroupedBySymbols = {}
    Object.keys(chestSlots).forEach((chestSlot) => {
      const chestSlotContent = chestSlots[chestSlot]
      const chestSlotSymbol = chestSlotContentToSymbol(chestSlotContent, dices)
      if (!chestSlotSymbol) {
        return
      }

      if (chestSlotSymbol in chestSlotsGroupedBySymbols) {
        chestSlotsGroupedBySymbols[chestSlotSymbol].push(chestSlot)
      } else {
        chestSlotsGroupedBySymbols[chestSlotSymbol] = [chestSlot]
      }
    })
    return chestSlotsGroupedBySymbols
  }, [chestSlots, dices])

  const combos = React.useMemo(() => {
    const combos = {}
    Object.keys(chestSlotsGroupedBySymbols).forEach((symbol) => {
      const slotsParticipatingToCombo = chestSlotsGroupedBySymbols[symbol]
      const symbolCount = slotsParticipatingToCombo.length
      const value = COMBO_SCORES[symbolCount]
      if (!value) {
        return
      }
      combos[symbol] = { slotsParticipatingToCombo, value }
    })
    return combos
  }, [chestSlotsGroupedBySymbols])
  const combosPreviousRef = React.useRef({})
  React.useEffect(() => {
    combosPreviousRef.current = combos
  }, [combos])

  const chestSlotUpdates = useChestSlotUpdatesWithoutMoves()
  const comboUpdates = React.useMemo(() => {
    const comboUpdates = []
    const combosPrevious = combosPreviousRef.current

    Object.keys(combos).forEach((symbol) => {
      const comboPrevious = combosPrevious[symbol]
      const combo = combos[symbol]
      if (
        comboPrevious &&
        // si la combo est la meme
        // -> on affiche rien parce que cette combo était déja la
        // si le combo est inférieur (on unkeep un dé d'une combo de 4 donc on se retrouve avec une combo de 3)
        // -> on affiche rien non plus parce qu'on veut pas réagir au unkeep, seulement au keep
        comboPrevious.value >= combo.value
      ) {
        return
      }
      comboUpdates.push({
        symbol,
        comboPrevious,
        combo,
      })
    })
    return comboUpdates
  }, [combos, chestSlotUpdates])

  // const { slotsParticipatingToCombo } = combo
  // const firstSlotUpdated = slotsParticipatingToCombo.find((chestSlot) =>
  //   chestSlotUpdates.some(
  //     (chestSlotUpdateCandidate) => chestSlotUpdateCandidate.chestSlot === chestSlot,
  //   ),
  // )
  // if (!firstSlotUpdated) {
  //   return
  // }

  useUpdateEffect(() => {
    const cleanupFunctions = comboUpdates.map(({ symbol, comboPrevious, combo }) => {
      const { slotsParticipatingToCombo } = combo
      const chestSlot = slotsParticipatingToCombo[0]
      const symbolCount = slotsParticipatingToCombo.length

      const id = `${symbolCount}-${symbol}-combo`
      const value = combo.value - (comboPrevious ? comboPrevious.value : 0)
      return addScoreParticle({
        id,
        value,
        children: `Combo ${symbolCount}`,
        animationType: 'popOnPlace',
        ...chestSlotDomNodeToScoreParticlePosition(
          document.querySelector(`[data-chest-slot="${chestSlot}"]`),
        ),
      })
    })
    return () => {
      cleanupFunctions.forEach((cleanup) => {
        cleanup()
      })
    }
  }, [comboUpdates])
}

const COMBO_SCORES = {
  3: 100,
  4: 200,
  5: 500,
  6: 1000,
  7: 2000,
  8: 4000,
}

const useChestSlotUpdatesWithoutMoves = () => {
  const chestSlots = useChestSlots()
  const chestSlotsPreviousRef = React.useRef(null)

  const chestSlotsUpdates = React.useMemo(() => {
    const chestSlotsPrevious = chestSlotsPreviousRef.current
    chestSlotsPreviousRef.current = chestSlots

    const updates = []
    if (chestSlotsPrevious === null) {
      return updates
    }

    Object.keys(chestSlots).forEach((chestSlot) => {
      const chestSlotContent = chestSlots[chestSlot]
      const chestSlotContentPreviousSlot = Object.keys(chestSlotsPrevious).find(
        (chestSlotPrevious) => {
          const chestSlotContentPrevious = chestSlotsPrevious[chestSlotPrevious]
          return compareChestSlotContent(chestSlotContent, chestSlotContentPrevious)
        },
      )
      if (!chestSlotContentPreviousSlot) {
        const chestSlotContentPrevious = chestSlotsPrevious[chestSlot]
        updates.push({
          chestSlot,
          chestSlotContentPrevious,
          chestSlotContent,
        })
      }
    })
    return updates
  }, [chestSlots])

  return chestSlotsUpdates
}

const chestSlotDomNodeToScoreParticlePosition = (chestSlotDomNode) => {
  const domNodeRectangle = getDomNodeRectangle(chestSlotDomNode)
  const centerPoint = getRectangleCenterPoint(domNodeRectangle)
  return centerPoint
}

const usePerfectEffect = ({ addScoreParticle }) => {
  const chestSlots = useChestSlots()
  const dices = useDices()
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

  const chestSlotUpdates = useChestSlotUpdatesWithoutMoves()
  const perfectUpdate = React.useMemo(() => {
    if (chestSlotUpdates.length === 0) return null
    return {
      perfect,
      chestSlot: chestSlotUpdates[0].chestSlot,
    }
  }, [perfect, chestSlotUpdates])

  useUpdateEffect(() => {
    if (perfectUpdate && perfectUpdate.perfect) {
      return addScoreParticle({
        id: "perfect",
        value: 500,
        children: "Coffre parfait",
        animationType: 'popOnPlace',
        ...chestSlotDomNodeToScoreParticlePosition(
          document.querySelector(`[data-chest-slot="${perfectUpdate.chestSlot}"]`),
        ),
      })
    }
    return undefined
  }, [perfectUpdate])
}

import React from "react"
import { useUpdateEffect } from "src/hooks.js"
import { getDomNodeRectangle } from "src/dom/dom.position.js"
import { getRectangleCenterPoint } from "src/helper/rectangle.js"
import { useChestSlots, useDices } from "src/main.store.js"
import { chestSlotContentToSymbol, compareChestSlotContent } from "src/chest/chest.jsx"
import { SYMBOL_COIN, SYMBOL_DIAMOND } from "src/symbols/symbols.js"
import { getScoreAndPerfectBonus } from "src/round/computeRoundScore.js"

export const useRoundScoreParticleEffects = ({ addScoreParticle }) => {
  useSymbolEffect({
    symbol: SYMBOL_COIN,
    symbolEffect: ({ chestSlot }) => {
      return addScoreParticle({
        id: `chest-slot-${chestSlot}-coin`,
        value: 100,
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
  }, [symbol, chestSlotUpdates, dices])

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
  const combos = React.useMemo(() => {
    const combos = {}
    Object.keys(chestSlots).forEach((chestSlot) => {
      const chestSlotContent = chestSlots[chestSlot]
      const chestSlotSymbol = chestSlotContentToSymbol(chestSlotContent, dices)
      if (!chestSlotSymbol) {
        return
      }

      if (chestSlotSymbol in combos) {
        combos[chestSlotSymbol].push(chestSlot)
      } else {
        combos[chestSlotSymbol] = [chestSlot]
      }
    })
    return combos
  }, [chestSlots, dices])

  const chestSlotUpdates = useChestSlotUpdatesWithoutMoves()
  const comboUpdates = React.useMemo(() => {
    const comboUpdates = []
    // une combo est update si un de ses chest slots a été modifié
    Object.keys(combos).forEach((symbol) => {
      const slotsParticipatingToCombo = combos[symbol]
      const firstSlotUpated = slotsParticipatingToCombo.find((chestSlot) =>
        chestSlotUpdates.some(
          (chestSlotUpdateCandidate) => chestSlotUpdateCandidate.chestSlot === chestSlot,
        ),
      )
      if (firstSlotUpated) {
        comboUpdates.push({
          symbol,
          slotsParticipatingToCombo,
          chestSlot: firstSlotUpated,
        })
      }
    })
    return comboUpdates
  }, [combos, chestSlotUpdates])

  useUpdateEffect(() => {
    const cleanupFunctions = comboUpdates.map(
      ({ symbol, slotsParticipatingToCombo, chestSlot }) => {
        const symbolCount = slotsParticipatingToCombo.length
        const value = COMBO_SCORES[symbolCount]
        if (!value) {
          return () => {}
        }

        const id = `${symbolCount}-${symbol}-combo`
        return addScoreParticle({
          id,
          value,
          ...chestSlotDomNodeToScoreParticlePosition(
            document.querySelector(`[data-chest-slot="${chestSlot}"]`),
          ),
        })
      },
    )
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
  // tout les dés dans le chests doivent rapporté des points
  // il faut donc reprendre une partie du code qui provient de computeRoundScore
  // et s'assurer de jouer cet effect que si on vient de le déclancher avec un dé

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
        ...chestSlotDomNodeToScoreParticlePosition(
          document.querySelector(`[data-chest-slot="${perfectUpdate.chestSlot}"]`),
        ),
      })
    }
    return undefined
  }, [perfectUpdate])
}

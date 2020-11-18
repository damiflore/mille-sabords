import { useUpdateEffect } from "src/hooks.js"
import { getDomNodeRectangle } from "src/dom/dom.position.js"
import { getRectangleCenterPoint } from "src/helper/rectangle.js"
import { useChestSlots, useDices } from "src/main.store.js"
import { chestSlotContentToSymbol } from "src/chest/chest.jsx"
import { symbolIsCoin } from "src/symbols/symbols.js"

export const useRoundScoreParticleEffects = ({ addScoreParticle }) => {
  useCoinEffect({ addScoreParticle })
}

const useCoinEffect = ({ addScoreParticle }) => {
  const chestSlots = useChestSlots()
  const dices = useDices()

  Object.keys(chestSlots).forEach((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    const slotSymbol = chestSlotContentToSymbol(chestSlotContent, dices)
    const slotHasCoin = slotSymbol && symbolIsCoin(slotSymbol)
    useUpdateEffect(() => {
      if (slotHasCoin) {
        return addScoreParticle({
          id: `chest-slot-${chestSlot}-coin`,
          value: 100,
          ...chestSlotDomNodeToScoreParticlePosition(
            document.querySelector(`[data-chest-slot="${chestSlot}"]`),
          ),
        })
      }
      return undefined
    }, [slotHasCoin])
  })
}

const chestSlotDomNodeToScoreParticlePosition = (chestSlotDomNode) => {
  const domNodeRectangle = getDomNodeRectangle(chestSlotDomNode)
  const centerPoint = getRectangleCenterPoint(domNodeRectangle)
  return centerPoint
}

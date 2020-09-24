import { createLogger } from "@jsenv/logger"
import { throttle } from "src/helper/throttle.js"
import { addDomEventListener } from "src/dom/dom.util.js"

export const enableDragGesture = (
  domNode,
  {
    logLevel = "warn",
    // in case it's passed we will call it only on fast and precise click
    onClick = () => {},
    onGrip = () => {},
    onLongGrip = () => {},
    onRelease = () => {},
    onDrag = () => {},
    onCancel = () => {},
  },
) => {
  const logger = createLogger({ logLevel })
  // a small move is a drag gesture but
  // not yet a drag intent
  // long grip or big enough move set drag intent to true
  let dragIntent = false
  let dragIntentTimeout
  let pendingGesture
  let removeMoveListener = () => {}
  let removeReleaseListener = () => {}

  logger.debug("enable drag on", domNode)

  const removeMousedownListener = addDomEventListener(
    domNode,
    "mousedown",
    (mousedownEvent) => {
      const isRightClick = mousedownEvent.which === 3
      if (isRightClick) {
        logger.debug("ignore right click")
        return
      }

      handleGrip(mouseEventToPagePosition(mousedownEvent), mousedownEvent)
      removeMoveListener = addDomEventListener(
        document,
        "mousemove",
        throttle((mousemoveEvent) => {
          handleMove(mouseEventToPagePosition(mousemoveEvent), mousemoveEvent)
        }),
      )
      removeReleaseListener = addDomEventListener(document, "mouseup", (mouseupEvent) => {
        removeReleaseListener()
        removeMoveListener()
        handleRelease(mouseEventToPagePosition(mouseupEvent), mouseupEvent)
      })
    },
    { passive: true },
  )
  const removeTouchstartListener = addDomEventListener(
    domNode,
    "touchstart",
    (touchstartEvent) => {
      handleGrip(touchEventToPagePosition(touchstartEvent), touchstartEvent)
      removeMoveListener = addDomEventListener(
        document,
        "touchmove",
        throttle((touchmoveEvent) => {
          handleMove(touchEventToPagePosition(touchmoveEvent), touchmoveEvent)
        }),
      )
      removeReleaseListener = addDomEventListener(document, "touchend", (touchendEvent) => {
        removeReleaseListener()
        removeMoveListener()
        handleRelease(touchEventToPagePosition(touchendEvent), touchendEvent)
      })
    },
    { passive: true },
  )
  const removeClickListener = addDomEventListener(domNode, "click", (clickEvent) => {
    if (!dragIntent) {
      onClick(clickEvent)
    }
  })

  let pointerPositionPrevious
  let domNodeStartPosition
  let gripPointerPosition
  let longGripTimeout
  const handleGrip = (pointerPosition, event) => {
    logger.debug("gripping node at", pointerPosition)
    pendingGesture = true
    // gripTimestamp = Date.now()
    gripPointerPosition = pointerPosition
    pointerPositionPrevious = pointerPosition
    domNodeStartPosition = domNodeToPagePosition(domNode)

    onGrip({
      x: domNodeStartPosition.x,
      y: domNodeStartPosition.y,
      event,
    })
    longGripTimeout = setTimeout(handleLongGrip, 300)
  }

  const handleLongGrip = () => {
    onLongGrip()
  }

  const handleMove = (pointerPosition, event) => {
    if (
      pointerPositionPrevious.x === pointerPosition.x &&
      pointerPositionPrevious.y === pointerPosition.y
    ) {
      logger.debug("no real move")
      return
    }
    pointerPositionPrevious = pointerPosition

    const gripHorizontalShift = gripPointerPosition.x - domNodeStartPosition.x
    const gripVerticalShit = gripPointerPosition.y - domNodeStartPosition.y
    const movePosition = {
      // il y a un décalage entre le bord de l'élément et l'endroit ou l'on l'attrape
      // ce décalage doit continuer d'exister pour savoir ou on place l'élément en position fixed
      x: pointerPosition.x - gripHorizontalShift,
      y: pointerPosition.y - gripVerticalShit,
    }
    const relativeX = pointerPosition.x - gripPointerPosition.x
    const relativeY = pointerPosition.y - gripPointerPosition.y

    logger.debug("move node at", movePosition)
    if (Math.abs(relativeX) > 10 || Math.abs(relativeY) > 10) {
      dragIntent = true
    }
    onDrag({
      event,
      ...movePosition,
    })
  }

  const handleRelease = (pointerPosition, event) => {
    logger.debug("releasing node")
    pendingGesture = false
    const gripHorizontalShift = gripPointerPosition.x - domNodeStartPosition.x
    const gripVerticalShit = gripPointerPosition.y - domNodeStartPosition.y
    clearTimeout(longGripTimeout)
    onRelease({
      event,
      x: pointerPositionPrevious.x - gripHorizontalShift,
      y: pointerPositionPrevious.y - gripVerticalShit,
    })
    // setTimeout is to ensure the click cannot happen just after mouseup
    dragIntentTimeout = setTimeout(() => {
      dragIntent = false
    })
  }

  const handleCancel = (event) => {
    if (pendingGesture) {
      logger.debug("cancelling drag", event)
      pendingGesture = false
      onCancel({
        event,
      })
    }
  }

  return (event) => {
    removeClickListener()
    removeMousedownListener()
    removeTouchstartListener()
    removeMoveListener()
    removeReleaseListener()
    clearTimeout(longGripTimeout)
    clearTimeout(dragIntentTimeout)
    handleCancel(event)
  }
}

const domNodeToPagePosition = (domNode) => {
  const rect = domNode.getBoundingClientRect()
  return {
    x: rect.left,
    y: rect.top,
  }
}

const mouseEventToPagePosition = (mouseEvent) => {
  return {
    x: mouseEvent.pageX,
    y: mouseEvent.pageY,
  }
}

const touchEventToPagePosition = (touchEvent) => {
  const firstChangedTouch = touchEvent.changedTouches[0]
  return {
    x: firstChangedTouch.pageX,
    y: firstChangedTouch.pageY,
  }
}

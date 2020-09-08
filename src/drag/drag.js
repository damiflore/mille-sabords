import { createLogger } from "@jsenv/logger"
import { throttle } from "src/helper/throttle.js"

const logger = createLogger({ logLevel: "warn" })

export const enableDragGesture = (
  domNode,
  {
    onGrip = () => {},
    onLongGrip = () => {},
    onRelease = () => {},
    onDrag = () => {},
    onCancel = () => {},
  },
) => {
  let pendingGesture
  let removeMoveListener = () => {}
  let removeReleaseListener = () => {}

  logger.debug("enable drag on", domNode)

  const removeMousedownListener = addDomEventListener(domNode, "mousedown", (mousedownEvent) => {
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
  })
  const removeTouchstartListener = addDomEventListener(domNode, "touchstart", (touchstartEvent) => {
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

    logger.debug("move node at", movePosition)
    onDrag({
      event,
      ...movePosition,

      relativeX: pointerPosition.x - gripPointerPosition.x,
      relativeY: pointerPosition.y - gripPointerPosition.y,
    })
  }

  const handleRelease = (pointerPosition, event) => {
    logger.debug("releasing node")
    pendingGesture = false
    clearTimeout(longGripTimeout)
    onRelease({
      event,
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
    removeMousedownListener()
    removeTouchstartListener()
    removeMoveListener()
    removeReleaseListener()
    clearTimeout(longGripTimeout)
    handleCancel(event)
  }
}

const addDomEventListener = (domNode, eventName, callback, options) => {
  domNode.addEventListener(eventName, callback, options)
  return () => {
    domNode.removeEventListener(eventName, callback, options)
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

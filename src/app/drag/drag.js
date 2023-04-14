import { createLogger } from "@jsenv/logger"

import { throttle } from "/app/helper/throttle.js"
import { addDomEventListener } from "/app/dom/dom.util.js"

export const enableDragGesture = (
  domNode,
  {
    logLevel = "warn",
    onGrip = () => {},
    onLongGrip = () => {},
    // in case it's passed we will call it only on fast and precise click
    onClick = () => {},
    onDrag = () => {},
    onRelease = () => {},
    onCancel = () => {},
    longGripMs = 300,
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
  let cancelMoveThrottling = () => {}

  logger.debug("enable drag on", domNode)

  // disable native drag
  // putting draggable="false" on the element is not enough for firefox
  const removeDragstartListener = addDomEventListener(
    domNode,
    "dragstart",
    (dragstartEvent) => {
      dragstartEvent.preventDefault()
    },
  )

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
      const mousemoveThrottled = throttle((mousemoveEvent) => {
        handleMove(mouseEventToPagePosition(mousemoveEvent), mousemoveEvent)
      })
      cancelMoveThrottling = () => mousemoveThrottled.cancel()
      removeMoveListener = addDomEventListener(
        document,
        "mousemove",
        mousemoveThrottled,
      )
      removeReleaseListener = addDomEventListener(
        document,
        "mouseup",
        (mouseupEvent) => {
          removeReleaseListener()
          removeMoveListener()
          handleRelease(mouseEventToPagePosition(mouseupEvent), mouseupEvent)
        },
      )
    },
    { passive: true },
  )
  const removeTouchstartListener = addDomEventListener(
    domNode,
    "touchstart",
    (touchstartEvent) => {
      handleGrip(touchEventToPagePosition(touchstartEvent), touchstartEvent)
      const touchmoveThrottled = throttle((touchmoveEvent) => {
        handleMove(touchEventToPagePosition(touchmoveEvent), touchmoveEvent)
      })
      cancelMoveThrottling = () => touchmoveThrottled.cancel()
      removeMoveListener = addDomEventListener(
        document,
        "touchmove",
        touchmoveThrottled,
      )
      removeReleaseListener = addDomEventListener(
        document,
        "touchend",
        (touchendEvent) => {
          removeReleaseListener()
          removeMoveListener()
          handleRelease(touchEventToPagePosition(touchendEvent), touchendEvent)
        },
      )
    },
    { passive: true },
  )
  const removeClickListener = addDomEventListener(
    domNode,
    "click",
    (clickEvent) => {
      if (!dragIntent && dropEffect === "none") {
        onClick(clickEvent)
      }
    },
  )

  let pointerPositionPrevious
  let domNodeStartPosition
  let gripPointerPosition
  let longGripTimeout
  let dropEffect
  const handleGrip = (pointerPosition, event) => {
    logger.debug("gripping node at", pointerPosition)
    pendingGesture = true
    dropEffect = "none"
    gripPointerPosition = pointerPosition
    pointerPositionPrevious = pointerPosition
    domNodeStartPosition = domNodeToPagePosition(domNode)

    onGrip({
      x: domNodeStartPosition.x,
      y: domNodeStartPosition.y,
      event,
    })
    longGripTimeout = setTimeout(handleLongGrip, longGripMs)
  }

  const handleLongGrip = () => {
    dragIntent = true
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
    onDrag({
      event,
      ...movePosition,
      relativeX,
      relativeY,
      setDropEffect: (value) => {
        dropEffect = value
      },
    })
  }

  const handleRelease = (pointerPosition, event) => {
    logger.debug("releasing node")
    pendingGesture = false
    clearTimeout(longGripTimeout)

    const gripHorizontalShift = gripPointerPosition.x - domNodeStartPosition.x
    const gripVerticalShit = gripPointerPosition.y - domNodeStartPosition.y

    onRelease({
      event,
      dropEffect,
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
    removeDragstartListener()
    removeClickListener()
    removeMousedownListener()
    removeTouchstartListener()
    removeMoveListener()
    removeReleaseListener()
    clearTimeout(longGripTimeout)
    clearTimeout(dragIntentTimeout)
    cancelMoveThrottling()
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

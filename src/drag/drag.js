import { createLogger } from "@jsenv/logger"

const logger = createLogger({ logLevel: "debug" })

export const enableDragGesture = (domNode, gestureCallback) => {
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
    onGrip(mouseEventToPagePosition(mousedownEvent), mousedownEvent)

    removeMoveListener = addDomEventListener(document, "mousemove", (mousemoveEvent) => {
      onMove(mouseEventToPagePosition(mousemoveEvent), mousemoveEvent)
    })
    removeReleaseListener = addDomEventListener(document, "mouseup", (mouseupEvent) => {
      removeReleaseListener()
      removeMoveListener()
      onRelease(mouseEventToPagePosition(mouseupEvent), mouseupEvent)
    })
  })
  const removeTouchstartListener = addDomEventListener(domNode, "touchstart", (touchstartEvent) => {
    onGrip(touchEventToPagePosition(touchstartEvent), touchstartEvent)

    removeMoveListener = addDomEventListener(document, "touchmove", (touchmoveEvent) => {
      onMove(touchEventToPagePosition(touchmoveEvent), touchmoveEvent)
    })
    removeReleaseListener = addDomEventListener(document, "touchend", (touchendEvent) => {
      removeReleaseListener()
      removeMoveListener()
      onRelease(touchEventToPagePosition(touchendEvent), touchendEvent)
    })
  })

  // let gripTimestamp
  let gripGesture
  let domNodeStartPosition
  let gripPointerPosition
  let longGripTimeout
  const onGrip = (pointerPosition, event) => {
    logger.debug("gripping node at", pointerPosition)
    pendingGesture = true
    // gripTimestamp = Date.now()
    gripPointerPosition = pointerPosition
    domNodeStartPosition = domNodeToPagePosition(domNode)

    gripGesture = {
      type: "grip",
      x: domNodeStartPosition.x,
      y: domNodeStartPosition.y,
      event,
    }
    gestureCallback(gripGesture)

    longGripTimeout = setTimeout(onLongGrip, 300)
  }

  const onLongGrip = () => {
    disableClick()
  }

  const disableClick = () => {
    domNode.style.pointerEvents = "none"
  }

  let lastMoveGesture
  const onMove = (pointerPosition, event) => {
    const horizontalMove = pointerPosition.x - gripPointerPosition.x
    const verticalMove = pointerPosition.y - gripPointerPosition.y
    // when use performs a big move we know it's a grab as well
    // when the move is too subtle, we ignore it, meaning the node does not move
    // and the click can still happen, (we should change the threshold for touch?)
    // maybe a better solution would take into account the time too
    // like we could consider that mousedown + mousemove + mouseup too fast is a click
    // or if you release fast it's a click
    // otherwise it's a grap
    // a fast and subsequent move is also a grab
    // -> does not work, the disable click is not enough as if the release reset pointer events fast enough
    // do that browser still consider it's a click
    if (horizontalMove > 5 || verticalMove > 5) {
      disableClick()
    }

    const gripHorizontalShift = gripPointerPosition.x - domNodeStartPosition.x
    const gripVerticalShit = gripPointerPosition.y - domNodeStartPosition.y

    const moveGesture = {
      type: "move",
      event,
      // il y a un décalage entre le bord de l'élément et l'endroit ou l'on l'attrape
      // ce décalage doit continuer d'exister pour savoir ou on place l'élément en position fixed
      x: pointerPosition.x - gripHorizontalShift,
      y: pointerPosition.y - gripVerticalShit,
    }
    lastMoveGesture = moveGesture
    gestureCallback(moveGesture)
  }

  const onRelease = (pointerPosition, event) => {
    logger.debug("releasing node")
    domNode.style.pointerEvents = "auto"
    pendingGesture = false
    const releaseGesture = {
      type: "release",
      event,
      x: lastMoveGesture.x,
      y: lastMoveGesture.y,
      // gripGesture,
    }
    clearTimeout(longGripTimeout)
    gestureCallback(releaseGesture)
  }

  const onCancel = (event) => {
    if (pendingGesture) {
      logger.debug("cancelling drag", event)
      pendingGesture = false
      const cancelGesture = {
        type: "cancel",
        event,
      }
      gestureCallback(cancelGesture)
    }
  }

  return (event) => {
    removeMousedownListener()
    removeTouchstartListener()
    removeMoveListener()
    removeReleaseListener()
    onCancel(event)
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

export const enableDragAndDropGesture = (domNode, gestureCallback) => {
  let pendingGesture
  let removeMoveListener = () => {}
  let removeReleaseListener = () => {}

  const removeMousedownListener = addDomEventListener(domNode, "mousedown", (mousedownEvent) => {
    const isRightClick = mousedownEvent.which === 3
    if (isRightClick) return
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

  let gripGesture
  let gapX
  let gapY
  const onGrip = (pointerPosition, event) => {
    // il y a un décalage entre le bord de l'élément et l'endroit ou l'on l'attrape
    // ce décalage doit continuer d'exister pour savoir ou on place l'élément en position fixed
    pendingGesture = true
    const domNodePagePosition = domNodeToPagePosition(domNode)
    gapX = pointerPosition.x - domNodePagePosition.x
    gapY = pointerPosition.y - domNodePagePosition.y

    gripGesture = {
      type: "grip",
      x: domNodePagePosition.x,
      y: domNodePagePosition.y,
      event,
    }
    gestureCallback(gripGesture)
  }

  const onMove = (pointerPosition, event) => {
    const moveGesture = {
      type: "move",
      event,
      x: pointerPosition.x - gapX,
      y: pointerPosition.y - gapY,
    }
    gestureCallback(moveGesture)
  }

  const onRelease = (pointerPosition, event) => {
    pendingGesture = false
    const releaseGesture = {
      type: "release",
      event,
      x: pointerPosition.x - gapX,
      y: pointerPosition.y - gapY,
      // gripGesture,
    }
    gestureCallback(releaseGesture)
  }

  const onCancel = (event) => {
    if (pendingGesture) {
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

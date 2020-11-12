export const observeElementResizing = (element, callback) => {
  let resizeListeners

  if (resizeListenersMap.has(element)) {
    resizeListeners = resizeListenersMap.get(element)
  } else {
    resizeObserver.observe(element)
    resizeListeners = []
    resizeListenersMap.set(element, resizeListeners)
  }

  resizeListeners.push(callback)

  return () => {
    const index = resizeListeners.indexOf(callback)
    if (index > -1) {
      resizeListeners.splice(index, 1)
      if (resizeListeners.length === 0) {
        resizeObserver.unobserve(element)
      }
    }
  }
}

const resizeListenersMap = new Map()

const resizeObserverCallback = (entries) => {
  entries.forEach((entry) => {
    const resizeListeners = resizeListenersMap.get(entry.target)
    if (resizeListeners) {
      resizeListeners.forEach((resizeListener) => {
        resizeListener(entry, entries)
      })
    }
  })
}

const resizeObserver = new ResizeObserver(resizeObserverCallback)

export const createSignal = () => {
  let listeners = []

  const listen = (callback) => {
    let removed = false
    listeners = [...listeners, callback]
    return () => {
      if (removed) return
      removed = true
      const listenersWithoutCallback = []
      let i = listeners.length
      let searching = true
      while (i--) {
        const listenerCandidate = listeners[i]
        if (searching) {
          if (listenerCandidate === callback) {
            searching = false
          } else {
            listenersWithoutCallback.push(listenerCandidate)
          }
        } else {
          listenersWithoutCallback.push(listenerCandidate)
        }
      }
      listeners = listenersWithoutCallback
    }
  }

  const emit = (...args) => {
    listeners.forEach((listener) => {
      listener(...args)
    })
  }

  return { listen, emit }
}

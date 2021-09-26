export const throttle = (fn, ms = 60, { trailing = false } = {}) => {
  let timeout
  let previousMs

  const throttled = (...args) => {
    clearTimeout(timeout)
    const nowMs = Date.now()
    // la fonction a été appelé il y a previous
    if (previousMs) {
      // ca fait combien de temps
      const msEllapsedSincePreviousCall = nowMs - previousMs

      if (msEllapsedSincePreviousCall < ms) {
        // pas suffisament de temps écoulé
        if (trailing) {
          const remaining = ms - msEllapsedSincePreviousCall
          timeout = setTimeout(() => throttled(...args), remaining)
        }
      } else {
        // suffisament de temps écoulé
        previousMs = nowMs
        fn(...args)
      }
    } else {
      // calls right now
      previousMs = nowMs
      fn(...args)
    }
  }

  const cancel = () => {
    clearTimeout(timeout)
  }
  throttled.cancel = cancel

  return throttled
}

export const requestAsapCallback = window.requestIdleCallback
  ? (callback) => {
      const requestId = window.requestIdleCallback(callback)
      return () => {
        window.cancelIdleCallback(requestId)
      }
    }
  : (callback) => {
      const requestId = window.requestAnimationFrame(callback)
      return () => {
        window.cancelAnimationFrame(requestId)
      }
    }

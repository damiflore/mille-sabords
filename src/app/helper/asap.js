export const requestAsapCallback = window.requestIdleCallback
  ? (callback) => {
      const requestId = window.requestIdleCallback(callback, { timeout: 400 })
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

export const nextIDLEPromise = window.requestIdleCallback
  ? ({ timeout = 60 } = {}) => {
      return new Promise((resolve) => {
        window.requestIdleCallback(resolve, { timeout })
      })
    }
  : () => {
      return new Promise((resolve) => {
        window.requestAnimationFrame(resolve)
      })
    }

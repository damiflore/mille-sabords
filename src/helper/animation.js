export const startJavaScriptAnimation = ({
  duration = 300,
  timingFunction = (t) => t, // https://easings.net/
  onProgress = () => {},
  onCancel = () => {},
  onComplete = () => {},
}) => {
  if (isNaN(duration)) {
    // console.warn(`duration must be a number, received ${duration}`)
    return () => {}
  }
  duration = parseInt(duration, 10)
  const startMs = performance.now()
  let currentRequestAnimationFrameId
  let done = false
  let rawProgress = 0
  let progress = 0
  const handler = () => {
    currentRequestAnimationFrameId = null
    const nowMs = performance.now()
    rawProgress = Math.min((nowMs - startMs) / duration, 1)
    progress = timingFunction(rawProgress)
    done = rawProgress === 1
    onProgress({
      done,
      rawProgress,
      progress,
    })
    if (done) {
      onComplete()
    } else {
      currentRequestAnimationFrameId = window.requestAnimationFrame(handler)
    }
  }
  handler()
  const stop = () => {
    if (currentRequestAnimationFrameId) {
      window.cancelAnimationFrame(currentRequestAnimationFrameId)
      currentRequestAnimationFrameId = null
    }
    if (!done) {
      done = true
      onCancel({
        rawProgress,
        progress,
      })
    }
  }
  return stop
}

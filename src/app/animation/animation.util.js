export const animateSequence = (fns) => {
  let cancel = () => {}
  let index = 0

  const returnValue = {
    onfinish: () => {},
    cancel: () => cancel(),
  }

  const animateNext = () => {
    if (index === fns.length) {
      returnValue.onfinish()
      return
    }
    const fn = fns[index]
    index++
    const animation = fn()
    cancel = animation.cancel
    animation.onfinish = () => {
      animateNext()
    }
  }
  animateNext()

  return returnValue
}

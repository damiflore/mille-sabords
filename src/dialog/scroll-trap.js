import { getStyleValue, isDocumentElement } from "src/dom/dom.util.js"

export const trapScrollInside = (element) => {
  const elementsToScrollLock = []
  let previous = element.previousSibling
  while (previous) {
    if (previous.nodeType === 1) {
      if (isScrollable(previous)) {
        elementsToScrollLock.push(previous)
      }
    }
    previous = previous.previousSibling
  }

  const scrollableParents = getAllScrollableParent(element)
  elementsToScrollLock.push(...scrollableParents)
  const cleanUpArray = elementsToScrollLock.map((element) => {
    const prev = element.style.overflow
    element.style.overflow = "hidden"
    return () => {
      if (prev) {
        element.style.overflow = prev
      } else {
        element.style.removeProperty("overflow")
      }
    }
  })

  return () => {
    cleanUpArray.forEach((cleanup) => {
      cleanup()
    })
  }
}

const getAllScrollableParent = (element) => {
  const scrollableParents = []

  const visitElement = (elementOrScrollableParent) => {
    const scrollableParent = getScrollableParent(elementOrScrollableParent)
    if (scrollableParent) {
      scrollableParents.push(scrollableParent)
      if (scrollableParent === document) {
        return
      }
      visitElement(scrollableParent)
    }
  }
  visitElement(element)

  return scrollableParents
}

const getScrollableParent = (arg) => {
  if (typeof arg !== "object" || arg.nodeType !== 1) {
    throw new TypeError("getScrollableParent first argument must be DOM node")
  }
  const element = arg
  if (element === document.documentElement) {
    return null
  }
  const position = getStyleValue(element, "position")

  if (position === "fixed") {
    return getScrollingElement(element.ownerDocument)
  }
  return findScrollableParent(element) || getScrollingElement(element.ownerDocument)
}

const getScrollingElement = (document) => {
  if ("scrollingElement" in document) {
    return document.scrollingElement
  }

  if (isCompliant(document)) {
    return document.documentElement
  }

  const body = document.body
  const isFrameset = body && !/body/i.test(body.tagName)
  const possiblyScrollingElement = isFrameset ? getNextBodyElement(body) : body

  // If `body` is itself scrollable, it is not the `scrollingElement`.
  return possiblyScrollingElement && bodyIsScrollable(possiblyScrollingElement)
    ? null
    : possiblyScrollingElement
}

const getNextBodyElement = (frameset) => {
  // We use this function to be correct per spec in case `document.body` is
  // a `frameset` but there exists a later `body`. Since `document.body` is
  // a `frameset`, we know the root is an `html`, and there was no `body`
  // before the `frameset`, so we just need to look at siblings after the
  // `frameset`.
  let current = frameset
  while ((current = current.nextSibling)) {
    if (current.nodeType === 1 && isBodyElement(current)) {
      return current
    }
  }
  return null
}

const isBodyElement = (element) => element.ownerDocument.body === element

const bodyIsScrollable = (body) => {
  // a body element is scrollable if body and html are scrollable and rendered
  if (!isScrollable(body)) {
    return false
  }
  if (isHidden(body)) {
    return false
  }

  const documentElement = body.ownerDocument.documentElement
  if (!isScrollable(documentElement)) {
    return false
  }
  if (isHidden(documentElement)) {
    return false
  }

  return true
}

const isHidden = (element) => {
  const display = getStyleValue(element, "display")
  if (display === "none") {
    return false
  }

  if (display === "table-row" || display === "table-group" || display === "table-column") {
    return getStyleValue(element, "visibility") !== "collapsed"
  }

  return true
}

const isCompliant = (document) => {
  // Note: document.compatMode can be toggle at runtime by document.write
  const isStandardsMode = /^CSS1/.test(document.compatMode)
  if (isStandardsMode) {
    return testScrollCompliance(document)
  }
  return false
}

const testScrollCompliance = (document) => {
  const iframe = document.createElement("iframe")
  iframe.style.height = "1px"
  const parentNode = document.body || document.documentElement || document
  parentNode.appendChild(iframe)
  const iframeDocument = iframe.contentWindow.document
  iframeDocument.write('<!DOCTYPE html><div style="height:9999em">x</div>')
  iframeDocument.close()
  const scrollComplianceResult =
    iframeDocument.documentElement.scrollHeight > iframeDocument.body.scrollHeight
  iframe.parentNode.removeChild(iframe)
  return scrollComplianceResult
}

const isScrollable = (element) => {
  // note: keep in mind that an element with overflow: 'hidden' is scrollable
  // it can be scrolled using keyboard arrows or JavaScript properties such as scrollTop, scrollLeft
  if (!verticalOverflowIsVisible(element)) {
    return true
  }

  if (!horizontalOverflowIsVisible(element)) {
    return true
  }

  return false
}

const verticalOverflowIsVisible = (element) => {
  const verticalOverflow = getStyleValue(element, "overflow-x")
  if (verticalOverflow === "visible") {
    return true
  }

  const overflow = getStyleValue(element, "overflow")
  return overflow === "visible"
}

const horizontalOverflowIsVisible = (element) => {
  const horizontalOverflow = getStyleValue(element, "overflow-y")
  if (horizontalOverflow === "visible") {
    return true
  }
  const overflow = getStyleValue(element, "overflow")
  return overflow === "visible"
}

const findScrollableParent = (element) => {
  if (element === document.documentElement) return null

  const position = getStyleValue(element, "position")
  let parent = element.parentNode
  while (parent) {
    if (isDocumentElement(parent)) {
      return null
    }
    if (position === "absolute" && getStyleValue(parent, "position") === "static") {
      parent = parent.parentNode
      continue
    }
    if (isScrollable(parent)) {
      return parent
    }
    parent = parent.parentNode
  }
  return null
}

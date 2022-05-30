/* eslint-disable valid-jsdoc */

export const addDomEventListener = (domNode, eventName, callback, options) => {
  domNode.addEventListener(eventName, callback, options)
  return () => {
    domNode.removeEventListener(eventName, callback, options)
  }
}

// checking if somthing is window is tricky
// we could also use a.constructor.name === 'Window'
// but it's safer to use approach below
export const elementIsWindow = (a) => a.window === a

export const elementIsDocument = (a) => a.nodeType === 9

export const elementIsIframe = ({ nodeName }) => nodeName === "IFRAME"

export const isFocusable = (node) => {
  // only element node can be focused, document, textNodes etc cannot
  if (node.nodeType !== 1) {
    return false
  }
  const nodeName = node.nodeName.toLowerCase()

  if (nodeName === "input") {
    if (node.type === "hidden") {
      return false
    }
    return isVisible(node)
  }

  if (
    ["button", "select", "datalist", "iframe", "textarea"].indexOf(nodeName) >
    -1
  ) {
    return isVisible(node)
  }

  if (node.hasAttribute("tabindex") || node.hasAttribute("tabIndex")) {
    return isVisible(node)
  }

  if (node.hasAttribute("draggable")) {
    return isVisible(node)
  }

  if (["a", "area"].indexOf(nodeName) > -1) {
    if (node.hasAttribute("href") === false) {
      return false
    }
    return isVisible(node)
  }

  if (["audio", "video"].indexOf(nodeName) > -1) {
    if (node.hasAttribute("controls") === false) {
      return false
    }
    return isVisible(node)
  }

  return false
}

export const isVisible = (node) => {
  if (isDocumentElement(node)) {
    return true
  }
  if (getStyleValue(node, "visibility") === "hidden") {
    return false
  }

  let nodeOrAncestor = node
  while (nodeOrAncestor) {
    if (isDocumentElement(nodeOrAncestor)) {
      break
    }
    if (getStyleValue(nodeOrAncestor, "display") === "none") {
      return false
    }
    nodeOrAncestor = nodeOrAncestor.parentNode
  }

  return true
}

// https://github.com/davidtheclark/tabbable/blob/master/index.js
export const isDocumentElement = (node) =>
  node === node.ownerDocument.documentElement

export const getStyle = (element) =>
  elementToOwnerWindow(element).getComputedStyle(element)

export const getStyleValue = (element, name) =>
  getStyle(element).getPropertyValue(name)

/**
 * elementToOwnerWindow returns the window owning the element.
 * Usually an element window will just be window.
 * But when an element is inside an iframe, the window of that element
 * is iframe.contentWindow
 * It's often important to work with the correct window because
 * element are scoped per iframes.
 */
export const elementToOwnerWindow = (element) => {
  if (elementIsWindow(element)) return element

  if (elementIsDocument(element)) return element.defaultView

  return elementToOwnerDocument(element).defaultView
}

/**
 * elementToOwnerDocument returns the document containing the element.
 * Usually an element document is window.document.
 * But when an element is inside an iframe, the document of that element
 * is iframe.contentWindow.document
 * It's often important to work with the correct document because
 * element are scoped per iframes.
 */
export const elementToOwnerDocument = (element) => {
  if (elementIsWindow(element)) return element.document

  if (elementIsDocument(element)) return element

  return element.ownerDocument
}

export const getDocumentScroll = (element) => {
  const elementWindow = elementToOwnerWindow(element)
  const elementDocument = elementToOwnerDocument(element)
  return {
    x: elementWindow.pageXOffset || elementDocument.documentElement.scrollLeft,
    y: elementWindow.pageYOffset || elementDocument.documentElement.scrollTop,
  }
}

/**
 * elementToOwnerIframe returns the iframe owning the element or null
 * when element is not inside an iframe.
 */
export const elementToOwnerIframe = (element) => {
  const elementOwnerWindow = elementToOwnerWindow(element)
  // element is not inside an iframe because it is owned by window
  // if element is window itself, elementOwnerWindow is window too
  // because elementToOwnerWindow(window) returns window
  if (elementOwnerWindow === window) return null

  const parentDocument = elementOwnerWindow.parent.document
  return Array.from(parentDocument.querySelectorAll("iframe")).find(
    (iframe) =>
      iframeIsFriendly(iframe) &&
      iframe.contentWindow.document.contains(element),
  )
}

/**
 * This function is used to ensure we are allowed to manipulate an iframe.
 * If we don't do this check before doing stuff like adding 'mousemove' event
 * to the iframe, it will throw an error.
 * A friendly iframe is usually an iframe with src set to 'about:blank'.
 * The opposite of a friendly iframe is an iframe on an other domain.
 */
export const iframeIsFriendly = (iframe) => {
  const key = `${Number(new Date())}${Math.random()}`
  const value = {}

  try {
    const iframeWindow = iframe.contentWindow
    iframeWindow[key] = value
    const isFriendly = iframeWindow[key] === value
    delete iframeWindow[key]
    return isFriendly
  } catch (e) {
    return false
  }
}

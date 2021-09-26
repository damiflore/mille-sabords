import {
  rectangleInsideOf,
  rectangleRelativeTo,
  rectangleCollidesWithRectangle,
  findRectangleCloserToRectangle,
} from "root/src/app/helper/rectangle.js"

import { getDocumentScroll } from "./dom.util.js"

export const getDomNodeRectangle = (domNode) => {
  const domNodeRect = domNode.getBoundingClientRect()
  const documentScroll = getDocumentScroll(domNode)
  const left = domNodeRect.left + documentScroll.x
  const top = domNodeRect.top + documentScroll.y
  const right = left + domNodeRect.width
  const bottom = top + domNodeRect.height

  return {
    left: Math.floor(left),
    top: Math.floor(top),
    right: Math.floor(right),
    bottom: Math.floor(bottom),
  }
}

export const rectangleToRectangleInsideDomNode = (rectangle, domNode) => {
  const domNodeRectangle = getDomNodeRectangle(domNode)
  const rectangleInsideDomNode = rectangleInsideOf(rectangle, domNodeRectangle)
  return rectangleInsideDomNode
}

export const rectangleRelativeToDomNode = (rectangle, domNode) => {
  const domNodeRectangle = getDomNodeRectangle(domNode)
  const rectangleInsideDomNode = rectangleInsideOf(rectangle, domNodeRectangle)
  const rectangleInsideAndRelative = rectangleRelativeTo(
    rectangleInsideDomNode,
    domNodeRectangle,
  )
  return rectangleInsideAndRelative
}

export const rectangleAbsoluteToDomNode = (rectangle, domNode) => {
  const domNodeRectangle = getDomNodeRectangle(domNode)
  const rectangleWidth = rectangle.right - rectangle.left
  const rectangleHeight = rectangle.bottom - rectangle.top
  const rectangleAbsolute = {
    left: domNodeRectangle.left + rectangle.left,
    top: domNodeRectangle.top + rectangle.top,
    right: domNodeRectangle.left + rectangle.left + rectangleWidth,
    bottom: domNodeRectangle.top + rectangle.top + rectangleHeight,
  }
  return rectangleAbsolute
}

export const domNodeCollidesWithRectangle = (domNode, rectangle) => {
  const domNodeRectangle = getDomNodeRectangle(domNode)
  return rectangleCollidesWithRectangle(domNodeRectangle, rectangle)
}

export const findDomNodeClosestToRectangle = (domNodeCandidates, rectangle) => {
  const rectangleCandidates = domNodeCandidates.map((domNodeCandidate) =>
    getDomNodeRectangle(domNodeCandidate),
  )
  const closestRectangle = findRectangleCloserToRectangle(
    rectangleCandidates,
    rectangle,
  )
  return domNodeCandidates[rectangleCandidates.indexOf(closestRectangle)]
}

export const printPointInDocument = (
  { x, y },
  { color = "yellow", autoRemove = true, autoRemoveAfter = 2000 } = {},
) => {
  const div = document.createElement("div")
  div.style.position = "absolute"
  div.style.zIndex = "1000"
  div.style.left = `${x}px`
  div.style.top = `${y}px`
  div.style.width = "5px"
  div.style.height = "5px"
  div.style.background = color
  div.style.border = "1px solid red"
  document.body.appendChild(div)

  const remove = () => {
    document.body.removeChild(div)
  }

  let autoRemoveTimeout
  if (autoRemove) {
    autoRemoveTimeout = setTimeout(remove, autoRemoveAfter)
  }

  return () => {
    remove()
    clearTimeout(autoRemoveTimeout)
  }
}

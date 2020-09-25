import { getDocumentScroll } from "./dom.util.js"
import {
  rectangleInsideOf,
  rectangleRelativeTo,
  rectangleCollidesWithRectangle,
  findRectangleCloserToRectangle,
} from "src/helper/rectangle.js"

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
  const rectangleInsideAndRelative = rectangleRelativeTo(rectangleInsideDomNode, domNodeRectangle)
  return rectangleInsideAndRelative
}

export const domNodeCollidesWithRectangle = (domNode, rectangle) => {
  const domNodeRectangle = getDomNodeRectangle(domNode)
  return rectangleCollidesWithRectangle(domNodeRectangle, rectangle)
}

export const findDomNodeClosestToRectangle = (domNodeCandidates, rectangle) => {
  const rectangleCandidates = domNodeCandidates.map((domNodeCandidate) =>
    getDomNodeRectangle(domNodeCandidate),
  )
  const closestRectangle = findRectangleCloserToRectangle(rectangleCandidates, rectangle)
  return domNodeCandidates[rectangleCandidates.indexOf(closestRectangle)]
}

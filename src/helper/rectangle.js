// https://github.com/infusion/Rectangles.js/blob/master/rectangles.js

import { elementToOwnerWindow, elementToOwnerDocument } from "src/dom/dom.js"

export const rectangleCollidesWith = (firstRect, secondRect) => {
  // first left of second
  if (firstRect.right <= secondRect.left) return false
  // first right of second
  if (firstRect.left >= secondRect.right) return false
  // first above second
  if (firstRect.bottom <= secondRect.top) return false
  // first below second
  if (firstRect.top >= secondRect.bottom) return false
  return true
}

export const rectangleInsideOf = (rectangle, parentRectangle) => {
  let left = rectangle.left
  let right = rectangle.right
  const width = right - left
  if (left < parentRectangle.left) {
    left = parentRectangle.left
    right = left + width
  } else if (right > parentRectangle.right) {
    left = parentRectangle.right - width
    right = left + width
  }

  let top = rectangle.top
  let bottom = rectangle.bottom
  const height = bottom - top
  if (top < parentRectangle.top) {
    top = parentRectangle.top
    bottom = top + height
  } else if (bottom > parentRectangle.bottom) {
    top = parentRectangle.bottom - height
    bottom = top + height
  }

  return {
    left,
    right,
    top,
    bottom,
  }
}

export const rectangleRelativeTo = (rectangle, parentRectangle) => {
  const left = rectangle.left - parentRectangle.left
  const width = rectangle.right - rectangle.left
  const right = left + width

  const top = rectangle.top - parentRectangle.top
  const height = rectangle.bottom - rectangle.top
  const bottom = top + height

  return {
    left,
    right,
    top,
    bottom,
  }
}

export const findClosestRectangle = (rectangle, rectangleCandidates) => {
  let smallestDistance = getDistanceBetweenRectangles(rectangle, rectangleCandidates[0])
  return rectangleCandidates.reduce((prev, rectangleCandidate) => {
    const distance = getDistanceBetweenRectangles(rectangle, rectangleCandidate)
    if (distance < smallestDistance) {
      smallestDistance = distance
      return rectangleCandidate
    }
    return prev
  })
}

const getRectangleArea = ({ left, right, top, bottom }) => {
  const width = right - left
  const height = bottom - top
  return width * height
}

const getRectangleCenterPoint = ({ left, right, top, bottom }) => {
  return {
    x: left + (right - left) / 2,
    y: top + (bottom - top) / 2,
  }
}

const getDistanceBetweenRectangles = (firstRectangle, secondRectangle) => {
  const firstRectangleCenterPoint = getRectangleCenterPoint(firstRectangle)
  const secondRectangleCenterPoint = getRectangleCenterPoint(secondRectangle)
  return getDistanceBetweenTwoPoints(firstRectangleCenterPoint, secondRectangleCenterPoint)
}

const getDistanceBetweenTwoPoints = (firstPoint, secondPoint) => {
  const horizontalDiff = firstPoint.x - secondPoint.x
  const verticalDiff = firstPoint.y - secondPoint.y
  return Math.sqrt(horizontalDiff * horizontalDiff + verticalDiff * verticalDiff)
}

export const getRectangleIntersectionRatio = (firstRectangle, secondRectangle) => {
  const firstRectangleArea = getRectangleArea(firstRectangle)
  const overlapArea = getRectangleArea(rectangleOverlapping(firstRectangle, secondRectangle))
  return firstRectangleArea / overlapArea
}

export const rectangleOverlapping = ({ left, right, top, bottom }, intersectingRectangle) => {
  const overlapRectangle = {
    left: left < intersectingRectangle.left ? intersectingRectangle.left : left,
    right: right < intersectingRectangle.right ? right : intersectingRectangle.right,
    top: top < intersectingRectangle.top ? intersectingRectangle.top : top,
    bottom: bottom < intersectingRectangle.bottom ? bottom : intersectingRectangle.bottom,
  }
  return overlapRectangle
}

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

const getDocumentScroll = (element) => {
  const elementWindow = elementToOwnerWindow(element)
  const elementDocument = elementToOwnerDocument(element)
  return {
    x: elementWindow.pageXOffset || elementDocument.documentElement.scrollLeft,
    y: elementWindow.pageYOffset || elementDocument.documentElement.scrollTop,
  }
}

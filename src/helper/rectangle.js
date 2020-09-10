// https://github.com/infusion/Rectangles.js/blob/master/rectangles.js

import { elementToOwnerWindow, elementToOwnerDocument } from "src/dom/dom.js"

export const rectangleCollidesWithRectangle = (firstRectangle, secondRectangle) => {
  if (firstRectangle.rotation || secondRectangle.rotation) {
    return rotatedRectangleCollidesWithRotatedRectangle(firstRectangle, secondRectangle)
  }

  // first left of second
  if (firstRectangle.right <= secondRectangle.left) return false
  // first right of second
  if (firstRectangle.left >= secondRectangle.right) return false
  // first above second
  if (firstRectangle.bottom <= secondRectangle.top) return false
  // first below second
  if (firstRectangle.top >= secondRectangle.bottom) return false

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

const rotatedRectangleCollidesWithRotatedRectangle = (
  firstRotatedRectangle,
  secondRotatedRectangle,
) =>
  someRectangleSideLine(firstRotatedRectangle, (firstRotatedRectangleSideLine) =>
    lineCollidesWithRectangle(firstRotatedRectangleSideLine, secondRotatedRectangle),
  )

// https://riptutorial.com/html5-canvas/example/17710/are-line-segment-and-rectangle-colliding-
// attention: il est possible que la ligne soit entierement dans le rectangle
// auquel cas elle n'intersect pas le rectangle mais est bien en collision avec celui ci
const lineCollidesWithRectangle = (line, rectangle) =>
  someRectangleSideLine(rectangle, (rectangleSideLine) =>
    lineCollidesWithLine(line, rectangleSideLine),
  )

const lineCollidesWithLine = (firstLine, secondLine) => {
  let unknownA =
    (secondLine.end.x - secondLine.start.x) * (firstLine.start.y - secondLine.start.y) -
    (secondLine.end.y - secondLine.start.y) * (firstLine.start.x - secondLine.start.x)
  let unknownB =
    (firstLine.end.x - firstLine.start.x) * (firstLine.start.y - secondLine.start.y) -
    (firstLine.end.y - firstLine.start.y) * (firstLine.start.x - secondLine.start.x)
  const denominator =
    (secondLine.end.y - secondLine.start.y) * (firstLine.end.x - firstLine.start.x) -
    (secondLine.end.x - secondLine.start.x) * (firstLine.end.y - firstLine.start.y)

  // Test if Coincident
  // If the denominator and numerator for the ua and ub are 0
  // then the two lines are coincident.
  if (unknownA === 0 && unknownB === 0 && denominator === 0) {
    return false
  }

  // Test if Parallel
  // If the denominator for the equations for ua and ub is 0
  // then the two lines are parallel.
  if (denominator === 0) {
    return false
  }

  // test if line segments are colliding
  unknownA /= denominator
  unknownB /= denominator
  const isIntersecting = unknownA >= 0 && unknownA <= 1 && unknownB >= 0 && unknownB <= 1

  return isIntersecting
}

const someRectangleSideLine = (rectangle, predicate) => {
  const topLeftPoint = { x: rectangle.left, y: rectangle.top }
  const topRightPoint = { x: rectangle.right, y: rectangle.top }
  const bottomRightPoint = { x: rectangle.right, y: rectangle.bottom }
  const bottomLeftPoint = { x: rectangle.left, y: rectangle.bottom }

  const rectangleTopLine = {
    start: topLeftPoint,
    end: topRightPoint,
  }
  if (predicate(rectangleTopLine)) return true
  const rectangleRightLine = {
    start: topRightPoint,
    end: bottomRightPoint,
  }
  if (predicate(rectangleRightLine)) return true
  const rectangleBottomLine = {
    start: bottomRightPoint,
    end: bottomLeftPoint,
  }
  if (predicate(rectangleBottomLine)) return true
  const rectangleLeftLine = {
    start: topLeftPoint,
    end: bottomLeftPoint,
  }
  if (predicate(rectangleLeftLine)) return true
  return false
}

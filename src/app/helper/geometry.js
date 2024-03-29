import { getDocumentScroll, getStyleValue } from "/app/dom/dom.util.js"

export const rotatePoint = (origin, point, degrees) => {
  const radians = degreesToRadians(degrees)
  const cosinus = Math.cos(radians)
  const sinus = Math.sin(radians)
  const run = point.x - origin.x
  const rise = point.y - origin.y

  return {
    x: Math.round(cosinus * run + sinus * rise + origin.x),
    y: Math.round(cosinus * rise - sinus * run + origin.y),
  }
}

export const getDistanceBetweenTwoPoints = (firstPoint, secondPoint) => {
  const horizontalDiff = firstPoint.x - secondPoint.x
  const verticalDiff = firstPoint.y - secondPoint.y
  return Math.sqrt(
    horizontalDiff * horizontalDiff + verticalDiff * verticalDiff,
  )
}

const getRectangleCenterPoint = ([
  topLeft,
  topRight,
  bottomRight,
  bottomLeft,
]) => {
  return {
    x: (topLeft.x + topRight.x + bottomRight.x + bottomLeft.x) / 4,
    y: (topLeft.y + topRight.y + bottomRight.y + bottomLeft.y) / 4,
  }
}

export const rotateRectangle = (
  points,
  degree,
  origin = getRectangleCenterPoint(points),
) => {
  return points.map((point) => rotatePoint(origin, point, degree))
}

const degreesToRadians = (degrees) => (degrees * Math.PI) / 180

const radiansToDegree = (radians) => Math.round(radians * (180 / Math.PI))

// https://github.com/davidfig/intersects/blob/master/lineToLine.js
export const lineCollidesWithLine = (
  [firstLineStartPoint, firstLineEndPoint],
  [secondLineStartPoint, secondLineEndPoint],
) => {
  let unknownA =
    (secondLineEndPoint.x - secondLineStartPoint.x) *
      (firstLineStartPoint.y - secondLineStartPoint.y) -
    (secondLineEndPoint.y - secondLineStartPoint.y) *
      (firstLineStartPoint.x - secondLineStartPoint.x)
  let unknownB =
    (firstLineEndPoint.x - firstLineStartPoint.x) *
      (firstLineStartPoint.y - secondLineStartPoint.y) -
    (firstLineEndPoint.y - firstLineStartPoint.y) *
      (firstLineStartPoint.x - secondLineStartPoint.x)
  const denominator =
    (secondLineEndPoint.y - secondLineStartPoint.y) *
      (firstLineEndPoint.x - firstLineStartPoint.x) -
    (secondLineEndPoint.x - secondLineStartPoint.x) *
      (firstLineEndPoint.y - firstLineStartPoint.y)

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
  const isIntersecting =
    unknownA >= 0 && unknownA <= 1 && unknownB >= 0 && unknownB <= 1

  return isIntersecting
}

export const rotatedRectangleCollidesWithRotatedRectangle = (
  firstRotatedRectangle,
  secondRotatedRectangle,
) =>
  someRectangleSideLine(
    firstRotatedRectangle,
    (firstRotatedRectangleSideLine) =>
      lineCollidesWithRectangle(
        firstRotatedRectangleSideLine,
        secondRotatedRectangle,
      ),
  )

// https://riptutorial.com/html5-canvas/example/17710/are-line-segment-and-rectangle-colliding-
export const lineCollidesWithRectangle = (line, rectangle) => {
  const lineIntersects = someRectangleSideLine(rectangle, (rectangleSideLine) =>
    lineCollidesWithLine(line, rectangleSideLine),
  )
  if (lineIntersects) return true
  // TODO: here we should check if line is contained inside the rectangle because in that case
  // it's not intersecting but it's colliding
  return false
}

const someRectangleSideLine = (
  [firstPoint, secondPoint, thirdPoint, fourthPoint],
  predicate,
) => {
  const rectangleFirstLine = [firstPoint, secondPoint]
  if (predicate(rectangleFirstLine)) return true
  const rectangleSecondLine = [secondPoint, thirdPoint]
  if (predicate(rectangleSecondLine)) return true
  const rectangleThirdLine = [thirdPoint, fourthPoint]
  if (predicate(rectangleThirdLine)) return true
  const rectangleFourthLine = [fourthPoint, firstPoint]
  if (predicate(rectangleFourthLine)) return true
  return false
}

/**
A matrix is an array composed by
[
  scale x,
  skew y,
  skew x,
  scale y,
  translate x,
  translate y,
]
*/

// https://stackoverflow.com/questions/14687318/how-to-find-new-coordinates-of-rectangle-after-rotation
export const getDomNodePoints = (domNode) => {
  const transformMatrix = getStyleValue(domNode, "transform")
  const transformOrigin = getStyleValue(domNode, "transform-origin")

  domNode.style.transform = "matrix(1, 0, 0, 1, 0, 0)"
  domNode.style.transformOrigin = "0 0"
  const boundlingClientRectangle = domNode.getBoundingClientRect()
  domNode.style.transform = transformMatrix
  domNode.style.transformOrigin = transformOrigin

  const documentScroll = getDocumentScroll(domNode)
  const left = boundlingClientRectangle.left + documentScroll.x
  const top = boundlingClientRectangle.top + documentScroll.y
  const right = left + boundlingClientRectangle.width
  const bottom = top + boundlingClientRectangle.height

  const topLeftPoint = { x: left, y: top }
  const topRightPoint = { x: right, y: top }
  const bottomLeftPoint = { x: right, y: bottom }
  const bottomRightPoint = { x: left, y: bottom }
  const points = [
    topLeftPoint,
    topRightPoint,
    bottomLeftPoint,
    bottomRightPoint,
  ]

  if (transformMatrix) {
    const matrix = transformMatrix
      .slice("matrix(".length, -1)
      .split(", ")
      .map(parseFloat)

    let rotateOrigin
    // this code assume transform is only about rotation, no scaling, no translation
    // it does not work if there is a transform origin for some reason
    if (transformOrigin) {
      const origin = transformOrigin.split(" ").map(parseFloat)
      rotateOrigin = {
        x: left + origin[0],
        y: top + origin[1],
      }
    } else {
      // center of the element by default
      rotateOrigin = {
        x: left + (right - left) / 2,
        y: top + (bottom - top) / 2,
      }
    }

    const rotationInDegrees = matrixToRotationInDegrees(matrix)
    return rotateRectangle(points, rotationInDegrees, rotateOrigin)
  }

  return points
}

const matrixToRotationInDegrees = ([a, b]) => radiansToDegree(Math.atan2(b, a))

// https://github.com/leeoniya/transformation-matrix-js/blob/3595d2b36aa1b0f593bdffdb786b9e832c50c3b0/src/matrix.js#L234
export const invertMatrix = ([a, b, c, d, e, f]) => {
  const dt = a * d - b * c
  return [
    d / dt,
    -b / dt,
    -c / dt,
    a / dt,
    (c * f - d * e) / dt,
    -(a * f - b * e) / dt,
  ]
}

export const transformPoint = ({ x, y }, [a, b, c, d, e, f]) => {
  return {
    x: x * a + y * c + e,
    y: x * b + y * d + f,
  }
}

export const transformPoints = (points, matrix) => {
  return points.map((point) => transformPoint(point, matrix))
}

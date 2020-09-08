export const rectangleCollides = (firstRect, secondRect) => {
  // first left of second
  if (firstRect.right <= secondRect.left) return false
  // first right of second
  if (firstRect.left >= secondRect.right) return false
  // first above second
  if (firstRect.bottom <= secondRect.top) return false
  //  first below second
  if (firstRect.top >= secondRect.bottom) return false
  return true
}

export const keepRectangleContained = (rect, parentRect) => {
  let left = rect.left
  let right = rect.right
  const width = right - left
  if (left < parentRect.left) {
    left = parentRect.left
    right = left + width
  } else if (right > parentRect.right) {
    left = parentRect.right - width
    right = left + width
  }

  let top = rect.top
  let bottom = rect.bottom
  const height = bottom - top
  if (top < parentRect.top) {
    top = parentRect.top
    bottom = top + height
  } else if (bottom > parentRect.bottom) {
    top = parentRect.bottom - height
    bottom = top + height
  }

  return {
    left,
    right,
    top,
    bottom,
  }
}

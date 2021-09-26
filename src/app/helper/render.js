export const stringifyClassNames = (classNames) => {
  return classNames.join(" ")
}

export const stringifyTransformations = ({ rotate, scale, translate }) => {
  return [
    ...(rotate ? [`rotate(${rotate}deg)`] : []),
    ...(scale && scale !== 1 ? [`scale(${scale})`] : []),
    ...(translate ? [`translate(${translate})`] : []),
  ].join("")
}

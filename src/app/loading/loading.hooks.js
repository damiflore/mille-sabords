import React from "react"

import { requestAsapCallback } from "root/src/app/helper/asap.js"

export const useWaitABit = () => {
  const [waited, waitedSetter] = React.useState(false)
  React.useEffect(() => {
    return requestAsapCallback(() => {
      waitedSetter(true)
    })
  }, [])
  return waited
}
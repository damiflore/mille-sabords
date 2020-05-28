import React from "react"
import { createSignal } from "./createSignal.js"

const { createContext, useContext } = React

export const createDOMNodeStore = () => {
  const nodePointerMap = {}
  const GetNodeContext = createContext(null)
  const GetNodeRefCallbackContext = createContext(null)

  const getOrCreateValuePointer = (id) => {
    if (nodePointerMap.hasOwnProperty(id)) return nodePointerMap[id]
    const nodePointer = createNodePointer()
    nodePointerMap[id] = nodePointer
    return nodePointer
  }

  const getNode = (id) => getOrCreateValuePointer(id).get()

  const getNodeRefCallback = (id) => getOrCreateValuePointer(id).refCallback

  const ContextProvider = ({ children }) => {
    return (
      <GetNodeContext.Provider value={getNode}>
        <GetNodeRefCallbackContext.Provider value={getNodeRefCallback}>
          {children}
        </GetNodeRefCallbackContext.Provider>
      </GetNodeContext.Provider>
    )
  }

  const useDOMNode = (id) => useContext(GetNodeContext)(id)

  const useDOMNodeCallback = (id) => useContext(GetNodeRefCallbackContext)(id)

  return {
    ContextProvider,
    useDOMNode,
    useDOMNodeCallback,
  }
}

const createNodePointer = () => {
  let node = null
  const signal = createSignal()

  const get = () => {
    const [value, setValue] = React.useState(node)
    React.useEffect(signal.listen(setValue))
    return value
  }

  const refCallback = (element) => {
    node = element
    signal.emit(element)
  }

  return {
    get,
    refCallback,
  }
}

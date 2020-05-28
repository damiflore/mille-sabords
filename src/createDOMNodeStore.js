import React from "react"

const { createContext, useContext } = React

export const createDOMNodeStore = () => {
  const nodePointerMap = {}
  const NodeContext = createContext(null)
  const NodeRefCallbackContext = createContext(null)

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
      <NodeContext.Provider value={getNode}>
        <NodeRefCallbackContext.Provider value={getNodeRefCallback}>
          {children}
        </NodeRefCallbackContext.Provider>
      </NodeContext.Provider>
    )
  }

  const useDOMNode = (id) => useContext(NodeContext)(id)

  const useDOMNodeCallback = (id) => useContext(NodeRefCallbackContext)(id)

  return {
    ContextProvider,
    useDOMNode,
    useDOMNodeCallback,
  }
}

const createNodePointer = () => {
  let node = null
  let listeners = []

  const listen = (callback) => {
    let removed = false
    listeners = [...listeners, callback]
    return () => {
      if (removed) return
      removed = true
      const listenersWithoutCallback = []
      let i = listeners.length
      let searching = true
      while (i--) {
        const listenerCandidate = listeners[i]
        if (searching) {
          if (listenerCandidate === callback) {
            searching = false
          } else {
            listenersWithoutCallback.push(listenerCandidate)
          }
        } else {
          listenersWithoutCallback.push(listenerCandidate)
        }
      }
      listeners = listenersWithoutCallback
    }
  }

  const get = () => {
    const [value, setValue] = React.useState(node)
    React.useEffect(listen(setValue))
    return value
  }

  const refCallback = (element) => {
    node = element
    listeners.forEach((listener) => {
      listener(element)
    })
  }

  return {
    get,
    refCallback,
  }
}

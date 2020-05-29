import { createStructuredStateStore } from "./createStructuredStateStore.js"

export const createDOMNodeStore = (nodeMap) => {
  const store = createStructuredStateStore(nodeMap)

  const Provider = store.Provider

  const useDOMNode = (id) => store.useKeyedState(id)

  const useDOMNodeCallback = (id) => {
    const dispatch = store.useDispatch()
    return (element) => {
      dispatch((state) => {
        return {
          ...state,
          [id]: element,
        }
      })
    }
  }

  return {
    Provider,
    useDOMNode,
    useDOMNodeCallback,
  }
}

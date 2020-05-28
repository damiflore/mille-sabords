import { createSimplifiedStore } from "./createSimplifiedStore.js"

/**

dans le init on pourrait faire des document.querySelector ??

*/

export const createDOMNodeStore = () => {
  const elementStore = createSimplifiedStore({})

  return {
    ContextProvider: elementStore.ContextProvider,
    useDOMNode: (id) => {
      const state = elementStore.useState()
      return state[id]
    },
    useDOMNodeCallback: (id) => {
      const dispatch = elementStore.useDispatch()
      return (element) => {
        if (!id) id = element.id
        dispatch((state) => {
          return { ...state, [id]: element }
        })
      }
    },
  }
}

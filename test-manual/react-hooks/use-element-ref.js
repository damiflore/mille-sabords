import React from "react"
import ReactDOM from "react-dom"
import { createSimplifiedStore } from "src/createSimplifiedStore.js"

const createDOMNodeStore = () => {
  const elementStore = createSimplifiedStore({})

  return {
    ContextProvider: elementStore.ContextProvider,
    useDOMNode: (id) => {
      const state = elementStore.useState()
      console.log("the state", state)
      return state[id]
    },
    useDOMNodeCallback: (id) => {
      const dispatch = elementStore.useDispatch()
      return (element) => {
        if (!id) id = element.id
        console.log("dispatch", id, element)
        dispatch((state) => {
          return { ...state, [id]: element }
        })
      }
    },
  }
}
const store = createDOMNodeStore()

const useDOMNode = store.useDOMNode
const useDOMNodeCallback = store.useDOMNodeCallback

const App = () => {
  return (
    <store.ContextProvider>
      <Other />
      <Button />
    </store.ContextProvider>
  )
}

// donc en gros ce qu'on veut
const Other = () => {
  const ButtonElement = useDOMNode("button")
  console.log("render Other", ButtonElement)
  return ButtonElement ? ButtonElement.nodeName : "null"
}

const Button = () => {
  const ref = useDOMNodeCallback("button")
  return <button ref={ref}>Button</button>
}

ReactDOM.render(<App />, document.body)

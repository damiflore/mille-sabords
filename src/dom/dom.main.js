import React from "react"

import { DICES } from "src/dices/dices.js"

const { createContext, useContext, useState } = React

const MainDomNodeContext = createContext()
export const useMainDomNode = () => useContext(MainDomNodeContext)[0]
export const useMainDomNodeSetter = () => useContext(MainDomNodeContext)[1]

const diceDomNodeContexts = {}
Object.keys(DICES).forEach((diceId) => {
  diceDomNodeContexts[diceId] = createContext()
})
const diceDomNodeProviders = Object.keys(diceDomNodeContexts).map(
  (key) => diceDomNodeContexts[key].Provider,
)
const DiceDomNodesProvider = ({ children }) => {
  return diceDomNodeProviders.reduceRight((prev, Next) => {
    return <Next value={useState()}>{prev}</Next>
  }, children)
}
export const useDiceDomNode = (id) => useContext(diceDomNodeContexts[id])[0]
export const useDiceDomNodeSetter = (id) => useContext(diceDomNodeContexts[id])[1]

export const DomNodesProvider = ({ children }) => {
  return (
    <MainDomNodeContext.Provider value={useState()}>
      <DiceDomNodesProvider>{children}</DiceDomNodesProvider>
    </MainDomNodeContext.Provider>
  )
}

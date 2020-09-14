import React from "react"

import { DICES } from "src/dices/dices.js"

const { createContext, useContext, useState } = React

const GameDomNodeContext = createContext()
export const useGameDomNode = () => useContext(GameDomNodeContext)[0]
export const useGameDomNodeSetter = () => useContext(GameDomNodeContext)[1]

const diceDomNodeContexts = {}
DICES.forEach((dice) => {
  diceDomNodeContexts[dice.id] = createContext()
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

const RolledAreaDomNodeContext = createContext()
export const useRolledAreaDomNode = () => useContext(RolledAreaDomNodeContext)[0]
export const useRolledAreaDomNodeSetter = () => useContext(RolledAreaDomNodeContext)[1]

export const DomNodesProvider = ({ children }) => {
  return (
    <GameDomNodeContext.Provider value={useState()}>
      <RolledAreaDomNodeContext.Provider value={useState()}>
        <DiceDomNodesProvider>{children}</DiceDomNodesProvider>
      </RolledAreaDomNodeContext.Provider>
    </GameDomNodeContext.Provider>
  )
}

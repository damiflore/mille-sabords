/* eslint-disable import/max-dependencies */
import React from "react"

import { RoundEffects } from "src/round/round.effects.js"
import { CardsEffects } from "src/cards/cards.effects.js"
import { DiceOnGoing } from "src/dice-ongoing/DiceOnGoing.jsx"
import { Chest } from "src/chest/Chest.jsx"
import { Header } from "src/header/Header.jsx"
import { Footer } from "src/footer/Footer.jsx"
import { SkullIsland } from "src/skull-island/SkullIsland.jsx"
import { DiceContainer } from "src/dices/DiceContainer.jsx"
import { useSignalEmitter } from "src/hooks.js"
import { DrawCardDialog } from "src/footer/DrawCardDialog.jsx"
import { useCurrentCardActivated } from "src/main.store.js"

export const Round = ({ openScoreboard, onRoundStart, onRoundOver }) => {
  const currentCardActivated = useCurrentCardActivated()

  const [roundMounted, roundMountedSetter] = React.useState(false)

  const diceOverRolledAreaSignal = useSignalEmitter()
  const diceOverChestSignal = useSignalEmitter()

  return (
    <div className="round-container">
      <CardsEffects />
      <Header openScoreboard={openScoreboard} />
      {currentCardActivated ? (
        <RoundGameBoard
          diceOverRolledAreaSignal={diceOverRolledAreaSignal}
          diceOverChestSignal={diceOverChestSignal}
          openScoreboard={openScoreboard}
          onRoundOver={onRoundOver}
          onRoundMounted={(refs) => {
            onRoundStart()
            roundMountedSetter(refs)
          }}
        />
      ) : null}
      {roundMounted ? (
        <DiceContainer
          offscreenDomNode={roundMounted.offscreenDomNode}
          chestDomNode={roundMounted.chestDomNode}
          rolledAreaDomNode={roundMounted.rolledAreaDomNode}
          cursedAreaDomNode={roundMounted.cursedAreaDomNode}
          onDiceOverChestChange={diceOverChestSignal.emit}
          onDiceOverRolledAreaChange={diceOverRolledAreaSignal.emit}
        />
      ) : null}
      <DrawCardDialog dialogIsOpen={!currentCardActivated} />
    </div>
  )
}

const RoundGameBoard = ({
  diceOverRolledAreaSignal,
  diceOverChestSignal,
  onRoundMounted,
  onRoundOver,
}) => {
  const rolledAreaRef = React.useRef(null)
  const chestRef = React.useRef(null)
  const cursedAreaRef = React.useRef(null)
  const offscreenRef = React.useRef(null)

  React.useEffect(() => {
    onRoundMounted({
      rolledAreaDomNode: rolledAreaRef.current,
      chestDomNode: chestRef.current,
      cursedAreaDomNode: cursedAreaRef.current,
      offscreenDomNode: offscreenRef.current,
    })
  }, [])

  return (
    <>
      <RoundEffects />
      <div className="chest-and-skulls">
        <Chest chestRef={chestRef} diceOverChestSignal={diceOverChestSignal} />
        <SkullIsland cursedAreaRef={cursedAreaRef} />
      </div>
      <DiceOnGoing
        rolledAreaRef={rolledAreaRef}
        offscreenRef={offscreenRef}
        diceOverRolledAreaSignal={diceOverRolledAreaSignal}
      />
      <Footer onRoundOver={onRoundOver} rolledAreaRef={rolledAreaRef} />
    </>
  )
}

/* eslint-disable import/max-dependencies */
import React from "react"

import { RoundEffects } from "root/src/app/round/round.effects.js"
import { CardsEffects } from "root/src/app/cards/cards.effects.js"
import { DiceOnGoing } from "root/src/app/dice-ongoing/DiceOnGoing.jsx"
import { Chest } from "root/src/app/chest/chest.component.jsx"
import { Header } from "root/src/app/header/Header.jsx"
import { Footer } from "root/src/app/footer/Footer.jsx"
import { SkullIsland } from "root/src/app/skull-island/SkullIsland.jsx"
import { DiceContainer } from "root/src/app/dices/DiceContainer.jsx"
import { useSignal } from "root/src/app/helper/signal.js"
import { DrawCardDialog } from "root/src/app/footer/DrawCardDialog.jsx"
import { useCurrentCardActivated } from "root/src/app/main.store.js"

export const Round = ({ openScoreboard, onRoundStart, onRoundOver }) => {
  const currentCardActivated = useCurrentCardActivated()

  const [roundMounted, roundMountedSetter] = React.useState(false)

  React.useEffect(() => {
    onRoundStart()
  }, [])

  const [diceOverRolledAreaListener, diceOverRolledAreaEmitter] = useSignal()
  const [diceOverChestListener, diceOverChestEmitter] = useSignal()

  const headerSmallCardRef = React.useRef()

  return (
    <div className="round-container">
      <CardsEffects />
      <Header
        openScoreboard={openScoreboard}
        headerSmallCardRef={headerSmallCardRef}
      />
      {currentCardActivated ? (
        <RoundGameBoard
          diceOverRolledAreaListener={diceOverRolledAreaListener}
          diceOverChestListener={diceOverChestListener}
          openScoreboard={openScoreboard}
          onRoundOver={onRoundOver}
          onRoundMounted={(refs) => {
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
          onDiceOverChestChange={diceOverChestEmitter}
          onDiceOverRolledAreaChange={diceOverRolledAreaEmitter}
        />
      ) : null}
      <DrawCardDialog
        dialogIsOpen={!currentCardActivated}
        headerSmallCardRef={headerSmallCardRef}
      />
    </div>
  )
}

const RoundGameBoard = ({
  diceOverRolledAreaListener,
  diceOverChestListener,
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
        <Chest
          chestRef={chestRef}
          diceOverChestListener={diceOverChestListener}
        />
        <SkullIsland cursedAreaRef={cursedAreaRef} />
      </div>
      <DiceOnGoing
        rolledAreaRef={rolledAreaRef}
        offscreenRef={offscreenRef}
        diceOverRolledAreaListener={diceOverRolledAreaListener}
      />
      <Footer onRoundOver={onRoundOver} rolledAreaRef={rolledAreaRef} />
    </>
  )
}

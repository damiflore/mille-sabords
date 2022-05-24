import React from "react"

import { RoundEffects } from "/src/app/round/round.effects.js"
import { CardsEffects } from "/src/app/cards/cards.effects.js"
import { DiceOnGoing } from "/src/app/dice-ongoing/DiceOnGoing.jsx"
import { Chest } from "/src/app/chest/chest.component.jsx"
import { Header } from "/src/app/header/Header.jsx"
import { Footer } from "/src/app/footer/Footer.jsx"
import { SkullIsland } from "/src/app/skull-island/SkullIsland.jsx"
import { DiceContainer } from "/src/app/dices/DiceContainer.jsx"
import { useSignal } from "/src/app/helper/signal.js"
import { DrawCardDialog } from "/src/app/footer/DrawCardDialog.jsx"
import { useCurrentCardActivated } from "/src/app/main.store.js"

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

import React from "react"

import { GameEffects } from "src/round/round.effects.js"
import { DiceOnGoing } from "src/dice-ongoing/DiceOnGoing.jsx"
import { Chest } from "src/chest/Chest.jsx"
import { Header } from "src/header/Header.jsx"
import { Footer } from "src/footer/Footer.jsx"
import { SkullIsland } from "src/skull-island/SkullIsland.jsx"
import { DiceContainer } from "src/dices/DiceContainer.jsx"

export const Round = ({ openScoreboard, onRoundStart, onRoundOver }) => {
  const [roundMounted, roundMountedSetter] = React.useState(false)
  const [diceOverChest, diceOverChestSetter] = React.useState(null)
  const [diceOverRolledArea, diceOverRolledAreaSetter] = React.useState(null)

  return (
    <div className="round-container">
      <RoundGameBoard
        diceOverChest={diceOverChest}
        diceOverRolledArea={diceOverRolledArea}
        openScoreboard={openScoreboard}
        onRoundOver={onRoundOver}
        onRoundMounted={(refs) => {
          onRoundStart()
          roundMountedSetter(refs)
        }}
      />
      {roundMounted ? (
        <DiceContainer
          offscreenDomNode={roundMounted.offscreenDomNode}
          chestDomNode={roundMounted.chestDomNode}
          rolledAreaDomNode={roundMounted.rolledAreaDomNode}
          cursedAreaDomNode={roundMounted.cursedAreaDomNode}
          onDiceOverChestChange={diceOverChestSetter}
          onDiceOverRolledAreaChange={diceOverRolledAreaSetter}
        />
      ) : null}
    </div>
  )
}

const RoundGameBoard = ({
  diceOverChest,
  diceOverRolledArea,
  openScoreboard,
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
      <GameEffects />
      <Header openScoreboard={openScoreboard} />
      <div className="chest-and-skulls">
        <Chest chestRef={chestRef} diceOverChest={diceOverChest} />
        <SkullIsland cursedAreaRef={cursedAreaRef} />
      </div>
      <DiceOnGoing
        rolledAreaRef={rolledAreaRef}
        offscreenRef={offscreenRef}
        diceOverRolledArea={diceOverRolledArea}
      />
      <Footer onRoundOver={onRoundOver} rolledAreaRef={rolledAreaRef} />
    </>
  )
}

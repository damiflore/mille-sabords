import React from "react"

import { getDomNodePageRect } from "src/dom/dom.js"
import { rectangleCollides } from "src/helper/rectangle.js"

import { useCurrentCard, useDicesKept, useDicesRolled, useDragDiceGesture } from "src/game.store.js"
import { useUnkeepDiceAllowed, useThreeSkullsOrMoreInCursedArea } from "src/game.selectors.js"
import { useUnkeepDice, useKeepDice } from "src/dices/dices.actions.js"

import { isCoinCard, isDiamondCard, cardColors } from "src/cards/cards.js"
import { Dice } from "src/dices/Dice.jsx"
import { RoundScore } from "src/score/RoundScore.jsx"
import { diceSize } from "src/dices/dicePosition.js"

const { useState, useEffect } = React

export const DiceKept = () => {
  const dicesKept = useDicesKept()
  const currentCard = useCurrentCard()
  const unkeepDiceAllowed = useUnkeepDiceAllowed()
  const unkeepDice = useUnkeepDice()

  const dragDiceGesture = useDragDiceGesture()
  const dicesRolled = useDicesRolled()
  const [diceKeptDomNode, diceKeptDomNodeSetter] = useState(null)
  const [hoveredByRolledDice, hoveredByRolledDiceSetter] = useState(false)
  useEffect(() => {
    if (diceKeptDomNode) {
      const hoveredByRolledDice = hoveredByRolledDiceGetter({
        dragDiceGesture,
        dicesRolled,
        diceKeptDomNode,
      })
      hoveredByRolledDiceSetter(hoveredByRolledDice)
    }
  }, [dragDiceGesture, dicesRolled, diceKeptDomNode])

  const keepDice = useKeepDice()
  useEffect(() => {
    if (dragDiceGesture) {
      dragDiceGesture.addDropHandler(diceKeptDomNode, () => {
        if (hoveredByRolledDice) {
          keepDice(dragDiceGesture.dice)
        }
      })
    }
  }, [dragDiceGesture, diceKeptDomNode])

  return (
    <div
      className="dice-kept"
      ref={diceKeptDomNodeSetter}
      style={{
        ...(hoveredByRolledDice ? { outline: "2px dotted" } : {}),
      }}
    >
      <div className="dice-area">
        <div className="box">
          {isCoinCard(currentCard) ? <ExtraCoin card={currentCard} /> : null}
          {isDiamondCard(currentCard) ? <ExtraDiamond card={currentCard} /> : null}
          {dicesKept.map((dice) => (
            <Dice
              key={dice.id}
              dice={dice}
              draggable={true}
              clickAllowed={unkeepDiceAllowed}
              onClickAction={(dice) => {
                unkeepDice(dice)
              }}
              specificStyle={{ margin: "5px" }}
            />
          ))}
        </div>
        <div className="top-left-corner"></div>
        <div className="top-right-corner"></div>
        <div className="bottom-left-corner"></div>
        <div className="bottom-right-corner"></div>
        <CursedCover />
      </div>
      <RoundScore />
    </div>
  )
}

const hoveredByRolledDiceGetter = ({ dragDiceGesture, dicesRolled, diceKeptDomNode }) => {
  if (!dragDiceGesture) {
    return false
  }

  const draggedDice = dragDiceGesture.dice
  const diceIsRolled = dicesRolled.includes(draggedDice)
  if (!diceIsRolled) {
    return false
  }
  const diceKeptDomNodeRect = getDomNodePageRect(diceKeptDomNode)
  if (!rectangleCollides(dragDiceGesture.diceRect, diceKeptDomNodeRect)) {
    return false
  }
  return true
}

const ExtraCoin = ({ card }) => {
  return (
    <button
      className="dice"
      style={{
        width: diceSize,
        height: diceSize,
        color: "#fcfcfc",
        margin: "5px",
        backgroundColor: cardColors[card].color1,
        borderColor: cardColors[card].color2,
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <img
        src={`src/dices/dice_coin.png`}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </button>
  )
}

const ExtraDiamond = ({ card }) => {
  return (
    <button
      className="dice"
      style={{
        width: diceSize,
        height: diceSize,
        color: "#fcfcfc",
        margin: "5px",
        backgroundColor: cardColors[card].color1,
        borderColor: cardColors[card].color2,
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <img
        src={`src/dices/dice_diamond.png`}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </button>
  )
}

const CursedCover = () => {
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()

  if (!threeSkullsOrMoreInCursedArea) {
    return null
  }

  return (
    <div className="cursed-cover">
      <img src={`src/dice-kept/cursed-cover.png`} alt="cursed-cover" />
    </div>
  )
}

import React from "react"

import { Image } from "src/generic/Image.jsx"
import { cardsRules } from "src/cards/cards-rules.js"
import { DialogWood } from "src/dialog/dialog.wood.jsx"
import { cardToImageUrl } from "src/cards/cards.js"

export const CardRulesDialog = ({ dialogIsOpen, closeDialog, card }) => {
  const cardRules = cardsRules[card.type]

  return (
    <DialogWood
      className="card-rules-dialog"
      isOpen={dialogIsOpen}
      onRequestClose={closeDialog}
      requestCloseOnClickOutside={true}
      title="Carte"
    >
      {cardRules ? (
        <>
          <div className="dialog-label">{cardRules.name}</div>
          <div style={{ textAlign: "center" }}>
            <Image
              className="current-card"
              src={cardToImageUrl(card)}
              width="150"
              alt={card.type}
            />
          </div>
          <div className="text-rule">{cardRules.rule}</div>
          {cardRules.more ? <div className="text-rule">{cardRules.more}</div> : null}
        </>
      ) : (
        "No rule"
      )}
    </DialogWood>
  )
}

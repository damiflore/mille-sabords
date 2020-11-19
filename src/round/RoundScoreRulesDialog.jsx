/* eslint-disable import/max-dependencies */
import React from "react"

import { Image } from "src/generic/Image.jsx"

import { DialogWood } from "src/dialog/dialog.wood.jsx"
import { symbolCoinUrl, symbolDiamondUrl } from "src/symbols/symbols.js"

export const RoundScoreRulesDialog = ({ dialogIsOpen, closeDialog }) => {
  return (
    <DialogWood
      className="score-rules-dialog"
      isOpen={dialogIsOpen}
      onRequestClose={closeDialog}
      requestCloseOnClickOutside={true}
      title="Score"
    >
      <>
        <div className="dialog-box">
          <div className="dialog-label">Combinaisons de dés</div>
          <div className="columns">
            <div className="column">
              <div className="column-title">Symbols identiques</div>
              <span className="symbol-number">3</span>
              <span className="symbol-number">4</span>
              <span className="symbol-number">5</span>
              <span className="symbol-number">6</span>
              <span className="symbol-number">7</span>
              <span className="symbol-number">8</span>
            </div>
            <div className="column">
              <div className="column-title">Points</div>
              <span className="points">100</span>
              <span className="points">200</span>
              <span className="points">500</span>
              <span className="points">1000</span>
              <span className="points">2000</span>
              <span className="points">4000</span>
            </div>
          </div>
        </div>
        <div className="dialog-box">
          <div className="dialog-label">Dés spéciaux</div>
          <div className="columns">
            <div className="column">
              <div className="column-title">Symbol</div>
              <Image src={symbolCoinUrl} />
              <Image src={symbolDiamondUrl} />
            </div>
            <div className="column">
              <div className="column-title">Points</div>
              <span className="points">100</span>
              <span className="points">100</span>
            </div>
          </div>
        </div>
        <div className="dialog-box last">
          <div className="dialog-label">Bonus coffre plein</div>
          <div className="columns">
            <div className="column">
              <div className="column-title">Dés utilisés</div>
              <span className="symbol-number">8</span>
            </div>
            <div className="column">
              <div className="column-title">Points</div>
              <span className="points">500</span>
            </div>
          </div>
        </div>
      </>
    </DialogWood>
  )
}

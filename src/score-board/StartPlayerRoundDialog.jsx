import React from "react"
import { Image } from "src/generic/Image.jsx"
import { useStartPlayerRound } from "src/round/round.actions.js"
import { Dialog } from "src/dialog/Dialog.jsx"

export const StartPlayerRoundDialog = ({ closeDialog, dialogIsOpen, player }) => {
  const startPlayerRound = useStartPlayerRound()
  return (
    <Dialog
      className="score-board-dialog dialog-spacing-10 dialog-spacing-fluid"
      isOpen={dialogIsOpen}
      onRequestClose={closeDialog}
      requestCloseOnClickOutside={true}
    >
      <div className="dialog-content">
        <div className="cross" onClick={closeDialog}>
          X
        </div>
        <div className="dialog-body">
          <div>
            Au tour de
            <div className="dialog-label">{player.character.name}</div>
            <Image
              className="player-img"
              src={player && player.character.img}
              alt="player"
              style={{
                boxShadow: `inset 0px 0px 0px 4px ${(player && player.character.color) || "black"}`,
              }}
            />
          </div>
          <div className="dialog-actions">
            <button
              onClick={() => {
                closeDialog()
                startPlayerRound(player)
              }}
            >
              Jouer
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

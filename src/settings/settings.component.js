/* eslint-disable import/max-dependencies */
/* eslint-disable no-nested-ternary */
import React from "react"
import { Stylesheet } from "src/generic/Stylesheet.jsx"
import { Dialog, useDialogState } from "src/dialog/dialog.component.jsx"
import { useAnimationsDisabled, useSoundDisabled } from "src/main.store.js"
import {
  useDisableAnimations,
  useEnableAnimations,
  useDisableSound,
  useEnableSound,
  useCancelGame,
} from "src/main.actions.js"
import { CloseIcon } from "src/dialog/CloseIcon.jsx"
import { symbolMonkeyUrl } from "src/symbols/symbols.js"
import { Image } from "src/generic/Image.jsx"
import { useAddToHomescreen } from "./add-to-home-screen.hooks.js"
import { UpdateApplication } from "./UpdateApplication.jsx"

import settingsCssUrl from "./settings.css"

export const Settings = () => {
  const [settingsDialogIsOpen, openSettingsDialog, closeSettingsDialog] = useDialogState()

  return (
    <>
      <Stylesheet href={settingsCssUrl} />
      <div
        id="settings"
        onClick={() => {
          openSettingsDialog()
        }}
      >
        <svg className="settings-icon" width="24px" height="24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
          />
        </svg>
      </div>
      <SettingsDialog
        settingsDialogIsOpen={settingsDialogIsOpen}
        closeSettingsDialog={closeSettingsDialog}
      />
    </>
  )
}

const SettingsDialog = ({ settingsDialogIsOpen, closeSettingsDialog }) => {
  const animationsDisabled = useAnimationsDisabled()
  const disableAnimations = useDisableAnimations()
  const enableAnimations = useEnableAnimations()

  // TODO later: give this an effect on sounds
  const soundDisabled = useSoundDisabled()
  const disableSound = useDisableSound()
  const enableSound = useEnableSound()

  const cancelGame = useCancelGame()

  const [confirmCancelGameDialogIsOpen, confirmCancelGameDialogIsOpenSetter] = React.useState(false)
  const openConfirmCancelGameDialog = () => {
    confirmCancelGameDialogIsOpenSetter(true)
  }
  const closeConfirmCancelGameDialog = () => {
    confirmCancelGameDialogIsOpenSetter(false)
  }

  const requestCancelGame = () => {
    openConfirmCancelGameDialog()
  }
  const performCancelGame = () => {
    cancelGame()
    closeSettingsDialog()
  }

  return (
    <Dialog
      className="settings-dialog dialog-spacing-10 dialog-spacing-fluid dialog-spacing-left-fixed dialog-spacing-right-fixed"
      isOpen={settingsDialogIsOpen}
      onRequestClose={closeSettingsDialog}
      requestCloseOnClickOutside={true}
    >
      <div className="settings-dialog-content">
        <div className="dialog-close" onClick={closeSettingsDialog}>
          <CloseIcon />
        </div>
        <div className="dialog-simple-title">Settings</div>
        <div className="setting-element">
          <label>
            <input
              type="checkbox"
              className={animationsDisabled ? "checked" : "unchecked"}
              checked={animationsDisabled}
              onChange={(e) => {
                if (e.target.checked) {
                  disableAnimations()
                } else {
                  enableAnimations()
                }
              }}
            />
            {animationsDisabled && <CheckIcon />}
            Désactiver les animations
          </label>
        </div>
        <div className="setting-element">
          <label>
            <input
              type="checkbox"
              className={soundDisabled ? "checked" : "unchecked"}
              checked={soundDisabled}
              onChange={(e) => {
                if (e.target.checked) {
                  disableSound()
                } else {
                  enableSound()
                }
              }}
            />
            {soundDisabled && <CheckIcon />}
            Couper le son
          </label>
        </div>
        <div className="setting-element">
          <button
            onClick={() => {
              requestCancelGame()
            }}
          >
            Annuler la partie
          </button>
        </div>
        <AddToHomescreen />
        <UpdateApplication settingsDialogIsOpen={settingsDialogIsOpen} />
        <ConfirmCancelGameDialog
          confirmCancelGameDialogIsOpen={confirmCancelGameDialogIsOpen}
          closeConfirmCancelGameDialog={closeConfirmCancelGameDialog}
          performCancelGame={performCancelGame}
        />
      </div>
    </Dialog>
  )
}

const AddToHomescreen = () => {
  const [available, prompt] = useAddToHomescreen()

  if (!available) {
    return null
  }

  return (
    <button
      onClick={() => {
        prompt()
      }}
    >
      Installer application
    </button>
  )
}

const CheckIcon = () => (
  <svg className="check-icon" width="20" height="20" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"
    ></path>
  </svg>
)

const ConfirmCancelGameDialog = ({
  confirmCancelGameDialogIsOpen,
  closeConfirmCancelGameDialog,
  performCancelGame,
}) => {
  return (
    <Dialog
      className="confirm-cancel-game-dialog dialog-spacing-10 dialog-spacing-fluid dialog-spacing-left-fixed dialog-spacing-right-fixed"
      isOpen={confirmCancelGameDialogIsOpen}
      onRequestClose={closeConfirmCancelGameDialog}
      requestCloseOnClickOutside={true}
    >
      <div className="settings-dialog-content">
        <div className="dialog-close" onClick={closeConfirmCancelGameDialog}>
          <CloseIcon />
        </div>
        <div className="title-container">
          <Image className="illustration" src={symbolMonkeyUrl} width="40" height="40" />
          <div className="title">Êtes-vous certain de vouloir annuler la partie ?</div>
        </div>
        <div className="content">
          Cette action irréversible effacera la progression actuelle et remettra la partie à zéro !
        </div>
        <div className="confirm-action">
          <button
            onClick={() => {
              performCancelGame()
              closeConfirmCancelGameDialog()
            }}
          >
            Confirmer
          </button>
        </div>
      </div>
    </Dialog>
  )
}

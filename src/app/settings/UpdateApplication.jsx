import React from "react"

import { swFacade } from "/service_worker_facade.js"

export const UpdateApplication = ({ settingsDialogIsOpen }) => {
  if (!swFacade) {
    return null
  }
  return <ServiceWorkerView settingsDialogIsOpen={settingsDialogIsOpen} />
}

const ServiceWorkerView = ({ checkOnOpen = true, settingsDialogIsOpen }) => {
  const [update, updateSetter] = React.useState(swFacade.state.update)
  React.useEffect(() => {
    return swFacade.subscribe(() => {
      updateSetter(swFacade.state.update)
    })
  }, [])

  React.useEffect(() => {
    if (checkOnOpen && settingsDialogIsOpen) {
      swFacade.checkForUpdates()
    }
  }, [checkOnOpen, settingsDialogIsOpen])

  return (
    <fieldset style={{ minHeight: "4em" }}>
      <legend>Mise a jour</legend>
      {update ? <UpdateAvailable update={update} /> : <UpdateNotAvailable />}
    </fieldset>
  )
}

const UpdateAvailable = ({ update }) => {
  const { readyState, reloadRequired } = update

  return (
    <>
      <p>
        {readyState === "installing" ? "Mise a jour..." : null}
        {readyState === "installed" ? "Mise a jour prête" : null}
        {readyState === "activating" ? "Activation de la mise a jour..." : null}
        {readyState === "activated"
          ? `Mise a jour activée, la page va se recharger`
          : null}
      </p>
      <button
        disabled={!readyState}
        onClick={() => {
          swFacade.activateUpdate()
        }}
      >
        {reloadRequired ? `Recharger pour mettre a jour` : `Mettre a jour`}
      </button>
    </>
  )
}

const UpdateNotAvailable = () => {
  const [updateAttemptStatus, updateAttemptStatusSetter] = React.useState("")

  const check = React.useCallback(async () => {
    updateAttemptStatusSetter("fetching")
    try {
      const found = await swFacade.checkForUpdates()
      if (found) {
        // no need to handle that case because
        // an update is now available
        // meaning <UpdateAvailable /> will take over.
      } else {
        updateAttemptStatusSetter("notfound")
      }
    } catch (e) {
      updateAttemptStatusSetter("failed")
      console.error(e)
    }
  }, [])

  return (
    <>
      <p>
        {updateAttemptStatus === "fetching"
          ? "Recherche de mise a jour..."
          : null}
        {updateAttemptStatus === "notfound"
          ? "Pas de mise a jour disponible."
          : null}
        {updateAttemptStatus === "failed" ? "Une erreur est survenue." : null}
      </p>
      <button disabled={updateAttemptStatus === "fetching"} onClick={check}>
        Chercher
      </button>
    </>
  )
}

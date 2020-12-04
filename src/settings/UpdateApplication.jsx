/* eslint-disable no-nested-ternary */
import React from "react"
import {
  useServiceWorkerIsAvailable,
  useServiceWorkerUpdateIsAvailable,
  useCheckServiceWorkerUpdate,
  useActivateServiceWorkerUpdating,
} from "./service-worker.hooks.js"

export const UpdateApplication = ({ settingsDialogIsOpen }) => {
  const serviceWorkerIsAvailable = useServiceWorkerIsAvailable()

  if (!serviceWorkerIsAvailable) {
    return null
  }

  return <ServiceWorkerView settingsDialogIsOpen={settingsDialogIsOpen} />
}

const ServiceWorkerView = ({ checkOnOpen = true, settingsDialogIsOpen }) => {
  const checkServiceWorkerUpdate = useCheckServiceWorkerUpdate()
  const serviceWorkerUpdateIsAvailable = useServiceWorkerUpdateIsAvailable()

  React.useEffect(() => {
    if (checkOnOpen && settingsDialogIsOpen) {
      checkServiceWorkerUpdate()
    }
  }, [checkOnOpen, settingsDialogIsOpen])

  return (
    <fieldset style={{ minHeight: "4em" }}>
      <legend>Mise a jour</legend>
      {serviceWorkerUpdateIsAvailable ? <UpdateAvailable /> : <UpdateNotAvailable />}
    </fieldset>
  )
}

const UpdateAvailable = () => {
  const activateServiceWorkerUpdating = useActivateServiceWorkerUpdating()
  const [updatingStatus, updatingStatusSetter] = React.useState("")
  const [reloadInfo, reloadInfoSetter] = React.useState({})

  const update = async () => {
    updatingStatusSetter("updating")
    await activateServiceWorkerUpdating({
      onActivating: () => updatingStatusSetter("activating"),
      onActivated: ({ serviceWorkerWillControlNavigator, navigatorWillReload }) => {
        updatingStatusSetter("activated")
        reloadInfoSetter({
          shouldReload: serviceWorkerWillControlNavigator,
          willReload: navigatorWillReload,
        })
      },
      onBecomesNavigatorController: () => {
        updatingStatusSetter("")
      },
    })
  }

  return (
    <>
      <p>
        {updatingStatus === ""
          ? "Mise a jour prête, an attente de rechargement pour l'installer."
          : null}
        {updatingStatus === "updating" || updatingStatus === "activating"
          ? "Activation de la mise a jour..."
          : null}
        {updatingStatus === "activated" && reloadInfo.willReload
          ? `Mise a jour activée, la page va se recharger`
          : null}
        {updatingStatus === "activated" && !reloadInfo.willReload && reloadInfo.shouldReload
          ? `Mise a jour activée, recharger la page pour installer`
          : null}
        {updatingStatus === "activated" && !reloadInfo.willReload && !reloadInfo.shouldReload
          ? `Mise a jour activée`
          : null}
      </p>
      <button disabled={Boolean(updatingStatus)} onClick={update}>
        Recharger
      </button>
    </>
  )
}

const UpdateNotAvailable = () => {
  const checkServiceWorkerUpdate = useCheckServiceWorkerUpdate()
  const [updateAttemptStatus, updateAttemptStatusSetter] = React.useState("")

  const check = async () => {
    updateAttemptStatusSetter("fetching")
    const found = await checkServiceWorkerUpdate()
    if (found) {
      // no need to handle that case because
      // an update is now available
      // meaning <UpdateAvailable /> will take over.
    } else {
      updateAttemptStatusSetter("notfound")
    }
  }

  return (
    <>
      <p>
        {updateAttemptStatus === "fetching" ? "Recherche de mise a jour..." : null}
        {updateAttemptStatus === "notfound" ? "Pas de mise a jour disponible." : null}
      </p>
      <button disabled={updateAttemptStatus === "fetching"} onClick={check}>
        Chercher
      </button>
    </>
  )
}

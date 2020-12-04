/* eslint-disable no-nested-ternary */
import React from "react"
import {
  useServiceWorkerIsAvailable,
  useServiceWorkerUpdate,
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
  const serviceWorkerUpdate = useServiceWorkerUpdate()

  React.useEffect(() => {
    if (checkOnOpen && settingsDialogIsOpen) {
      checkServiceWorkerUpdate()
    }
  }, [checkOnOpen, settingsDialogIsOpen])

  return (
    <fieldset style={{ minHeight: "4em" }}>
      <legend>Mise a jour</legend>
      {serviceWorkerUpdate ? (
        <UpdateAvailable serviceWorkerUpdate={serviceWorkerUpdate} />
      ) : (
        <UpdateNotAvailable />
      )}
    </fieldset>
  )
}

const UpdateAvailable = ({ serviceWorkerUpdate }) => {
  const { willBecomeNavigatorController, navigatorWillReload } = serviceWorkerUpdate
  const activateServiceWorkerUpdating = useActivateServiceWorkerUpdating()

  const [updatingStatus, updatingStatusSetter] = React.useState("")

  const update = async () => {
    updatingStatusSetter("updating")
    await activateServiceWorkerUpdating({
      onActivating: () => updatingStatusSetter("activating"),
      onActivated: () => updatingStatusSetter("activated"),
      onBecomesNavigatorController: () => updatingStatusSetter(""),
    })
  }

  return (
    <>
      <p>
        {updatingStatus === "" && willBecomeNavigatorController ? "Mise a jour prête" : null}
        {updatingStatus === "updating" || updatingStatus === "activating" ? "Mise a jour..." : null}
        {updatingStatus === "activated" && navigatorWillReload
          ? `Mise a jour activée, la page va se recharger`
          : null}
        {updatingStatus === "activated" && !navigatorWillReload && willBecomeNavigatorController
          ? `Mise a jour activée, recharger la page pour installer`
          : null}
        {updatingStatus === "activated" && !navigatorWillReload && !willBecomeNavigatorController
          ? `Mise a jour activée`
          : null}
      </p>
      <button disabled={Boolean(updatingStatus)} onClick={update}>
        {navigatorWillReload ? `Recharger pour mettre a jour` : `Mettre a jour`}
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

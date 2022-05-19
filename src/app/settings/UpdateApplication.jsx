import React from "react"

import { serviceWorkerScript } from "/src/service_worker_script.js"

export const UpdateApplication = ({ settingsDialogIsOpen }) => {
  if (!serviceWorkerScript) {
    return null
  }
  return <ServiceWorkerView settingsDialogIsOpen={settingsDialogIsOpen} />
}

const ServiceWorkerView = ({ checkOnOpen = true, settingsDialogIsOpen }) => {
  const [update, updateSetter] = React.useState(
    serviceWorkerScript.getUpdateInfo(),
  )
  React.useEffect(() => {
    return serviceWorkerScript.listenUpdateChange((updateInfo) => {
      updateSetter(updateInfo)
    })
  }, [])

  React.useEffect(() => {
    if (checkOnOpen && settingsDialogIsOpen) {
      serviceWorkerScript.checkUpdate()
    }
  }, [checkOnOpen, settingsDialogIsOpen])

  return (
    <fieldset style={{ minHeight: "4em" }}>
      <legend>Mise a jour</legend>
      {update ? <UpdateAvailable /> : <UpdateNotAvailable />}
    </fieldset>
  )
}

const UpdateAvailable = () => {
  const serviceWorkerUpdate = serviceWorkerScript.getUpdate()
  const [updatingStatus, updatingStatusSetter] = React.useState("")
  const update = React.useCallback(async () => {
    updatingStatusSetter("updating")
    await serviceWorkerUpdate.activate({
      onActivating: () => updatingStatusSetter("activating"),
      onActivated: () => updatingStatusSetter("activated"),
      onBecomesNavigatorController: () => updatingStatusSetter(""),
    })
  }, [])

  return (
    <>
      <p>
        {updatingStatus === "" ? "Mise a jour prête" : null}
        {updatingStatus === "updating" || updatingStatus === "activating"
          ? "Mise a jour..."
          : null}
        {updatingStatus === "activated" &&
        serviceWorkerUpdate.navigatorWillReload
          ? `Mise a jour activée, la page va se recharger`
          : null}
        {updatingStatus === "activated" &&
        !serviceWorkerUpdate.navigatorWillReload &&
        serviceWorkerUpdate.shouldBecomeNavigatorController
          ? `Mise a jour activée, recharger la page pour installer`
          : null}
        {updatingStatus === "activated" &&
        !serviceWorkerUpdate.navigatorWillReload &&
        !serviceWorkerUpdate.shouldBecomeNavigatorController
          ? `Mise a jour activée`
          : null}
      </p>
      <button disabled={Boolean(updatingStatus)} onClick={update}>
        {serviceWorkerUpdate.navigatorWillReload
          ? `Recharger pour mettre a jour`
          : `Mettre a jour`}
      </button>
    </>
  )
}

const UpdateNotAvailable = () => {
  const [updateAttemptStatus, updateAttemptStatusSetter] = React.useState("")

  const check = React.useCallback(async () => {
    updateAttemptStatusSetter("fetching")
    try {
      const found = await serviceWorkerScript.checkForUpdate()
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

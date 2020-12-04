import React from "react"
import {
  serviceWorkerIsAvailable,
  serviceWorkerUpdateIsAvailable,
  listenServiceWorkerUpdateAvailable,
  checkServiceWorkerUpdate,
  activateServiceWorkerUpdating,
} from "@jsenv/pwa/src/navigatorController.js"

export const useServiceWorkerIsAvailable = () => {
  return serviceWorkerIsAvailable()
}

export const useServiceWorkerUpdateIsAvailable = () => {
  const [available, availableSetter] = React.useState(serviceWorkerUpdateIsAvailable())
  React.useEffect(() => {
    return listenServiceWorkerUpdateAvailable(() => {
      availableSetter(serviceWorkerUpdateIsAvailable())
    })
  }, [])
  return available
}

export const useCheckServiceWorkerUpdate = () => {
  return checkServiceWorkerUpdate
}

export const useActivateServiceWorkerUpdating = () => {
  return activateServiceWorkerUpdating
}

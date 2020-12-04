import React from "react"
import {
  serviceWorkerIsAvailable,
  getServiceWorkerUpdate,
  listenServiceWorkerUpdate,
  checkServiceWorkerUpdate,
  activateServiceWorkerUpdating,
} from "@jsenv/pwa/src/navigatorController.js"

export const useServiceWorkerIsAvailable = () => {
  return serviceWorkerIsAvailable()
}

export const useServiceWorkerUpdate = () => {
  const [update, updateSetter] = React.useState(getServiceWorkerUpdate())
  React.useEffect(() => {
    return listenServiceWorkerUpdate(() => {
      updateSetter(getServiceWorkerUpdate())
    })
  }, [])
  return update
}

export const useCheckServiceWorkerUpdate = () => {
  return checkServiceWorkerUpdate
}

export const useActivateServiceWorkerUpdating = () => {
  return activateServiceWorkerUpdating
}

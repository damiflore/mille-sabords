import { canUseServiceWorkers, createServiceWorkerScript } from "@jsenv/pwa"

export const serviceWorkerScript = canUseServiceWorkers
  ? createServiceWorkerScript()
  : null

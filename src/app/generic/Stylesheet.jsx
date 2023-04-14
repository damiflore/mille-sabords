/**

This component (Stylesheet) must ensure a given url is loaded as css by the browser.
To achieve that it creates a <link> and append it to document.head

It is important that even if many Stylesheet are instantiated for a given url only
one <link> ends up in the document.head. (Appended it multiple times is useless).
It happens for Dialog.base.css for instance.

I have tried to achieve this with ReactDOM.createPortal but could not manage
to have only one <link> injected.

*/

import React from "react"

import {
  addLoadedListener,
  useUrlLoadingNotifier,
} from "/app/loading/loading.main.jsx"

export const Stylesheet = ({ href, onLoad = () => {} }) => {
  const [fetchStart, fetchEnd] = useUrlLoadingNotifier(href)

  React.useEffect(() => {
    fetchStart()
    return injectStylesheetIntoDocument(href, {
      onload: () => {
        fetchEnd()
        onLoad()
      },
    })
  }, [href])

  return null
}

const memoizeLinksByHref = (fn) => {
  const linkMap = new Map()

  const stopUsing = (href) => {
    if (!linkMap.has(href)) {
      return
    }

    const { useCount, ...rest } = linkMap.get(href)
    if (useCount > 1) {
      linkMap.set(href, {
        useCount: useCount - 1,
        ...rest,
      })
      return
    }

    linkMap.delete(href)
    rest.linkCleanup()
  }

  return (href, ...args) => {
    if (linkMap.has(href)) {
      const { useCount, ...rest } = linkMap.get(href)
      linkMap.set(href, {
        useCount: useCount + 1,
        ...rest,
      })
      return stopUsing
    }

    const linkCleanup = fn(href, ...args)
    linkMap.set(href, {
      useCount: 1,
      linkCleanup,
    })
    return stopUsing
  }
}

const injectStylesheetIntoDocument = memoizeLinksByHref(
  (href, { onload = () => {} } = {}) => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.type = "text/css"
    const removeLoadedListener = addLoadedListener(link, onload)
    link.href = href
    document.head.appendChild(link)
    return () => {
      removeLoadedListener()
      document.head.removeChild(link)
    }
  },
)

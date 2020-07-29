import React from "react"
import ReactDOM from "react-dom"

import { useBecomes } from "src/hooks.js"
import { firstFocusableDescendantOrSelf, trapFocusInside } from "./focus-trap.js"
import { trapScrollInside } from "./scroll-trap.js"

const { useEffect } = React

/**
https://github.com/reactjs/react-modal
https://github.com/reactjs/react-modal/blob/master/src/components/ModalPortal.js
https://fr.reactjs.org/docs/portals.html
*/

const OVERLAY_STYLE = {
  position: "fixed",
  zIndex: 1000,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.46)",
}

const DIALOG_STYLE = {
  position: "absolute",
  top: "10%",
  left: "6%",
  right: "6%",
  bottom: "8%",
  // prevent body scrolling when scrolling the dialog content
  overscrollBehavior: "contain",
  outline: "none",
  maxWidth: "620px",
  margin: "0 auto",
}

export const DialogBase = ({
  children,
  isOpen,
  // closeMethod can be "visibility-hidden", "hidden-attribute", "dom-remove"
  // ideally we should return null when isOpen is false and the dialog never rendered
  // (to avoid putting the dialog in display none while it might never be used)
  // (but that depends it's too early to know exactly what we want/need)
  closeMethod = "display-none",
  stealFocus = true,
  restoreStolenFocus = true,
  trapFocus = true,
  requestCloseOnEscape = true,
  requestCloseOnClickOutside = false,
  onAfterOpen = () => {},
  onRequestClose = () => {},
  onFocusIn = () => {},
  onFocusOut = () => {},
  overlayProps = {},
  ...rest
}) => {
  const [rootElement, setRootElement] = React.useState(null)
  const rootElementRefCallback = (node) => {
    setRootElement(node)
  }

  const isInsideDocument = Boolean(rootElement)
  const becomesOpen = useBecomes((isActivePrevious) => !isActivePrevious && isOpen, [isOpen])

  if (becomesOpen) {
    onAfterOpen()
  }

  // onFocusIn, onFocusOut implementation
  // https://github.com/facebook/react/issues/6410
  useEffect(() => {
    if (!isOpen || !isInsideDocument) return () => {}

    const onDialogFocus = (focusEvent) => {
      onFocusIn(focusEvent)
    }
    const onDocumentFocus = (focusEvent) => {
      if (!hasOrContainsFocus(rootElement)) {
        onFocusOut(focusEvent)
      }
    }

    rootElement.addEventListener("focus", onDialogFocus, true)
    document.addEventListener("focus", onDocumentFocus, true)
    return () => {
      rootElement.removeEventListener("focus", onDialogFocus, true)
      document.removeEventListener("focus", onDocumentFocus, true)
    }
  }, [isOpen, isInsideDocument, onFocusIn, onFocusOut])

  // trap scroll inside dialog
  useEffect(() => {
    if (!isOpen || !isInsideDocument) return () => {}

    return trapScrollInside(rootElement)
  }, [isOpen, isInsideDocument])

  // trap focus inside dialog
  useEffect(() => {
    if (!isOpen || !isInsideDocument || !trapFocus) return () => {}

    const dialogElement = rootElementToDialogElement(rootElement)
    return trapFocusInside(dialogElement)
  }, [isOpen, isInsideDocument, trapFocus])

  // steal focus to move it into dialog when it opens
  useEffect(() => {
    if (!isOpen || !isInsideDocument || !stealFocus) return () => {}

    const nodeFocusedBeforeTransfer = document.activeElement
    const dialogElement = rootElementToDialogElement(rootElement)
    const firstFocusableElement = firstFocusableDescendantOrSelf(dialogElement)
    if (firstFocusableElement) {
      firstFocusableElement.focus()
    }
    return () => {
      if (firstFocusableElement) {
        if (typeof restoreStolenFocus === "function") {
          restoreStolenFocus(nodeFocusedBeforeTransfer)
        } else if (restoreStolenFocus === true) {
          nodeFocusedBeforeTransfer.focus()
        }
      }
    }
  }, [isOpen, isInsideDocument, stealFocus])

  // mousedown on overlay -> transfer focus to dialog
  useEffect(() => {
    if (!isOpen || !isInsideDocument) return () => {}

    const overlayElement = rootElementToOverlayElement(rootElement)
    const onmousedown = (mousedownEvent) => {
      // prevent mousedown on overlay from putting focus on document.body
      mousedownEvent.preventDefault()
      // instead foward focus to the dialog if not already inside
      if (!hasOrContainsFocus(rootElement)) {
        const dialogElement = rootElementToDialogElement(rootElement)
        const firstFocusableElement = firstFocusableDescendantOrSelf(dialogElement)
        if (firstFocusableElement) {
          firstFocusableElement.focus()
        }
      }
    }
    overlayElement.addEventListener("mousedown", onmousedown, { passive: false })
    return () => {
      overlayElement.removeEventListener("mousedown", onmousedown, { passive: false })
    }
  }, [isOpen, isInsideDocument])

  // put aria-hidden on elements behind this dialog
  useEffect(() => {
    if (!isOpen || !isInsideDocument) return () => {}

    const elementsToHide = []
    /*
    we hide previous and next siblings
    because when dialog is opened everything around it should be considered
    hidden (you cannot have several modal visible at the same time).

    Let's keep in mind we are talking about a dialog in the accessibility terms.
    It should focus trap, prevent interaction with the rest of the page
    and consider the rest as hidden.
    This dialog is not meant to be used for tooltip and so on.
    */
    const parentChildren = Array.from(rootElement.parentNode.children)
    parentChildren.forEach((child) => {
      if (child !== rootElement) {
        elementsToHide.push(child)
      }
    })

    elementsToHide.forEach((element) => {
      element.setAttribute("aria-hidden", "true")
    })
    return () => {
      elementsToHide.forEach((element) => {
        element.removeAttribute("aria-hidden", "true")
      })
    }
  }, [isOpen, isInsideDocument])

  if (closeMethod === "dom-remove" && !isOpen) return null

  return ReactDOM.createPortal(
    <div
      style={{
        ...OVERLAY_STYLE,
        ...(isOpen ? {} : getStyleForClose(closeMethod)),
        ...overlayProps.style,
      }}
      hidden={isOpen || closeMethod !== "hidden-attribute" ? undefined : true}
      ref={(element) => {
        rootElementRefCallback(element)
        if (overlayProps.ref) overlayProps.ref(element)
      }}
      onClick={(clickEvent) => {
        if (requestCloseOnClickOutside) {
          const dialogElement = rootElementToDialogElement(rootElement)
          const { target } = clickEvent
          if (target !== dialogElement && !dialogElement.contains(target)) {
            onRequestClose(clickEvent)
          }
        }
        if (overlayProps.onClick) overlayProps.onClick(clickEvent)
      }}
      onKeyDown={(keydownEvent) => {
        if (requestCloseOnEscape && keydownEvent.keyCode === ESC_KEY) {
          onRequestClose(keydownEvent)
        }
        if (overlayProps.onKeyDown) overlayProps.onKeyDown(keydownEvent)
      }}
      {...overlayProps}
    >
      <div
        tabIndex="-1"
        style={{
          ...DIALOG_STYLE,
          ...rest.style,
        }}
        {...rest}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

const getStyleForClose = (closeMethod) => {
  if (closeMethod === "display-none") {
    return { display: "none" }
  }
  if (closeMethod === "visibility-hidden") {
    return { visibility: "hidden" }
  }
  return {}
}

const rootElementToOverlayElement = (element) => element

const rootElementToDialogElement = (element) => element.firstChild

const hasOrContainsFocus = (element) => {
  const { activeElement } = document
  return element === activeElement || element.contains(activeElement)
}

const ESC_KEY = 27

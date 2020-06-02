import React from "react"
import ReactDOM from "react-dom"

import { useBecomes } from "src/hooks.js"
import { findFirstDescendant } from "src/dom/traversal.js"
import { isFocusable } from "src/dom/dom.js"
import { trapFocusInside } from "./focus-trap.js"

const { useEffect } = React

/**
https://github.com/reactjs/react-modal
https://github.com/reactjs/react-modal/blob/master/src/components/ModalPortal.js
https://fr.reactjs.org/docs/portals.html
*/

const OVERLAY_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.75)",
}

const DIALOG_STYLE = {
  position: "absolute",
  top: "40px",
  left: "40px",
  right: "40px",
  bottom: "40px",
  border: "1px solid rgb(204, 204, 204)",
  // background: "rgb(255, 255, 255)",
  overflow: "auto",
  borderRadius: "4px",
  outline: "none",
  padding: "20px",
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

  const isVisible = closeMethod === "dom-remove" ? Boolean(rootElement) : isOpen
  const becomesVisible = useBecomes((isActivePrevious) => !isActivePrevious && isVisible, [
    isVisible,
  ])

  if (becomesVisible) {
    onAfterOpen()
  }

  // onFocusIn, onFocusOut implementation
  // https://github.com/facebook/react/issues/6410
  useEffect(() => {
    if (!isVisible) return () => {}

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
  }, [isVisible, onFocusIn, onFocusOut])

  // steal focus to move it into dialog when it opens
  useEffect(() => {
    if (!isVisible || !stealFocus) return () => {}

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
  }, [isVisible, stealFocus])

  // ttap focus inside dialog
  useEffect(() => {
    if (!isVisible || !trapFocus) return () => {}

    const dialogElement = rootElementToDialogElement(rootElement)
    return trapFocusInside(dialogElement)
  }, [isVisible, trapFocus])

  // put aria-hidden on elements behind this dialog
  useEffect(() => {
    if (!isVisible) return () => {}

    const elementsToHide = []
    let previous = rootElement.previousSibling
    while (previous) {
      if (previous.nodeType === 1) {
        elementsToHide.push(previous)
      }
      previous = previous.previousSibling
    }
    console.log(elementsToHide)

    elementsToHide.forEach((element) => {
      element.setAttribute("aria-hidden", "true")
    })
    return () => {
      elementsToHide.forEach((element) => {
        element.removeAttribute("aria-hidden", "true")
      })
    }
  }, [isVisible])

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
      onMouseDown={(mousedownEvent) => {
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
        if (rest.onMouseDown) rest.onMouseDown(mousedownEvent)
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

// const rootElementToOverlayElement = (element) => element

const rootElementToDialogElement = (element) => element.firstChild

const hasOrContainsFocus = (element) => {
  const { activeElement } = document
  return element === activeElement || element.contains(activeElement)
}

const firstFocusableDescendantOrSelf = (element) => {
  const firstFocusableDescendant = findFirstDescendant(element, isFocusable)
  if (firstFocusableDescendant) return firstFocusableDescendant

  if (isFocusable(element)) return element

  return null
}

const ESC_KEY = 27

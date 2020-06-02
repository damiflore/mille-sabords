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
  toggleDisplay = true, // when false dialog si removed from the DOM
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

  const isActive = toggleDisplay ? isOpen : Boolean(rootElement)
  const becomesActive = useBecomes((isActivePrevious) => !isActivePrevious && isActive, [isActive])

  if (becomesActive) {
    onAfterOpen()
  }

  // onFocusIn, onFocusOut implementation
  // https://github.com/facebook/react/issues/6410
  useEffect(() => {
    if (!isActive) return () => {}

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
  }, [isActive, onFocusIn, onFocusOut])

  // steal focus to move it into dialog when it opens
  useEffect(() => {
    if (!isActive || !stealFocus) return () => {}

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
  }, [isActive, stealFocus])

  // ttap focus inside dialog
  useEffect(() => {
    if (!isActive || !trapFocus) return () => {}

    const dialogElement = rootElementToDialogElement(rootElement)
    return trapFocusInside(dialogElement)
  }, [isActive, trapFocus])

  // put aria-hidden on elements behind this dialog
  useEffect(() => {
    if (!isActive) return () => {}

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
  }, [isActive])

  if (!isOpen && !toggleDisplay) return null

  return ReactDOM.createPortal(
    <div
      style={{
        ...OVERLAY_STYLE,
        ...(toggleDisplay ? { display: isOpen ? "block" : "none" } : {}),
        ...overlayProps.style,
      }}
      ref={(element) => {
        rootElementRefCallback(element)
        if (overlayProps.ref) overlayProps.ref(element)
      }}
      onClick={(clickEvent) => {
        if (requestCloseOnClickOutside) {
          onRequestClose(clickEvent)
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

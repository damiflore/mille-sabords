import React from "react"
import { HeadStyle } from "src/generic/HeadStyle.js"

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

export const Dialog = ({
  isOpen,
  stealFocus = true,
  restoreStolenFocus = true,
  trapFocus = false,
  requestCloseOnEscape = true,
  requestCloseOnOverlayClick = false,
  onAfterOpen = () => {},
  onRequestClose = () => {},
  children,
  onFocusIn = () => {},
  onFocusOut = () => {},
  ...rest
}) => {
  const [dialogElement, setDialogElement] = React.useState(null)
  const dialogElementRefCallback = (node) => {
    setDialogElement(node)
  }

  // could be isOpen directly if the dialog was display: none instead of return null
  const isActive = Boolean(dialogElement)
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
      if (!hasOrContainsFocus(dialogElement)) {
        onFocusOut(focusEvent)
      }
    }

    dialogElement.addEventListener("focus", onDialogFocus, true)
    document.addEventListener("focus", onDocumentFocus, true)
    return () => {
      dialogElement.removeEventListener("focus", onDialogFocus, true)
      document.removeEventListener("focus", onDocumentFocus, true)
    }
  }, [isActive, onFocusIn, onFocusOut])

  // steal focus to move it into dialog when it opens
  useEffect(() => {
    if (!isActive || !stealFocus) return () => {}

    const nodeFocusedBeforeTransfer = document.activeElement
    const wrapper = dialogElement.querySelector(".dialog--wrapper")
    const firstFocusableElement = firstFocusableDescendantOrSelf(wrapper)

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

  // tap focus inside dialog
  useEffect(() => {
    if (!isActive || !trapFocus) return () => {}

    return trapFocusInside(dialogElement.querySelector(".dialog--wrapper"))
  }, [isActive, trapFocus])

  // put aria-hidden on elements behind this dialog
  useEffect(() => {
    if (!isActive) return () => {}

    const elementsToHide = []
    let previous = dialogElement.previousSibling
    while (previous) {
      elementsToHide.push(previous)
      previous = previous.previousSibling
    }

    elementsToHide.forEach((element) => {
      element.setAttribute("aria-hidden", "true")
    })
    return () => {
      elementsToHide.forEach((element) => {
        element.removeAttribute("aria-hidden", "true")
      })
    }
  }, [isActive])

  return isOpen ? (
    <>
      <DialogHeadStyle />
      <div
        className="dialog"
        ref={dialogElementRefCallback}
        onMouseDown={
          requestCloseOnOverlayClick
            ? undefined
            : () => {
                // put focus on the dialog when clicking on overlay
                // it will allow escape to close it
                if (dialogElement && !dialogElement.contains(document.activeElement)) {
                  dialogElement.querySelector(".dialog--wrapper").focus({ preventScroll: true })
                }
              }
        }
        onClick={requestCloseOnOverlayClick ? () => {} : undefined}
        onKeyDown={
          requestCloseOnEscape
            ? (keydownEvent) => {
                if (keydownEvent.keyCode === ESC_KEY) {
                  onRequestClose(keydownEvent)
                }
              }
            : undefined
        }
        {...rest}
      >
        <div tabIndex="-1" className="dialog--wrapper">
          {children}
        </div>
      </div>
    </>
  ) : null
}

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

let DialogHeadStyle = () => <HeadStyle href="/src/game-dialog/dialog.css" />
DialogHeadStyle = React.memo(DialogHeadStyle)

const ESC_KEY = 27

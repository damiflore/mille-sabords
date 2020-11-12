/**

--- click-no-effect-scenario ---

Be careful if you ever create the following html structure:

<div onClick={openDialog}>
  Open dialog
  <Dialog requestCloseOnClickOutside={true} requestClose={closeDialog} />
</div>

In this context the onClick will happen on dialog backdrop which is
Inside the <div>. The closeDialog will be called but as click event bubbles
it will also trigger onClick listener from the <div>.
In the end the click interaction both close and open the dialog in the same event loop.

*/

import React from "react"
import ReactDOM from "react-dom"

import { useBecomes } from "src/hooks.js"
import { Stylesheet } from "src/generic/Stylesheet.jsx"
import { firstFocusableDescendantOrSelf, trapFocusInside } from "./focus-trap.js"
import { trapScrollInside } from "./scroll-trap.js"

import dialogBaseCssUrl from "./dialog.base.css"

const { useEffect } = React

/**
https://github.com/reactjs/react-modal
https://github.com/reactjs/react-modal/blob/master/src/components/ModalPortal.js
https://fr.reactjs.org/docs/portals.html
*/

export const DialogBase = ({
  container = document.body,
  header,
  footer,
  children,
  isOpen,
  // closeMethod can be "visibility-hidden", "hidden-attribute", "dom-remove"
  // ideally we should return null when isOpen is false and the dialog never rendered
  // (to avoid putting the dialog in display none while it might never be used)
  // (but it's too early to know exactly what we want/need)
  closeMethod = "display-none",
  minSpacingWithContainer = 0.1, // see dialog.readme.md
  stealFocus = true,
  restoreStolenFocus = true,
  trapFocus = true,
  requestCloseOnEscape = true,
  requestCloseOnClickOutside = false,
  onAfterOpen = () => {},
  onRequestClose = () => {},
  onFocusIn = () => {},
  onFocusOut = () => {},
  backdropProps = {},
  ...rest
}) => {
  if (!container) return null
  const [dialogElement, setDialogElement] = React.useState(null)

  const isInsideDocument = Boolean(dialogElement)
  const becomesOpen = useBecomes((isOpenPrevious) => !isOpenPrevious && isOpen, [isOpen])

  if (becomesOpen) {
    onAfterOpen()
  }

  // onFocusIn, onFocusOut implementation
  // https://github.com/facebook/react/issues/6410
  useEffect(() => {
    if (!isOpen || !isInsideDocument) return () => {}

    let focusIsInsideDialog = hasOrContainsFocus(dialogElement)

    const onDocumentBlur = (blurEvent) => {
      // focus is leaving the document and it was inside dialog
      if (!blurEvent.relatedTarget) {
        if (focusIsInsideDialog) {
          focusIsInsideDialog = false
          onFocusOut(blurEvent)
        }
      }
    }

    const onDialogFocus = (focusEvent) => {
      onFocusIn(focusEvent)
      focusIsInsideDialog = true
    }
    const onDocumentFocus = (focusEvent) => {
      if (hasOrContainsFocus(dialogElement)) {
        focusIsInsideDialog = true
      } else {
        focusIsInsideDialog = false
        onFocusOut(focusEvent)
      }
    }

    dialogElement.addEventListener("focus", onDialogFocus, true)
    document.addEventListener("focus", onDocumentFocus, true)
    document.addEventListener("blur", onDocumentBlur, true)
    return () => {
      dialogElement.removeEventListener("focus", onDialogFocus, true)
      document.removeEventListener("focus", onDocumentFocus, true)
      document.removeEventListener("blur", onDocumentBlur, true)
    }
  }, [isOpen, isInsideDocument, onFocusIn, onFocusOut])

  // trap scroll inside dialog
  useEffect(() => {
    if (!isOpen || !isInsideDocument) {
      return () => {}
    }
    return trapScrollInside(dialogElement)
  }, [isOpen, isInsideDocument])

  // trap focus inside dialog
  useEffect(() => {
    if (!isOpen || !isInsideDocument || !trapFocus) return () => {}

    return trapFocusInside(dialogElement)
  }, [isOpen, isInsideDocument, trapFocus])

  // steal focus to move it into dialog when it opens
  useEffect(() => {
    if (!isOpen || !isInsideDocument || !stealFocus) return () => {}

    const nodeFocusedBeforeTransfer = document.activeElement
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

  // put aria-hidden on elements behind this dialog
  useEffect(() => {
    if (!isOpen || !dialogElement || !dialogElement.parentNode) return () => {}

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
    const parentChildren = Array.from(dialogElement.parentNode.children)
    parentChildren.forEach((child) => {
      if (child !== dialogElement) {
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
  }, [isOpen, dialogElement])

  if (closeMethod === "dom-remove" && !isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div
      role="dialog"
      className="dialog--root"
      style={{
        top: ratioToValueRelativeToContainerHeight(minSpacingWithContainer),
        bottom: ratioToValueRelativeToContainerHeight(minSpacingWithContainer),
        ...(closeMethod === "display-none" && !isOpen ? { display: "none" } : {}),
        ...(closeMethod === "visibility-hidden" && !isOpen ? { visibility: "hidden" } : {}),
      }}
      hidden={closeMethod === "hidden-attribute" && !isOpen ? true : undefined}
    >
      <Stylesheet href={dialogBaseCssUrl} />
      {isOpen ? (
        <DialogBackDrop
          {...backdropProps}
          className="dialog--backdrop"
          // mousedown on backdrop -> transfer focus to dialog
          onMouseDownActive={(mousedownEvent) => {
            // prevent mousedown on backdrop from putting focus on document.body
            mousedownEvent.preventDefault()
            // instead foward focus to the dialog if not already inside
            if (!hasOrContainsFocus(dialogElement)) {
              const firstFocusableElement = firstFocusableDescendantOrSelf(dialogElement)
              if (firstFocusableElement) {
                firstFocusableElement.focus()
              }
            }
          }}
          onClick={(clickEvent) => {
            // I wonder if we should clickEvent.stopPropagation()
            // because back drop is also there to shallow click interaction
            // it would prevent the click event from bubbling and creates the potential
            // --- click-no-effect-scenario --- described at the top of this file.
            if (requestCloseOnClickOutside) {
              const { target } = clickEvent
              // dialogElement.firstChild?
              if (target !== dialogElement && !dialogElement.contains(target)) {
                onRequestClose(clickEvent)
              }
            }
            if (backdropProps.onClick) backdropProps.onClick(clickEvent)
          }}
        />
      ) : null}
      <div
        className="dialog--content"
        style={{
          maxWidth: ratioToValueRelativeToContainerWidth(1 - minSpacingWithContainer * 2),
        }}
      >
        <div className="dialog--header">{header}</div>
        <div
          {...rest}
          className="dialog--body"
          ref={(element) => {
            setDialogElement(element)
            if (rest.ref) rest.ref(element)
          }}
          onKeyDown={(keydownEvent) => {
            if (requestCloseOnEscape && keydownEvent.keyCode === ESC_KEY) {
              onRequestClose(keydownEvent)
            }
            if (rest.onKeyDown) rest.onKeyDown(keydownEvent)
          }}
          tabIndex="-1"
        >
          {children}
        </div>
        <div className="dialog--footer">{footer}</div>
      </div>
    </div>,
    container,
  )
}

const ratioToValueRelativeToContainerWidth = (value) => `${value * 100}%`

const ratioToValueRelativeToContainerHeight = (value) => `${value * 100}%`

const DialogBackDrop = ({ onMouseDownActive, ...props }) => {
  const [backdropElement, setBackdropElement] = React.useState(null)
  useEffect(() => {
    if (!backdropElement) return () => {}

    backdropElement.addEventListener("mousedown", onMouseDownActive, { passive: false })
    return () => {
      backdropElement.removeEventListener("mousedown", onMouseDownActive, { passive: false })
    }
  }, [backdropElement])

  return (
    <div
      ref={(element) => {
        setBackdropElement(element)
        if (props.ref) props.ref(element)
      }}
      {...props}
    ></div>
  )
}

const hasOrContainsFocus = (element) => {
  const { activeElement } = document
  return element === activeElement || element.contains(activeElement)
}

const ESC_KEY = 27

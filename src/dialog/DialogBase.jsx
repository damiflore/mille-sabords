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

const dialogBaseCssUrl = new URL("/src/dialog/dialog.base.css", import.meta.url)

const { useEffect } = React

/**
https://github.com/reactjs/react-modal
https://github.com/reactjs/react-modal/blob/master/src/components/ModalPortal.js
https://fr.reactjs.org/docs/portals.html
*/

export const DialogBase = ({
  container = document.body,
  insertTop,
  insertLeft,
  insertRight,
  insertBottom,
  children,

  isOpen,
  requestCloseOnEscape = true,
  requestCloseOnClickOutside = false,
  // closeMethod can be "visibility-hidden", "hidden-attribute", "dom-remove"
  // ideally we should return null when isOpen is false and the dialog never rendered
  // (to avoid putting the dialog in display none while it might never be used)
  // (but it's too early to know exactly what we want/need)
  closeMethod = "display-none",

  stealFocus = true,
  restoreStolenFocus = true,
  trapFocus = true,

  onAfterOpen = () => {},
  onRequestClose = () => {},
  onFocusIn = () => {},
  onFocusOut = () => {},
  backdropProps = {},
  ...rest
}) => {
  if (!container) return null
  const [dialogRootNode, dialogRootNodeSetter] = React.useState(null)

  const isInsideDocument = Boolean(dialogRootNode)
  const becomesOpen = useBecomes((isOpenPrevious) => !isOpenPrevious && isOpen, [isOpen])

  if (becomesOpen) {
    onAfterOpen()
  }

  // onFocusIn, onFocusOut implementation
  // https://github.com/facebook/react/issues/6410
  useEffect(() => {
    if (!isOpen || !isInsideDocument) return () => {}

    let focusIsInsideDialog = hasOrContainsFocus(dialogRootNode)

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
      if (hasOrContainsFocus(dialogRootNode)) {
        focusIsInsideDialog = true
      } else {
        focusIsInsideDialog = false
        onFocusOut(focusEvent)
      }
    }

    dialogRootNode.addEventListener("focus", onDialogFocus, true)
    document.addEventListener("focus", onDocumentFocus, true)
    document.addEventListener("blur", onDocumentBlur, true)
    return () => {
      dialogRootNode.removeEventListener("focus", onDialogFocus, true)
      document.removeEventListener("focus", onDocumentFocus, true)
      document.removeEventListener("blur", onDocumentBlur, true)
    }
  }, [isOpen, isInsideDocument, onFocusIn, onFocusOut])

  // trap scroll inside dialog
  useEffect(() => {
    if (!isOpen || !isInsideDocument) {
      return () => {}
    }
    return trapScrollInside(dialogRootNode)
  }, [isOpen, isInsideDocument])

  // trap focus inside dialog
  useEffect(() => {
    if (!isOpen || !isInsideDocument || !trapFocus) return () => {}

    return trapFocusInside(dialogRootNode)
  }, [isOpen, isInsideDocument, trapFocus])

  // steal focus to move it into dialog when it opens
  useEffect(() => {
    if (!isOpen || !isInsideDocument || !stealFocus) return () => {}

    const nodeFocusedBeforeTransfer = document.activeElement
    const firstFocusableElement = firstFocusableDescendantOrSelf(dialogRootNode)
    if (firstFocusableElement) {
      firstFocusableElement.focus({ preventScroll: true })
    }
    return () => {
      if (firstFocusableElement) {
        if (typeof restoreStolenFocus === "function") {
          restoreStolenFocus(nodeFocusedBeforeTransfer)
        } else if (restoreStolenFocus === true) {
          nodeFocusedBeforeTransfer.focus({ preventScroll: true })
        }
      }
    }
  }, [isOpen, isInsideDocument, stealFocus])

  // put aria-hidden on elements behind this dialog
  useEffect(() => {
    if (!isOpen || !dialogRootNode || !dialogRootNode.parentNode) return () => {}

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
    const parentChildren = Array.from(dialogRootNode.parentNode.children)
    parentChildren.forEach((child) => {
      if (child !== dialogRootNode) {
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
  }, [isOpen, dialogRootNode])

  if (closeMethod === "dom-remove" && !isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div
      {...rest}
      role="dialog"
      className={`dialog--root${rest.className ? ` ${rest.className}` : ""}`}
      ref={(element) => {
        dialogRootNodeSetter(element)
        if (rest.ref) rest.ref(element)
      }}
      onKeyDown={(keydownEvent) => {
        if (requestCloseOnEscape && keydownEvent.keyCode === ESC_KEY) {
          onRequestClose(keydownEvent)
        }
        if (rest.onKeyDown) rest.onKeyDown(keydownEvent)
      }}
      tabIndex="-1"
      style={{
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
            if (!hasOrContainsFocus(dialogRootNode)) {
              const firstFocusableElement = firstFocusableDescendantOrSelf(dialogRootNode)
              if (firstFocusableElement) {
                firstFocusableElement.focus({ preventScroll: true })
              }
            }
          }}
          onClick={(clickEvent) => {
            // I wonder if we should clickEvent.stopPropagation()
            // because back drop is also there to shallow click interaction
            // it would prevent the click event from bubbling and creates the potential
            // --- click-no-effect-scenario --- described at the top of this file.
            if (requestCloseOnClickOutside) {
              onRequestClose(clickEvent)
            }
            if (backdropProps.onClick) backdropProps.onClick(clickEvent)
          }}
        />
      ) : null}
      <div className="dialog--document">
        <div className="dialog--insert-top">{insertTop}</div>
        <div className="dialog--main">
          <div className="dialog--insert-left">{insertLeft}</div>
          <div className="dialog--scrollable-content">{children}</div>
          <div className="dialog--insert-right">{insertRight}</div>
        </div>
        <div className="dialog--insert-bottom">{insertBottom}</div>
      </div>
    </div>,
    container,
  )
}

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

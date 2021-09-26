// https://vincenttaverna.com/posts/react-image-hook/
export const loadImage = (url, crossOrigin) => {
  const image = new Image()

  if (crossOrigin) {
    image.crossOrigin = crossOrigin
  }

  return new Promise((resolve, reject) => {
    // Load Handler
    const loaded = (event) => {
      // Cleanup our image element, we no longer need it
      unbindEvents(image)
      // Fulfill our promise with the event image element, even in older browsers
      resolve(event.target || event.srcElement)
    }

    // Error Handler
    const errored = (error) => {
      // Cleanup our image element, we no longer need it
      unbindEvents(image)
      // Forward our error to the user
      reject(error)
    }

    // Set our handlers
    image.onload = loaded
    image.onerror = errored
    image.onabort = errored

    // Tell the browser we are ready to begin downloading
    image.src = url
  })
}

const unbindEvents = (image) => {
  // Reset callbacks
  image.onload = null
  image.onerror = null
  image.onabort = null

  try {
    // Some browsers need you to remove the src
    // in order to garbage collect the image object
    delete image.src
  } catch (e) {
    // Safari's strict mode throws, ignore
  }
}

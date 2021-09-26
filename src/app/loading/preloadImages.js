import { loadImage } from "./loadImage.js"

export const preloadImages = async (
  images,
  { chunkSize = 7, msDelayBetweenChunks = 2000 } = {},
) => {
  let index = 0
  const loaded = {}
  const failed = {}

  const preloadChunk = async (chunk) => {
    await Promise.all(
      chunk.map(async (src) => {
        try {
          const image = await loadImage(src)
          loaded[src] = image
        } catch (error) {
          failed[src] = true
        }
      }),
    )
    await new Promise((resolve) => {
      setTimeout(resolve, msDelayBetweenChunks)
    })
    const nextChunk = getNextChunk()
    if (nextChunk.length > 0) {
      await preloadChunk(nextChunk)
    }
  }

  const getNextChunk = () => {
    const chunk = []
    let i = 0
    while (i < chunkSize && index < images.length) {
      chunk.push(images[index])
      i++
      index++
    }
    return chunk
  }

  await preloadChunk(getNextChunk())

  return { loaded, failed }
}

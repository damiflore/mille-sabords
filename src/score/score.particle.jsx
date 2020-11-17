import React from "react"

import { getDomNodeRectangle } from "src/dom/dom.position.js"

export const ScoreParticle = ({
  totalScoreDomNodeRef,
  scoreParticleMergedEmitter,
  scoreParticle,
}) => {
  const particleDomNodeRef = React.useRef()
  React.useEffect(() => {
    const particleDomNode = particleDomNodeRef.current
    const totalScoreDomNode = totalScoreDomNodeRef.current
    return animateScoreParticle({
      particleDomNode,
      totalScoreDomNode,
      x: scoreParticle.x,
      y: scoreParticle.y,
      delay: scoreParticle.animationDelay,
      oncancel: scoreParticle.onScoreParticleCanceled,
      onfinish: () => {
        scoreParticleMergedEmitter(scoreParticle)
      },
    })
  }, [])

  return (
    <div ref={particleDomNodeRef} className="score-particle">
      {scoreParticle.value}
    </div>
  )
}

const animateScoreParticle = ({
  particleDomNode,
  totalScoreDomNode,
  x,
  y,
  duration = 800,
  delay = 0,
  oncancel = () => {},
  onfinish = () => {},
}) => {
  const particleDomNodeRectangle = getDomNodeRectangle(particleDomNode)
  const totalScoreDomNodeRectangle = getDomNodeRectangle(totalScoreDomNode)

  const particleWidth = particleDomNodeRectangle.right - particleDomNodeRectangle.left
  const particleHeight = particleDomNodeRectangle.bottom - particleDomNodeRectangle.top
  const startX = x - particleWidth / 2
  const startY = y - particleHeight / 2
  const intermediateX = startX + 5
  const intermediateY = startY - particleHeight * 1.5
  const endX = totalScoreDomNodeRectangle.left
  const endY = totalScoreDomNodeRectangle.top

  particleDomNode.style.left = `${startX}px`
  particleDomNode.style.top = `${startY}px`

  // en premier fait apparaitre avec opacité
  const animation = particleDomNode.animate(
    [
      {
        opacity: 0,
        visibility: "visible",
        transform: "translate(0px, 0px)",
      },
      {
        offset: 0.1,
        opacity: 1,
        // transform: "translate(0px, 0px)",
      },
      {
        offset: 0.4,
        opacity: 1,
        transform: `translate(${intermediateX - startX}px, ${intermediateY - startY}px) scale(1.2)`,
      },
      {
        transform: `translate(${endX - startX}px, ${endY - startY}px) scale(1.2)`,
      },
    ],
    {
      duration,
      delay,
      fill: "forwards",
    },
  )
  animation.onfinish = () => {
    onfinish()
  }

  return () => {
    oncancel()
    animation.cancel()
  }
}

import React from "react"

import { getDomNodeRectangle } from "src/dom/dom.position.js"

export const useScoreParticles = ({
  minDelayBetweenParticles = 400,
  onScoreParticleMerged = () => {},
} = {}) => {
  const [scoreParticles, scoreParticlesSetter] = React.useState([])

  const addScoreParticleToState = (scoreParticle) => {
    scoreParticlesSetter((scoreParticles) => {
      const scoreParticlesWithParticle = [...scoreParticles, scoreParticle]
      return scoreParticlesWithParticle
    })
    return () => {
      scoreParticlesSetter((scoreParticles) => {
        const scoreParticlesWithoutParticle = scoreParticles.filter(
          (scoreParticleCandidate) => scoreParticleCandidate !== scoreParticle,
        )
        return scoreParticlesWithoutParticle
      })
    }
  }

  const lastAnimationMsRef = React.useRef(null)
  const addScoreParticle = ({ id, value, x, y }) => {
    const lastAnimationMs = lastAnimationMsRef.current
    lastAnimationMsRef.current = Date.now()
    const animationDelay = scoreParticleAnimationDelayGetter(
      lastAnimationMs,
      minDelayBetweenParticles,
    )

    const scoreParticle = {
      id,
      value,
      x,
      y,
      animationDelay,
      oncancel: () => {
        // not really needed as long as code calling addScoreParticle
        // does it in a useEffect and returns removeScoreParticleFromState
        removeScoreParticleFromState()
      },
      onfinish: () => {
        removeScoreParticleFromState()
        onScoreParticleMerged(scoreParticle)
      },
    }
    const removeScoreParticleFromState = addScoreParticleToState(scoreParticle)
    return removeScoreParticleFromState
  }

  return [scoreParticles, addScoreParticle]
}

// score displayed is score without taking into account score into particles
export const useScoreWithoutParticles = ({ score, scoreParticles }) => {
  return React.useMemo(() => {
    const scoreInParticles = scoreParticles.reduce(
      (previous, particle) => previous + particle.value,
      0,
    )
    const scoreWithoutParticles = score - scoreInParticles
    return scoreWithoutParticles
  }, [score, scoreParticles])
}

const scoreParticleAnimationDelayGetter = (lastAnimationMs, minDelayBetweenParticles) => {
  if (!lastAnimationMs) {
    return 0
  }

  const nowMs = Date.now()
  const msEllapsedSinceLastParticle = nowMs - lastAnimationMs
  const msToWait = minDelayBetweenParticles - msEllapsedSinceLastParticle
  if (msToWait <= 0) {
    return 0
  }

  return msToWait
}

export const ScoreParticle = ({ totalScoreDomNodeRef, scoreParticle }) => {
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
      oncancel: scoreParticle.oncancel,
      onfinish: scoreParticle.onfinish,
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

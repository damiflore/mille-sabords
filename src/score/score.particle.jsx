import React from "react"

import { getDomNodeRectangle } from "src/dom/dom.position.js"

export const useScoreParticles = ({
  totalScore = 0,
  minDelayBetweenParticles = 400,
  scoreParticleAnimationDuration = 800,
  onScoreParticleAdded = () => {},
  onScoreParticleRemoved = () => {},
  onScoreParticleMerged = () => {},
} = {}) => {
  const [score, scoreSetter] = React.useState(totalScore)
  const [scoreParticles, scoreParticlesSetter] = React.useState([])

  React.useEffect(() => {
    scoreSetter(totalScore)
  }, [totalScore])

  const addScoreParticleToState = (scoreParticle) => {
    // scoreParticlesSetter([...scoreParticles, scoreParticle])
    // return () => {
    //   scoreParticlesSetter(
    //     scoreParticles.filter((scoreParticleCandidate) => scoreParticleCandidate !== scoreParticle),
    //   )
    // }
    scoreParticlesSetter((scoreParticles) => {
      const scoreParticlesWithParticle = [...scoreParticles, scoreParticle]
      return scoreParticlesWithParticle
    })
    onScoreParticleAdded(scoreParticle)
    let removed = false
    return () => {
      if (removed) return
      removed = true
      scoreParticlesSetter((scoreParticles) => {
        const scoreParticlesWithoutParticle = scoreParticles.filter(
          (scoreParticleCandidate) => scoreParticleCandidate !== scoreParticle,
        )
        return scoreParticlesWithoutParticle
      })
      scoreSetter((score) => score - scoreParticle.value)
      onScoreParticleRemoved(scoreParticle)
    }
  }

  const lastAnimationMsRef = React.useRef(null)
  const addScoreParticle = ({
    id,
    value,
    children = value,
    animationType = 'popOnPlace',
    x,
    y,
    animationDuration = scoreParticleAnimationDuration,
  }) => {
    const lastAnimationMs = lastAnimationMsRef.current
    const animationDelay = scoreParticleAnimationDelayGetter(
      lastAnimationMs,
      minDelayBetweenParticles,
    )
    lastAnimationMsRef.current = Date.now() + animationDelay

    const scoreParticle = {
      id,
      value,
      children,
      x,
      y,
      animationDelay,
      animationDuration,
      animationType,
      oncancel: () => {
        // not really needed as long as code calling addScoreParticle
        // does it in a useEffect and returns removeScoreParticleFromState
        removeScoreParticleFromState()
      },
      onfinish: () => {
        // removeScoreParticleFromState()
        onScoreParticleMerged(scoreParticle)
        scoreSetter((score) => score + scoreParticle.value)
      },
    }
    const removeScoreParticleFromState = addScoreParticleToState(scoreParticle)
    return removeScoreParticleFromState
  }

  const scoreInParticles = scoreParticles.reduce(
    (previous, particle) => previous + particle.value,
    0,
  )
  const scoreDisplayed = score - scoreInParticles

  return [scoreParticles, addScoreParticle, scoreDisplayed]
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

  React.useLayoutEffect(() => {
    const particleDomNode = particleDomNodeRef.current
    const textNode = particleDomNode.querySelector("text")
    const textNodeBox = textNode.getBBox()
    particleDomNode.setAttribute("width", textNodeBox.width)
    particleDomNode.setAttribute("height", textNodeBox.height)
  }, [])

  React.useEffect(() => {
    const particleDomNode = particleDomNodeRef.current
    const totalScoreDomNode = totalScoreDomNodeRef.current

    return animateScoreParticle({
      particleDomNode,
      totalScoreDomNode,
      x: scoreParticle.x,
      y: scoreParticle.y,
      duration: scoreParticle.animationDuration,
      delay: scoreParticle.animationDelay,
      animationType: scoreParticle.animationType,
      oncancel: scoreParticle.oncancel,
      onfinish: scoreParticle.onfinish,
    })
  }, [])

  return (
    <svg ref={particleDomNodeRef} className="score-particle">
      <text x="0" y="0" dominantBaseline="text-before-edge" className={`score-particle--value ${scoreParticle.animationType}`}>
        {scoreParticle.children}
      </text>
    </svg>
  )
}

const animateScoreParticle = ({
  particleDomNode,
  totalScoreDomNode,
  x,
  y,
  duration,
  delay = 0,
  animationType = 'popOnPlace',
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
  var animation;
  if (animationType === 'moveToTotalScore') {
    animation = particleDomNode.animate(
      [
        {
          opacity: 0,
          visibility: "visible",
          transform: "translate(0px, 0px)",
        },
        {
          offset: 0.1,
          opacity: 1,
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
  }
  else if (animationType === 'popOnPlace') {
    animation = particleDomNode.animate(
      [
        {
          opacity: 0,
          visibility: "visible",
          transform: "translate(0px, 0px)",
        },
        {
          offset: 0.1,
          opacity: 1,
        },
        {
          offset: 0.4,
          opacity: 1,
          transform: `scale(1.2)`,
        },
        {
          // transform: `scale(0)`,
        },
      ],
      {
        duration,
        delay,
        fill: "forwards",
      },
    )
  }

  animation.onfinish = () => {
    onfinish()
  }

  return () => {
    oncancel()
    animation.cancel()
  }
}

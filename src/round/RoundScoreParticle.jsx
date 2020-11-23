import React from "react"
import { getDomNodeRectangle } from "src/dom/dom.position.js"
import { getRectangleCenterPoint } from "src/helper/rectangle.js"
import { symbolToImageUrl } from "src/symbols/symbols.js"

export const RoundScoreParticle = ({
  totalScoreDomNodeRef,
  scoreParticle,
  animationDelayGetter = () => 0,
}) => {
  if (scoreParticle.type === "bonus") {
    return (
      <ScoreParticleTreasure
        totalScoreDomNodeRef={totalScoreDomNodeRef}
        scoreParticle={scoreParticle}
        animationDelayGetter={animationDelayGetter}
      ></ScoreParticleTreasure>
    )
  }

  if (scoreParticle.type === "combo") {
    return (
      <ScoreParticleCombo
        scoreParticle={scoreParticle}
        animationDelayGetter={animationDelayGetter}
      ></ScoreParticleCombo>
    )
  }

  return (
    <ScoreParticlePerfect
      scoreParticle={scoreParticle}
      animationDelayGetter={animationDelayGetter}
    ></ScoreParticlePerfect>
  )
}

const ScoreParticleTreasure = ({
  totalScoreDomNodeRef,
  scoreParticle,
  animationDuration = 800,
  animationDelayGetter,
}) => {
  const symbolUrl = symbolToImageUrl(scoreParticle.symbol)
  const particleDomNodeRef = React.useRef()

  React.useEffect(() => {
    const particleDomNode = particleDomNodeRef.current
    const totalScoreDomNode = totalScoreDomNodeRef.current
    const particlePosition = domNodeToCenterPoint(
      document.querySelector(`[data-chest-slot="${scoreParticle.chestSlot}"]`),
    )
    return animateScoreParticleMoveToTotalScore({
      particleDomNode,
      totalScoreDomNode,
      x: particlePosition.x,
      y: particlePosition.y,
      duration: animationDuration,
      delay: animationDelayGetter(),
      onfinish: scoreParticle.onfinish,
      oncancel: scoreParticle.oncancel,
    })
  }, [])

  return (
    <svg ref={particleDomNodeRef} width="32" height="32" className="score-particle--symbol">
      <image xlinkHref={symbolUrl} width="32" height="32" />,
    </svg>
  )
}

const ScoreParticleCombo = ({ scoreParticle, animationDuration = 800, animationDelayGetter }) => {
  const [svgDomNodeRef, svgChildDomNodeRef] = useSvgFluidSizeEffect()

  React.useEffect(() => {
    const svgDomNode = svgDomNodeRef.current
    const particlePosition = domNodeToCenterPoint(document.querySelector(`.chest .box`))
    return animateScoreParticlePopOnPlace({
      particleDomNode: svgDomNode,
      x: particlePosition.x,
      y: particlePosition.y,
      duration: animationDuration,
      delay: animationDelayGetter(),
      onfinish: scoreParticle.onfinish,
      oncancel: scoreParticle.oncancel,
    })
  }, [])

  return (
    <svg ref={svgDomNodeRef} className="score-particle--perfect">
      <g ref={svgChildDomNodeRef}>
        <text x="0" y="0" dominantBaseline="text-before-edge">
          Combo {scoreParticle.symbolCount}
        </text>
      </g>
    </svg>
  )
}

const ScoreParticlePerfect = ({ scoreParticle, animationDuration = 800, animationDelayGetter }) => {
  const [svgDomNodeRef, svgChildDomNodeRef] = useSvgFluidSizeEffect()

  React.useEffect(() => {
    const svgDomNode = svgDomNodeRef.current
    const particlePosition = domNodeToCenterPoint(document.querySelector(`.chest .box`))
    return animateScoreParticlePopOnPlace({
      particleDomNode: svgDomNode,
      x: particlePosition.x,
      y: particlePosition.y,
      duration: animationDuration,
      delay: animationDelayGetter(),
      onfinish: scoreParticle.onfinish,
      oncancel: scoreParticle.oncancel,
    })
  }, [])

  return (
    <svg ref={svgDomNodeRef} className="score-particle--combo">
      <g ref={svgChildDomNodeRef}>
        <text x="0" y="0" dominantBaseline="text-before-edge">
          Coffre parfait
        </text>
      </g>
    </svg>
  )
}

const animateScoreParticleMoveToTotalScore = ({
  particleDomNode,
  totalScoreDomNode,
  x,
  y,
  duration,
  delay,
  onfinish = () => {},
  oncancel = () => {},
}) => {
  const particleDomNodeRectangle = getDomNodeRectangle(particleDomNode)
  const totalScoreDomNodeRectangle = getDomNodeRectangle(totalScoreDomNode)

  const particleWidth = particleDomNodeRectangle.right - particleDomNodeRectangle.left
  const particleHeight = particleDomNodeRectangle.bottom - particleDomNodeRectangle.top
  const startX = x - particleWidth / 2
  const startY = y - particleHeight / 2
  const intermediateX = startX
  const intermediateY = startY - particleHeight * 1.1
  const endX = totalScoreDomNodeRectangle.left
  const endY = totalScoreDomNodeRectangle.top

  particleDomNode.style.left = `${startX}px`
  particleDomNode.style.top = `${startY}px`

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
      },
      {
        offset: 0.6,
        opacity: 1,
        transform: `translate(${intermediateX - startX}px, ${intermediateY - startY}px)`,
      },
      {
        transform: `translate(${endX - startX}px, ${endY - startY}px)`,
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

const animateScoreParticlePopOnPlace = ({
  particleDomNode,
  x,
  y,
  duration,
  delay,
  onfinish = () => {},
  oncancel = () => {},
}) => {
  const particleDomNodeRectangle = getDomNodeRectangle(particleDomNode)

  const particleWidth = particleDomNodeRectangle.right - particleDomNodeRectangle.left
  const particleHeight = particleDomNodeRectangle.bottom - particleDomNodeRectangle.top
  const startX = x - particleWidth / 2
  const startY = y - particleHeight / 2

  particleDomNode.style.left = `${startX}px`
  particleDomNode.style.top = `${startY}px`

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
  animation.onfinish = () => {
    onfinish()
  }

  return () => {
    oncancel()
    animation.cancel()
  }
}

const useSvgFluidSizeEffect = () => {
  const svgDomNodeRef = React.useRef()
  const svgChildDomNodeRef = React.useRef()
  React.useLayoutEffect(() => {
    const svgDomNode = svgDomNodeRef.current
    const svgChildDomNode = svgChildDomNodeRef.current
    const svgChildDomNodeBox = svgChildDomNode.getBBox()

    svgDomNode.setAttribute("width", Math.ceil(svgChildDomNodeBox.width))
    svgDomNode.setAttribute("height", Math.ceil(svgChildDomNodeBox.height))
  }, [])
  return [svgDomNodeRef, svgChildDomNodeRef]
}

const domNodeToCenterPoint = (domNode) => {
  const domNodeRectangle = getDomNodeRectangle(domNode)
  const centerPoint = getRectangleCenterPoint(domNodeRectangle)
  return centerPoint
}

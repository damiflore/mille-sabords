import React from "react"

export const useScoreParticles = ({
  totalScore = 0,
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

  const addScoreParticle = ({ id, value, ...rest }) => {
    const scoreParticle = {
      id,
      value,
      ...rest,
      oncancel: () => {
        // not really needed as long as code calling addScoreParticle
        // does it in a useEffect and returns removeScoreParticleFromState
        removeScoreParticleFromState()
      },
      onfinish: () => {
        removeScoreParticleFromState()
        onScoreParticleMerged(scoreParticle)
        scoreSetter((score) => score + value)
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

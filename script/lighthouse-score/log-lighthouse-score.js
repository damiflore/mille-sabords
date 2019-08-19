const { generateLighthouseScoreMap } = require("./generateLighthouseScoreMap.js")

generateLighthouseScoreMap().then((scoreMap) => {
  console.log(scoreMap)
})

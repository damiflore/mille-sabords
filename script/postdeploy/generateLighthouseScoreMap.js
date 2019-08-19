const lighthouse = require("lighthouse")
const chromeLauncher = require("chrome-launcher")

const opts = {
  chromeFlags: ["--show-paint-rects"],
}

const url = "https://mille-sabords.herokuapp.com/"

const config = null

const generateLighthouseScoreMap = async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags })
  opts.port = chrome.port
  const results = await lighthouse(url, opts, config)
  // use results.lhr for the JS-consumeable output
  // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
  // use results.report for the HTML/JSON/CSV output as a string
  // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
  await chrome.kill()
  const { lhr } = results
  const { categories } = lhr
  const scoreMap = {}
  Object.keys(categories).forEach((categoryName) => {
    scoreMap[categoryName] = categories[categoryName].score
  })
  return scoreMap
}

exports.generateLighthouseScoreMap = generateLighthouseScoreMap

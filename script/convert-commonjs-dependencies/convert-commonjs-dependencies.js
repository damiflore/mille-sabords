const { convertFilesFromCommonJsToModule } = require("@jsenv/commonjs-converter")

const reactPath = require.resolve("react")
const reactDOMPath = require.resolve("react-dom")

convertFilesFromCommonJsToModule({
  [reactPath]: {
    outputPath: `${reactPath}.esm.js`,
    convertNodeBuiltinsToBrowser: true,
    convertNodeGlobalsToAgnosticGlobals: true,
    replaceMap: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  },
  [reactDOMPath]: {
    outputPath: `${reactDOMPath}.esm.js`,
    convertNodeBuiltinsToBrowser: true,
    convertNodeGlobalsToAgnosticGlobals: true,
    replaceMap: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  },
})

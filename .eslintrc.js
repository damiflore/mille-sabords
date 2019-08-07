const { createConfig } = require("@jsenv/eslint-config")

const config = createConfig()
config.rules["import/no-absolute-path"] = ["off"]
config.settings["import/resolver"] = {
  [`${__dirname}/node_modules/@jsenv/eslint-import-resolver/dist/commonjs/main.js`]: {
    projectPath: __dirname,
  },
}
config.parserOptions.ecmaFeatures.jsx = true
config.plugins.push("react")
config.settings.react = {
  pragma: "createElement",
}
config.extends = ["plugin:react/recommended"]
Object.assign(config.rules, {
  "react/prop-types": ["off"],
  "react/jsx-no-target-blank": ["off"],
})

module.exports = config

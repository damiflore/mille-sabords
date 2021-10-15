/*
 * This file configure the list of babel plugins enabled
 * in this codebase
 *
 * Read more at https://github.com/jsenv/jsenv-core/tree/master/packages/jsenv-babel-preset
 */

module.exports = {
  presets: ["@jsenv/babel-preset"],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        pragma: "React.createElement",
        pragmaFrag: "React.Fragment",
      },
    ],
  ],
}

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        // no need to specify targets, it is handled by runtimeSupport in jsenv.config.mjs
      },
    ],
  ],
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

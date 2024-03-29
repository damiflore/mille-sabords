/*
 * This file uses "@jsenv/eslint-config" to configure ESLint
 * https://github.com/jsenv/jsenv-core/tree/main/packages/eslint-config
 */

const {
  composeEslintConfig,
  eslintConfigBase,
  eslintConfigForPrettier,
  eslintConfigToPreferExplicitGlobals,
  jsenvEslintRules,
  jsenvEslintRulesForImport,
  jsenvEslintRulesForReact,
} = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(
  eslintConfigBase,

  // By default files are meant to be executed in Node.js
  // and we want to tell this to ESLint.
  // As a result ESLint can consider `window` as undefined
  // and `global` as an existing global variable.
  {
    env: {
      node: true,
    },
  },

  // enable top level await
  {
    parserOptions: {
      ecmaVersion: 2022,
    },
  },

  // use "@babel/eslint-parser" until import assertions is supported natively by ESLint
  {
    parser: "@babel/eslint-parser",
    parserOptions: {
      requireConfigFile: false,
    },
  },

  // Reuse jsenv eslint rules
  {
    rules: {
      ...jsenvEslintRules,
    },
  },

  // Enable import plugin
  {
    plugins: ["import"],
    settings: {
      "import/resolver": {
        "@jsenv/eslint-import-resolver": {
          rootDirectoryUrl: __dirname,
          packageConditions: ["node", "import"],
        },
      },
    },
    rules: jsenvEslintRulesForImport,
  },

  // react
  {
    plugins: ["react"],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...jsenvEslintRulesForReact,
      "react/jsx-filename-extension": [
        "error",
        { extensions: [".jsx", ".html"] },
      ],
    },
  },

  // jsx
  {
    parser: "@babel/eslint-parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      extensions: [".jsx"],
    },
  },

  // Enable HTML plugin
  {
    plugins: ["html"],
    settings: {
      extensions: [".html"],
    },
  },

  // Configure which files are written for the web
  {
    overrides: [
      {
        files: [
          // prettier-ignore
          "./src/**",
          "./docs/**/src/**",
        ],
        env: {
          browser: true,
          node: false,
        },
        settings: {
          "import/resolver": {
            "@jsenv/eslint-import-resolver": {
              rootDirectoryUrl: `${__dirname}/src/`,
              packageConditions: ["browser", "import"],
            },
          },
        },
      },
    ],
  },

  // package is "type": "module" so:
  // 1. disable commonjs globals by default
  // 2. Re-enable commonjs into *.cjs files
  {
    globals: {
      __filename: "off",
      __dirname: "off",
      require: "off",
      exports: "off",
    },
    overrides: [
      {
        files: ["**/*.cjs"],
        env: {
          commonjs: true,
        },
        // inside *.cjs files. restore commonJS "globals"
        globals: {
          __filename: true,
          __dirname: true,
          require: true,
          exports: true,
        },
        // inside *.cjs files, use commonjs module resolution
        settings: {
          "import/resolver": {
            "@jsenv/eslint-import-resolver": {
              rootDirectoryUrl: __dirname,
              packageConditions: ["node", "require"],
            },
          },
        },
      },
    ],
  },

  eslintConfigToPreferExplicitGlobals,

  // We are using prettier, disable all eslint rules
  // already handled by prettier.
  eslintConfigForPrettier,
)

module.exports = eslintConfig

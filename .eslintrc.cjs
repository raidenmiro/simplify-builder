const { presets, configure } = require("eslint-kit");

module.exports = configure({
  presets: [
    presets.imports({ sort: { newline: true } }),
    presets.typescript(),
    presets.prettier(),
    presets.node(),
    presets.react({ newJSXTransform: true }),
  ],
  extend: {
    extends: ["plugin:@reatom/recommended"],
    plugins: ["@reatom"],
    rules: {
      "@reatom/atom-rule": "error",
      "@reatom/action-rule": "error",
      "@reatom/reatom-prefix-rule": "error",
      "@reatom/atom-postfix-rule": "off",
      "no-void": "off",
      "no-param-reassign": "off",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
});

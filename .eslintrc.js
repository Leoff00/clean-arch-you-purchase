module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "off",
    "prefer-const": ["off", { allow: "let" }],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": [
      "error",
      { allow: ["functions", "arrowFunctions"] },
    ],
    "no-use-before-define": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "off",
      { allowTypedFunctionExpressions: true },
    ],
  },
};

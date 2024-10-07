/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@demo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
}

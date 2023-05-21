module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    '@antfu',
    'plugin:vue/vue3-recommended',
    './.eslintrc-auto-import.json',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [],
  rules: {
    '@typescript-eslint/semi': [
      'error',
      'always',
    ],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [
          'index',
        ],
      },
    ],
  },
  globals: {
    GIT_BRANCH: true,
    GIT_VERSION: true,
    GIT_COMMITHASH: true,
    GIT_LASTCOMMITDATETIME: true,
  },
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    '@unocss',
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
    'vue/valid-attribute-name': 'off',
    'no-console': 'off',
  },
  globals: {
    GIT_BRANCH: true,
    GIT_VERSION: true,
    GIT_COMMITHASH: true,
    GIT_LASTCOMMITDATETIME: true,
  },
};

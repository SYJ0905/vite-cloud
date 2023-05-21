module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-rational-order',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'no-empty-source': null,
  },
};

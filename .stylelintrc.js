module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  plugins: ['stylelint-order'],
  configBasedir: '.',
  rules: {
    'selector-pseudo-class-no-unknown': null,
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': '^[a-z][a-zA-Z0-9--]+$',
    'custom-property-pattern': '^[a-z][a-zA-Z0-9--]+$',
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['token', 'map-tokens', 'map-breakpoints'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['each'],
      },
    ],
  },
};

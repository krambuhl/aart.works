module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
  plugins: ["stylelint-order"],
  configBasedir: ".",
  rules: {
    "selector-pseudo-class-no-unknown": null,
    "order/properties-alphabetical-order": true,
    "selector-class-pattern": "^[a-z][a-zA-Z0-9]+$",
  },
};

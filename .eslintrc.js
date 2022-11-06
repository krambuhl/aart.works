module.exports = {
  extends: ["next", "prettier"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: ["type", ["builtin", "external"], ["internal"]],
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/no-anonymous-default-export": [2, { allowObject: true }],
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
  },
};

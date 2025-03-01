module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'block-spacing': ['error', 'always'],
    'no-trailing-spaces': ['error'],
    'no-multi-spaces': ['error'],
    'padded-blocks': ['error', 'never'],
    // 'newline-before-return': 'error',w
    'comma-dangle': ['error', 'always-multiline'],
    curly: ['error', 'all'],
    'brace-style': 'error',
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'default-case': ['error'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['type', ['builtin', 'external'], ['internal']],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-anonymous-default-export': [2, { allowObject: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
  },
};

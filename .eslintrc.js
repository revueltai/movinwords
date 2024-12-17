module.exports = {
  rules: {
    'no-multiple-empty-lines': [
      'error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }
    ],
    'curly': 'off',
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    '@typescript-eslint/brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    'operator-linebreak': [
      'error',
      'after',
      {
        overrides: {
          '?': 'ignore',
          ':': 'ignore',
        },
      },
    ],
  },
}

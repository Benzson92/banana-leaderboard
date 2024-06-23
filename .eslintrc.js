// https://docs.expo.dev/guides/using-eslint/
// https://prettier.io/docs/en/integrating-with-linters.html

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'expo',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'prettier',
    'react',
    'react-hooks',
    'react-native',
    '@typescript-eslint',
    'jest',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'no-console': [1, { allow: ['warn', 'error'] }],
    'react-native/no-color-literals': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jest/valid-title': [
      'error',
      {
        ignoreSpaces: true,
      },
    ],
  },
};

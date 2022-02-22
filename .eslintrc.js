module.exports = {
  env: { browser: true, es6: true, jest: true, node: true },
  extends: [
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:typescript-sort-keys/recommended',
    'standard',
    'prettier'
  ],
  ignorePatterns: ['*.json'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module', warnOnUnsupportedTypeScriptVersion: false },
  plugins: ['@typescript-eslint', 'sort-destructure-keys', 'sort-imports-es6-autofix', 'sort-keys-fix', 'typescript-sort-keys'],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'multiline-ternary': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'node/no-callback-literal': 'off',
    'prettier/prettier': ['error', { arrowParens: 'avoid', endOfLine: 'lf', printWidth: 160, semi: false, singleQuote: true, trailingComma: 'none' }],
    'react/jsx-sort-default-props': ['error', { ignoreCase: false }],
    'react/jsx-sort-props': ['warn', { ignoreCase: false }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'sort-destructure-keys/sort-destructure-keys': ['warn', { caseSensitive: true }],
    'sort-imports-es6-autofix/sort-imports-es6': ['warn', { ignoreCase: false, ignoreMemberSort: false }],
    'sort-keys-fix/sort-keys-fix': 'warn'
  },
  settings: { react: { version: 'detect' } }
}

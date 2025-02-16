import { FlatCompat } from '@eslint/eslintrc'
import eslintJs from '@eslint/js'
import eslintPluginNext from '@next/eslint-plugin-next'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import path from 'node:path'
import url from 'node:url'
import typescriptEslint from 'typescript-eslint'

export default [
  eslintJs.configs.recommended,
  ...new FlatCompat({ baseDirectory: path.dirname(url.fileURLToPath(import.meta.url)) }).extends('eslint-config-standard'),
  eslintPluginPerfectionist.configs['recommended-natural'],
  eslintPluginReact.configs.flat.recommended,
  ...typescriptEslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      '@next/next': eslintPluginNext,
      'react-hooks': eslintPluginReactHooks
    },
    rules: {
      '@typescript-eslint/line-comment-position': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'line-comment-position': 'off',
      'perfectionist/sort-imports': ['error', { newlinesBetween: 'never' }],
      'prettier/prettier': ['error', { arrowParens: 'avoid', endOfLine: 'lf', printWidth: 160, semi: false, singleQuote: true, trailingComma: 'none' }],
      'react/react-in-jsx-scope': 'off',
      ...eslintPluginNext.configs.recommended.rules,
      '@next/next/no-img-element': 'off',
      ...eslintPluginReactHooks.configs.recommended.rules
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    ignores: ['.next', 'util/answers.ts', 'util/boards.ts']
  }
]

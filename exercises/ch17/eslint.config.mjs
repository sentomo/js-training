import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import google from 'eslint-config-google';
import jsdocPlugin from 'eslint-plugin-jsdoc';

/** @type {import('eslint').Linter.Config[]} */
export default [
  google,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
      jsdoc: jsdocPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      // 'require-jsdoc': 'off',
      'jsdoc/valid-jsdoc': [
        'error',
        {
          requireReturn: false,
          requireParamDescription: false,
        },
      ],
    },
  },
  {
    languageOptions: {
      parser: tsParser, // TypeScript 用のパーサーを指定
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];

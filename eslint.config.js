import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import prettierPlugin from 'eslint-plugin-prettier'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...reactPlugin.configs.recommended,
  ...reactHooks.configs.recommended,
  prettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prettier': prettierPlugin,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
      // Add any custom rules here
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
)

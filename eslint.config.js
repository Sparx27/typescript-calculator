import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';
const { configs } = plugin

/** @type {import('@eslint/js').FlatConfig[]} */
export default [
  {
    files: ['**/*.ts'],
    ignores: ['node_modules', 'build'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module'
      },
      ecmaVersion: 2020
    },
    plugins: {
      '@typescript-eslint': plugin
    },
    rules: {
      ...configs.recommended.rules,
      ...configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 1,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      'no-case-declarations': 'off',
      "indent": ["error", 2, { "SwitchCase": 1 }],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'space-before-function-paren': ['error', 'never'],
      'no-trailing-spaces': ['warn'],
    },
  }
];
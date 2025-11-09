import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const baseConfig = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    name: 'monorepo/base',
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: ['**/dist/**', '**/build/**', '**/node_modules/**'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd()
      }
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
  }
);

export default baseConfig;

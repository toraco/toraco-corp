import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores([
    '**/node_modules/*',
    '**/.next/*',
    '**/.open-next/*',
    '**/.wrangler/*',
    '**/dist/*',
    '**/*.config.{js,mjs,ts}',
    '**/next-env.d.ts',
    '**/cloudflare-env.d.ts',
  ]),
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    // shadcn/ui のプリミティブは外部生成のため一部 hooks ルールを緩める
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  prettier,
]);

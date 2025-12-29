import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules/**', '.next/**', 'dist/**', 'eslint.config.mjs', 'next-env.d.ts'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/no-array-delete': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.{tsx,jsx}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'inline-type-imports',
        },
      ],
    },
  },
  ...compat.extends('plugin:import/recommended', 'plugin:import/typescript'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/first': 'error',
      'import/newline-after-import': [
        'error',
        {
          count: 1,
        },
      ],
      'import/no-duplicates': [
        'error',
        {
          'prefer-inline': true,
        },
      ],
      'import/no-named-as-default-member': 'warn',
      'import/no-named-as-default': 'off',
    },
    settings: {
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
  perfectionist.configs['recommended-natural'],
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          order: 'asc',
          type: 'natural',
          internalPattern: ['^@/', '^@svgs/'],
          newlinesBetween: 'always',
          groups: [
            'type-import',
            ['value-builtin', 'value-external'],
            'type-internal',
            'value-internal',
            ['type-parent', 'type-sibling', 'type-index'],
            ['value-parent', 'value-sibling', 'value-index'],
            'ts-equals-import',
            'unknown',
          ],
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        (() => {
          const keywords = [
            // 1. React 특별 prop
            'key',

            // 2. 식별자 & 참조
            'id',
            'ref',

            // 3. 접근성
            'role',

            // 4. 컴포넌트 타입 & 네비게이션
            'as',
            'to',
            'href',
            'rel',
            'target',

            // 5. 리소스 (미디어)
            'src',
            'alt',
            'loading',

            // 6. 미디어 컨트롤
            'controls',
            'autoPlay',
            'loop',
            'muted',

            // 7. 폼 기본 속성
            'type',
            'name',

            // 8. 폼 값
            'value',
            'defaultValue',
            'checked',
            'defaultChecked',

            // 9. UI 텍스트
            'title',
            'placeholder',

            // 10. 폼 상태 & 제약조건
            'disabled',
            'required',
            'readOnly',

            // 11. 자동화
            'autoComplete',
            'autoFocus',

            // 12. 범위 & 길이 제한
            'step',
            'min',
            'max',
            'minLength',
            'maxLength',

            // 13. UI 상태
            'open',
            'active',
            'selected',

            // 14. 스타일
            'width',
            'height',

            // 15. 컨텐츠
            'children',
          ];

          return {
            type: 'natural',
            order: 'asc',
            groups: [...keywords, 'unknown', 'aria', 'data', 'callback', 'className'],
            customGroups: [
              ...keywords.map((keyword) => ({
                groupName: keyword,
                elementNamePattern: `^${keyword}$`,
              })),
              {
                groupName: 'aria',
                elementNamePattern: '^aria-.+',
              },
              {
                groupName: 'data',
                elementNamePattern: '^data-.+',
              },
              {
                groupName: 'callback',
                elementNamePattern: '^on.+',
              },
              {
                groupName: 'className',
                elementNamePattern: '^className$',
              },
            ],
          };
        })(),
      ],
      'perfectionist/sort-modules': 'off',
    },
  },
  eslintConfigPrettier,
];

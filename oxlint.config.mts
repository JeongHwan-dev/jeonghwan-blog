import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: [
    'typescript',
    'react',
    'react-perf',
    'unicorn',
    'import',
    'jsx-a11y',
    'nextjs',
    'promise',
    'node',
    'oxc',
  ],
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    perf: 'warn',
  },
  rules: {
    'eslint/no-underscore-dangle': 'off',
    'import/no-unassigned-import': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-perf/jsx-no-jsx-as-prop': 'off',
    'react-perf/jsx-no-new-object-as-prop': 'off',
    'react-perf/jsx-no-new-function-as-prop': 'off',
  },
});

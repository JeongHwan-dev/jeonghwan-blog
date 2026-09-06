import { defineConfig } from 'oxfmt';

export default defineConfig({
  printWidth: 100,
  singleQuote: true,
  sortPackageJson: false,
  ignorePatterns: ['**/*.md'],
  sortImports: {
    groups: [
      'builtin',
      'framework',
      'external',
      ['internal', 'subpath'],
      { newlinesBetween: false },
      ['parent', 'sibling', 'index', 'style', 'side_effect', 'side_effect_style', 'unknown'],
    ],
    customGroups: [
      {
        groupName: 'framework',
        elementNamePattern: ['react', 'react-dom', 'next', 'next/*', '@next/**'],
      },
    ],
    internalPattern: ['@/', '#/'],
    newlinesBetween: true,
  },
  sortTailwindcss: {
    attributes: ['classList'],
    functions: ['clsx', 'cn', 'cva', 'tv'],
  },
  overrides: [
    {
      files: ['**/*.css'],
      options: {
        singleQuote: false,
      },
    },
  ],
});

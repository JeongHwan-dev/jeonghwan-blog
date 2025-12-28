module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          {
            release: 'major',
            type: 'breaking',
          },
          {
            release: 'minor',
            type: 'feat',
          },
          {
            release: 'patch',
            type: 'fix',
          },
          {
            release: 'patch',
            type: 'hotfix',
          },
          {
            release: 'patch',
            type: 'perf',
          },
          {
            release: 'patch',
            type: 'revert',
          },
          {
            release: 'patch',
            type: 'docs',
          },
          {
            release: false,
            type: 'style',
          },
          {
            release: 'patch',
            type: 'refactor',
          },
          {
            release: false,
            type: 'test',
          },
          {
            release: 'patch',
            type: 'chore',
          },
          {
            release: false,
            type: 'ci',
          },
          {
            release: 'patch',
            type: 'remove',
          },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            {
              section: '💥 Breaking Changes',
              type: 'breaking',
            },
            {
              section: '✨ Features',
              type: 'feat',
            },
            {
              section: '🐛 Bug Fixes',
              type: 'fix',
            },
            {
              section: '🚑 Hotfixes',
              type: 'hotfix',
            },
            {
              section: '⚡️ Performance Improvements',
              type: 'perf',
            },
            {
              section: '⏪️ Reverts',
              type: 'revert',
            },
            {
              section: '📝 Documentation',
              type: 'docs',
            },
            {
              section: '💄 Styles',
              type: 'style',
            },
            {
              section: '♻️ Code Refactoring',
              type: 'refactor',
            },
            {
              section: '✅ Tests',
              type: 'test',
            },
            {
              section: '🔧 Miscellaneous Chores',
              type: 'chore',
            },
            {
              section: '👷 CI',
              type: 'ci',
            },
            {
              section: '🗑️ Removals',
              type: 'remove',
            },
          ],
        },
      },
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
};

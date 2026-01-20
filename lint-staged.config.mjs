/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
import { spawnSync } from 'node:child_process';

export default {
  '*': [
    () => {
      const { error, status } = spawnSync('gitleaks', ['version'], {
        stdio: 'ignore',
      });

      if (error || status !== 0) {
        console.error('\n❌ gitleaks가 설치되어 있지 않습니다. 계속하려면 설치해 주세요:\n');
        console.error('  macOS: brew install gitleaks');
        console.error('  Linux: https://github.com/gitleaks/gitleaks#installation 참조');
        console.error('  Windows: choco install gitleaks\n');

        throw error || new Error('gitleaks가 설치되어 있지 않습니다.');
      }

      return 'gitleaks protect --staged --redact';
    },
  ],
  '*.{js,jsx,mjs,ts,tsx,mts}': ['pnpm check:fix'],
  '*.{json,css,md}': ['pnpm format:fix'],
};

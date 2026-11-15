import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  exclude: ['exports', 'nsExports', 'types', 'nsTypes', 'enumMembers', 'duplicates'],
  ignoreBinaries: ['gitleaks'],
};

export default config;

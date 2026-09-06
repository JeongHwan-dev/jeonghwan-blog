import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // 미사용 의존성과 미사용 파일만 검사해요.
  // 미사용 export/type은 shadcn 기반 UI 프리미티브(Card, Drawer, Select 등)가
  // 의도적으로 전체 API를 내보내는 구조라서 노이즈만 나와 제외했어요.
  exclude: ['exports', 'nsExports', 'types', 'nsTypes', 'enumMembers', 'duplicates'],
  ignoreDependencies: [
    // next.config.ts의 webpack 규칙에 문자열로만 등장해요. (author-avatar.tsx의 .svg import가 이걸 거쳐요)
    '@svgr/webpack',
    // .releaserc.js의 preset: 'conventionalcommits' 문자열로만 참조돼요.
    'conventional-changelog-conventionalcommits',
  ],
  ignoreBinaries: [
    // lint-staged.config.mjs에서 실행하는 시스템 바이너리예요. (brew install gitleaks)
    'gitleaks',
  ],
};

export default config;

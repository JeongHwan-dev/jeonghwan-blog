/**
 * 라벨 정의 단일 소스
 *
 * 이 파일을 수정하면 다음 파일들이 자동으로 동기화돼요:
 * - .github/labels.json (github-label-sync용)
 * - .github/labeler.yml (GitHub Actions labeler용)
 * - commitizen.config.mjs (커밋 타입 선택 목록)
 *
 * 자동 동기화: PR에서 이 파일이 변경되면 GitHub Actions가 자동으로 연관 파일들을 업데이트하고 커밋을 추가해요.
 */

export const LABELS = [
  {
    color: '#FFD700',
    description: '새로운 기능 추가 및 변경',
    emoji: '✨',
    isCommitType: true,
    value: 'feat',
  },
  {
    color: '#FF6B6B',
    description: '버그 수정',
    emoji: '🐛',
    isCommitType: true,
    value: 'fix',
  },
  {
    color: '#FF4444',
    description: '긴급 수정',
    emoji: '🚑',
    isCommitType: true,
    value: 'hotfix',
  },
  {
    color: '#C40948',
    description: '호환성에 영향을 주는 변경',
    emoji: '💥',
    isCommitType: true,
    value: 'breaking',
  },
  {
    color: '#FDB813',
    description: '성능 개선',
    emoji: '⚡',
    isCommitType: true,
    value: 'perf',
  },
  {
    color: '#2ECC71',
    description: '코드 리팩토링',
    emoji: '♻️',
    isCommitType: true,
    value: 'refactor',
  },
  {
    color: '#4169E1',
    description: '문서 수정',
    emoji: '📝',
    isCommitType: true,
    value: 'docs',
  },
  {
    color: '#00FF00',
    description: '테스트 코드 추가 및 수정',
    emoji: '✅',
    isCommitType: true,
    value: 'test',
  },
  {
    color: '#FF69B4',
    description: '코드 스타일 수정',
    emoji: '💄',
    isCommitType: true,
    value: 'style',
  },
  {
    color: '#808080',
    description: '빌드, 패키지 업데이트 등 기능 변경 없는 작업',
    emoji: '🔧',
    isCommitType: true,
    value: 'chore',
  },
  {
    color: '#FF8C00',
    description: 'CI/CD 관련 설정 변경',
    emoji: '👷',
    isCommitType: true,
    value: 'ci',
  },
  {
    color: '#FF7F50',
    description: '사용하지 않는 코드 혹은 파일 삭제',
    emoji: '🗑️',
    isCommitType: true,
    value: 'remove',
  },
  {
    color: '#9370DB',
    description: '이전 커밋을 되돌릴 때',
    emoji: '⏪',
    isCommitType: true,
    value: 'revert',
  },
  {
    color: '#8DE08B',
    description: '배포 준비 PR',
    emoji: '🚀',
    isCommitType: false,
    value: 'release',
  },
  {
    color: '#EDEDED',
    description: '배포 완료된 PR',
    emoji: '🏷️',
    isCommitType: false,
    value: 'released',
  },
];

const MAX_COMMIT_MESSAGE_LENGTH = 100;

const MAX_SCOPE_LENGTH = 50;

const COMMIT_TYPE_LIST = [
  {
    description: '새로운 기능 추가 및 변경',
    value: 'feat',
  },
  {
    description: '버그 수정',
    value: 'fix',
  },
  {
    description: '긴급 수정',
    value: 'hotfix',
  },
  {
    description: '사용하지 않는 코드 혹은 파일 삭제',
    value: 'remove',
  },
  {
    description: '코드 스타일 수정(코드 포맷, 세미콜론 추가 및 삭제 등)',
    value: 'style',
  },
  {
    description: '코드 리팩토링(기능 변경 없이 코드 구조 개선)',
    value: 'refactor',
  },
  {
    description: '성능 개선',
    value: 'perf',
  },
  {
    description: '빌드, 패키지 업데이트, CI 설정 등 코드 변경 없는 작업',
    value: 'chore',
  },
  {
    description: 'CI/CD 관련 설정 변경',
    value: 'ci',
  },
  {
    description: '테스트 코드 추가 및 수정',
    value: 'test',
  },
  {
    description: '이전 커밋을 되돌릴 때',
    value: 'revert',
  },
  {
    description: '문서 수정(README, 주석 등)',
    value: 'docs',
  },
  {
    description: '호환성에 영향을 주는 변경 (Major 버전 업)',
    value: 'breaking',
  },
];

const COMMIT_QUESTION_LIST = [
  {
    choices: COMMIT_TYPE_LIST.map(({ description, value }) => ({
      name: `${value.padEnd(8, ' ')}: ${description}`,
      value,
    })),
    message: '1️⃣ 커밋 유형을 선택하세요:',
    name: 'type',
    type: 'list',
  },
  {
    message: '2️⃣ 커밋 scope를 입력하세요:',
    name: 'scope',
    type: 'input',
    validate: (input) => {
      const trimmedScopeLength = input.trim().length;

      if (trimmedScopeLength === 0) {
        return 'scope는 필수입니다.';
      }

      if (trimmedScopeLength > MAX_SCOPE_LENGTH) {
        return `scope는 ${MAX_SCOPE_LENGTH}자 이하여야 해요.`;
      }

      return true;
    },
  },
  {
    message: '3️⃣ 커밋 메시지를 입력하세요:',
    name: 'subject',
    type: 'input',
    validate: (input) => input.length > 0 && input.length <= MAX_COMMIT_MESSAGE_LENGTH,
  },
  {
    message: '4️⃣ 커밋 description을 입력하세요 (선택사항, Enter로 건너뛰기):',
    name: 'description',
    type: 'input',
  },
];

module.exports = {
  prompter: (cz, commit) => {
    cz.prompt(COMMIT_QUESTION_LIST).then(({ description, scope, subject, type }) => {
      const trimmedScope = scope.trim();
      const trimmedDescription = description?.trim();
      const baseCommitMessage = `${type}(${trimmedScope}): ${subject}`;
      const commitMessage =
        trimmedDescription?.length > 0
          ? `${baseCommitMessage}\n\n${trimmedDescription}`
          : baseCommitMessage;
      const divider = '-'.repeat(50);

      cz.prompt([
        {
          default: true,
          message: `✅ 커밋 메시지가 아래와 같아요. 커밋을 진행할까요?\n${divider}\n${commitMessage}\n${divider}\n`,
          name: 'confirmCommit',
          type: 'confirm',
        },
      ]).then(({ confirmCommit }) => {
        if (confirmCommit) {
          commit(commitMessage);

          return;
        }

        console.log('❌ 커밋이 취소되었어요.');
      });
    });
  },
};

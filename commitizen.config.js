const MAX_COMMIT_MESSAGE_LENGTH = 100;

const COMMIT_TYPE_LIST = [
  {
    value: 'feat',
    description: '새로운 기능 추가 및 변경',
  },
  {
    value: 'fix',
    description: '버그 수정',
  },
  {
    value: 'hotfix',
    description: '긴급 수정',
  },
  {
    value: 'remove',
    description: '사용하지 않는 코드 혹은 파일 삭제',
  },
  {
    value: 'style',
    description: '코드 스타일 수정(코드 포맷, 세미콜론 추가 및 삭제 등)',
  },
  {
    value: 'refactor',
    description: '코드 리팩토링(기능 변경 없이 코드 구조 개선)',
  },
  {
    value: 'perf',
    description: '성능 개선',
  },
  {
    value: 'chore',
    description: '빌드, 패키지 업데이트, CI 설정 등 코드 변경 없는 작업',
  },
  {
    value: 'ci',
    description: 'CI/CD 관련 설정 변경',
  },
  {
    value: 'test',
    description: '테스트 코드 추가 및 수정',
  },
  {
    value: 'revert',
    description: '이전 커밋을 되돌릴 때',
  },
  {
    value: 'docs',
    description: '문서 수정(README, 주석 등)',
  },
];

const COMMIT_QUESTION_LIST = [
  {
    type: 'list',
    name: 'type',
    message: '1️⃣ 커밋 유형을 선택하세요:',
    choices: COMMIT_TYPE_LIST.map(({ value, description }) => ({
      value,
      name: `${value.padEnd(8, ' ')}: ${description}`,
    })),
  },
  {
    type: 'input',
    name: 'subject',
    message: '2️⃣ 커밋 메시지를 입력하세요:',
    validate: (input) =>
      input.length > 0 && input.length <= MAX_COMMIT_MESSAGE_LENGTH,
  },
];

module.exports = {
  prompter: (cz, commit) => {
    cz.prompt(COMMIT_QUESTION_LIST).then(({ type, subject }) => {
      const commitMessage = `${type}: ${subject}`;
      const divider = '-'.repeat(50);

      cz.prompt([
        {
          type: 'confirm',
          name: 'confirmCommit',
          message: `✅ 커밋 메시지가 아래와 같아요. 커밋을 진행할까요?\n${divider}\n${commitMessage}\n${divider}\n`,
          default: true,
        },
      ]).then(({ confirmCommit }) => {
        if (confirmCommit) {
          commit(commitMessage);

          return;
        }

        console.log('❌ 커밋이 취소되었습니다.');
      });
    });
  },
};

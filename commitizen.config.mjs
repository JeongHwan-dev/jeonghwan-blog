import { LABELS } from './.github/labels.config.mjs';

const MAX_COMMIT_MESSAGE_LENGTH = 100;

const MAX_SCOPE_LENGTH = 50;

const getCommitTypes = () => {
  return Object.freeze(
    LABELS.filter(({ isCommitType }) => isCommitType).map(({ description, emoji, value }) => ({
      description,
      emoji,
      value,
    })),
  );
};

const commitTypes = getCommitTypes();

const getCommitTypeChoices = (commitTypes) => {
  return Object.freeze(
    commitTypes.map(({ description, emoji, value }) => ({
      name: `${emoji} ${value.padEnd(10, ' ')}: ${description}`,
      value,
    })),
  );
};

const commitTypeChoices = getCommitTypeChoices(commitTypes);

const COMMIT_QUESTION_LIST = [
  {
    choices: commitTypeChoices,
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

const config = {
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

export default config;

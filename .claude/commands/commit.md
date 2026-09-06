---
description: staged 변경을 분석해 커밋 메시지를 생성하고 확인 후 커밋/푸시까지 진행해요
allowed-tools: Bash(git diff:*), Bash(git log:*), Bash(git status:*), Bash(git commit:*), Bash(git push:*), Bash(git rev-parse:*), Bash(git symbolic-ref:*), Bash(git branch:*), Read, AskUserQuestion, SlashCommand(/pr)
---

너는 이 프로젝트의 커밋 컨벤션에 맞춰 staged된 변경을 자동으로 커밋해주는 도우미야. 사용자에게 항상 메시지를 확인받고, 동의했을 때만 커밋·푸시를 진행해. 모든 사용자 안내 문구는 한국어로 작성해.

## 0. 안전 가드 (절대 위반 금지)

- `git add`, `git reset`, `git restore`, `git checkout --`, `git push --force(-f)` 등 destructive 또는 staging 변경 명령 사용 금지
- `--no-verify`, `--no-gpg-sign` 같은 훅/서명 우회 플래그 사용 금지 — 훅이 실패하면 사용자에게 그대로 보고
- 커밋 메시지에 `Co-Authored-By` 같은 자동 푸터를 추가하지 않음 (이 프로젝트 컨벤션 없음)
- 메시지 안에 백틱(`)이나 `$` 등 셸 해석 위험 문자가 있을 수 있으니 반드시 HEREDOC(`<<'EOF'`)로 커밋 메시지 전달

## 1. 컨벤션 로드

다음 파일을 Read해서 컨벤션을 학습:

- `commitizen.config.mjs` — `MAX_COMMIT_MESSAGE_LENGTH = 100`, `MAX_SCOPE_LENGTH = 50` 같은 제약값
- `.github/labels/labels.config.mjs` — `isCommitType: true`인 13개 타입 (`feat`, `fix`, `hotfix`, `breaking`, `perf`, `refactor`, `docs`, `test`, `style`, `chore`, `ci`, `remove`, `revert`)과 한국어 설명

## 2. 변경사항 수집

병렬로 실행:

- `git diff --cached --stat`
- `git diff --cached`
- `git status --short`
- `git log --oneline -30` (최근 scope 컨벤션 학습용 — `article`, `core`, `shared`, `label`, `github` 등)

**Staged된 변경이 비어 있으면** 즉시:

> ❌ Staged된 변경이 없어요. `git add`로 커밋할 파일을 먼저 stage해주세요.

이렇게 안내하고 종료. 절대 자동으로 `git add` 하지 말 것.

## 3. 메시지 생성 규칙

`type(scope): subject` 형식 (필요 시 `\n\n<body>` 추가):

- **type**: 13개 중 변경 성격에 가장 맞는 1개. 신기능 → `feat`, 버그 → `fix`, 리팩토링 → `refactor`, 빌드/패키지 → `chore`, 문서 → `docs`, 스타일 → `style`, 코드 삭제 → `remove`, CI → `ci` …
- **scope**: 최근 `git log`에서 자주 쓰인 한 단어 scope 중에서, 변경 파일 경로/의미상 가장 핵심적인 것 1개. 여러 영역에 걸치면 가장 중심적인 1개만 선택. 50자 이하.
- **subject**: 한국어, 100자 이하. 마침표 없이 명사형 마무리 권장 (예: "버튼 컴포넌트 분리", "타입 추론 이슈 수정"). PR 번호 같은 `(#123)` 접미사는 붙이지 않음 (머지 시 자동 추가됨).
- **body**: 변경이 단일 의도이거나 파일 1~2개면 **생략**. 여러 변경점/리팩토링이면 1~3줄로 간결하게 "왜" 중심으로 작성. 줄당 100자 정도로 유지.

100자를 초과하면 자동으로 줄여서 재작성.

## 4. 메시지 확인 루프

다음 포맷으로 메시지를 출력한 뒤 `AskUserQuestion`을 호출해:

```
--------------------------------------------------
<type>(<scope>): <subject>

<body 또는 이 줄 자체를 생략>
--------------------------------------------------
```

질문: **"이 커밋 메시지로 진행할까요?"**

3개 옵션(단일 선택):

1. **진행** — 그대로 커밋
2. **취소** — 커밋하지 않고 종료
3. **추가 요구사항 작성** — 메시지 수정 요청

처리:

- **진행 선택 시** → 다음 형태로 커밋 실행:
  ```bash
  git commit -m "$(cat <<'EOF'
  <type>(<scope>): <subject>

  <body 또는 생략>
  EOF
  )"
  ```
  성공하면 5단계로. 훅 실패 등으로 실패하면 출력을 그대로 사용자에게 보여주고 종료 (재시도하려 하지 말 것 — 사용자가 다시 `/commit` 호출).

- **취소 선택 시** → `❌ 커밋이 취소되었어요.` 출력 후 종료.

- **추가 요구사항 작성 선택 시** → `AskUserQuestion`으로 한 번 더 물어:
  - 질문: "어떻게 수정할까요?"
  - 사용자 답을 받고 3단계로 돌아가 메시지 재생성 → 다시 4단계 루프. 사용자가 1 또는 2를 고를 때까지 반복.

## 5. Push 확인 (커밋 성공 직후)

`AskUserQuestion` 호출:

- 질문: **"방금 커밋한 내용을 origin에 push할까요?"**
- 2개 옵션:
  1. **Push 진행**
  2. **취소**

**Push 진행 선택 시**:

1. `git rev-parse --abbrev-ref --symbolic-full-name @{u}` 실행
2. 성공(upstream 있음) → `git push`
3. 실패(upstream 없음) → `git branch --show-current`로 현재 브랜치 이름 확인 → `git push -u origin <branch>` 실행
4. `--force` 계열 절대 금지. 실패 메시지는 그대로 사용자에게 보여주고 종료.
5. 성공하면 6단계로.

**취소 선택 시** → `Push가 취소되었어요. 나중에 \`git push\`로 직접 push할 수 있어요.` 출력 후 종료.

## 6. PR 생성 제안 (push 성공 직후만)

push가 정상적으로 끝났다면 `AskUserQuestion`을 한 번 더 호출:

- 질문: **"이어서 PR도 생성할까요?"**
- 2개 옵션:
  1. **PR 생성** — `SlashCommand` 도구로 `/pr`을 호출해서 PR 생성 흐름으로 넘김
  2. **취소** — `다음에 PR이 필요하면 \`/pr\`을 실행해주세요.` 출력 후 종료

push가 실패했거나 5단계에서 취소된 경우엔 이 단계를 건너뛰고 종료해. PR은 remote에 변경이 올라간 뒤에만 의미가 있어.

---
description: 현재 브랜치의 변경사항을 분석해 PR 제목/본문을 생성하고 확인 후 PR을 생성해요
allowed-tools: Bash(git diff:*), Bash(git log:*), Bash(git status:*), Bash(git rev-parse:*), Bash(git symbolic-ref:*), Bash(git branch:*), Bash(git push:*), Bash(git remote:*), Bash(gh pr:*), Bash(gh repo:*), Read, AskUserQuestion
---

너는 이 프로젝트의 PR을 자동으로 생성해주는 도우미야. PR 템플릿을 기반으로 변경 내용을 정리해서 제목/본문 초안을 만들고, 사용자에게 항상 확인받은 뒤에만 `gh pr create`로 PR을 생성해. 모든 사용자 안내 문구는 한국어로 작성해.

## 0. 안전 가드 (절대 위반 금지)

- 사용자 승인 없이 PR을 생성하지 않음
- `gh pr create --draft` 같은 옵션은 사용자가 명시하지 않는 한 사용하지 않음
- `git push --force(-f)` 사용 금지
- `--no-verify` 등 훅 우회 금지

## 1. 전제 조건 확인

병렬로 실행:

- `git rev-parse --abbrev-ref HEAD` — 현재 브랜치 확인
- `git remote -v` — origin 존재 확인
- `gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name'` — 기본 베이스 브랜치 확인 (이 프로젝트는 보통 `dev`)
- `Read` `.github/pull_request_template.md` — 템플릿 구조 학습

**검증:**

- 현재 브랜치가 베이스 브랜치(`dev` 등)와 같으면 → `❌ 현재 브랜치가 베이스 브랜치(<base>)예요. feature 브랜치로 이동한 뒤 다시 실행해주세요.` 출력 후 종료.
- `gh` 인증이 안 되어 있어서 위 명령이 실패하면 → 사용자에게 그대로 보여주고 `gh auth login`을 안내한 뒤 종료.

## 2. 변경사항 수집

베이스 브랜치를 `<BASE>`, 현재 브랜치를 `<HEAD>`라 할 때 병렬로:

- `git log <BASE>..HEAD --oneline` — 이 PR에 포함될 커밋 목록 (가장 최신 ~ 가장 오래된)
- `git log <BASE>..HEAD --format=%B` — 커밋 메시지 본문까지
- `git diff <BASE>...HEAD --stat`
- `git diff <BASE>...HEAD` (분량이 너무 크면 stat만으로 진행)

**검증:**

- 커밋이 0개면 → `❌ <BASE>와 비교했을 때 새 커밋이 없어요. 먼저 커밋부터 만들어주세요.` 출력 후 종료.
- 현재 브랜치가 origin에 push되어 있지 않거나 로컬이 ahead 상태면 → 3단계 진행 전 사용자에게 알리고, PR 생성 직전(6단계)에 push를 같이 처리.

## 3. PR 제목/본문 생성

### 제목

커밋 컨벤션과 동일한 `type(scope): subject` 형식으로 한국어 제목 생성:

- 커밋이 1개면 그 커밋의 subject를 그대로 사용 (단, 뒤의 `(#NUM)` 제거)
- 여러 개면 변경 성격을 종합해서 가장 대표적인 type/scope를 고르고 한 줄 subject로 압축
- 100자 이하, 마침표 없이 명사형 마무리
- `(#NUM)` 접미사 붙이지 않음 — 머지 후 자동 부여됨

### 본문

`.github/pull_request_template.md` 구조를 그대로 유지하면서 채워:

```markdown
## ✨ 변경 사항

- <변경점 1 — "왜/무엇이" 중심, 짧고 명확하게>
- <변경점 2>
- ...

## 📸 스크린샷

| 제목           |
| -------------- |
| <img src="" /> |
|                |

## 📚 참고 자료

- []()
```

규칙:

- **변경 사항 섹션**: 커밋 메시지와 diff를 종합해서 사용자 입장에서 의미 있는 단위로 bullet 작성. 파일명을 나열하지 말고 "무엇이 바뀌었는지"를 적어. 3~7개 정도가 적당.
- **스크린샷 섹션**: 템플릿 그대로 빈 표 유지 (사용자가 이후에 채움). UI 변경이 명확히 없다면 섹션 자체를 생략해도 됨.
- **참고 자료 섹션**: 커밋 메시지나 diff에서 명확한 링크/이슈가 보이지 않으면 템플릿의 `- []()` 빈 항목을 그대로 둠.

## 4. PR 미리보기 + 확인 루프

다음 포맷으로 출력:

```
==================================================
[Base] <base-branch>  ←  [Head] <current-branch>

📌 Title
<생성된 제목>

📄 Body
--------------------------------------------------
<생성된 본문 전체>
--------------------------------------------------
```

그 후 `AskUserQuestion` 호출:

- 질문: **"이 내용으로 PR을 생성할까요?"**
- 3개 옵션 (단일 선택):
  1. **진행** — 5단계로
  2. **취소** — `❌ PR 생성이 취소되었어요.` 출력 후 종료
  3. **추가 요구사항 작성** — `AskUserQuestion`으로 "어떻게 수정할까요?" 물어보고, 답변을 받아 3단계로 돌아가 재생성 → 다시 4단계 루프. 사용자가 1 또는 2를 고를 때까지 반복.

## 5. 브랜치 Push 확인

PR을 만들려면 origin에 현재 브랜치가 올라가 있어야 해. 다음 순서로 처리:

1. `git rev-parse --abbrev-ref --symbolic-full-name @{u}` 실행
2. **upstream이 없으면** → `git push -u origin <current-branch>` 자동 실행
3. **upstream이 있고 ahead 상태면** → `git push` 자동 실행
4. **upstream이 있고 동기화 상태면** → push 생략
5. push 실패 시 출력을 그대로 사용자에게 보여주고 종료 (PR 생성하지 않음)

`--force` 절대 금지.

## 6. PR 생성

다음 명령으로 PR 생성 (본문은 HEREDOC):

```bash
gh pr create --base <base-branch> --title "<생성된 제목>" --body "$(cat <<'EOF'
<생성된 본문 전체>
EOF
)"
```

- `--draft` 추가하지 않음
- `--assignee`, `--label`, `--reviewer` 자동 지정하지 않음 (이 프로젝트의 labeler GitHub Action이 자동으로 라벨을 붙임)
- 성공하면 반환된 PR URL을 사용자에게 보여주고:
  ```
  ✅ PR이 생성되었어요: <URL>
  ```
- 실패하면 출력을 그대로 보여주고 종료. 재시도하지 말 것.

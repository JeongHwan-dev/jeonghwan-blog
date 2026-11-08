---
"jeonghwan-blog": patch
---

Version PR 머지 후 `v{version}` 태그와 GitHub Release가 생성되지 않던 문제를 수정했어요. changesets/action v2는 `publish-script`가 없으면 publish 단계를 건너뛰어서, `pnpm changeset publish`를 명시했어요. 이 저장소는 private 패키지라 npm 배포 없이 태그만 만들어요.

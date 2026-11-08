## [1.6.1](https://github.com/JeongHwan-dev/jeonghwan-blog/compare/v1.6.0...v1.6.1) (2026-03-27)

### 🐛 Bug Fixes

* **article:** rehypePlugins 선언 순서 이슈 수정 ([#186](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/186)) ([05c7f1b](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/05c7f1bb9c215a2e75a7ce2969ddcc5eaba3dade))

## [1.6.0](https://github.com/JeongHwan-dev/jeonghwan-blog/compare/v1.5.1...v1.6.0) (2026-02-01)

### ✨ Features

* **article:** CustomMDX의 커스텀 컴포넌트에 YouTubePlayer 추가 ([#184](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/184)) ([86737e5](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/86737e5d247860b3753b0aaea51af6c3fc6c7a43))
* **shared:** AuthorAvatar 컴포넌트 사용 시 aria-hidden 활성화 ([#178](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/178)) ([a5f2cab](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/a5f2cabb4990f08e96107fc175828c6e4420edc4))

### ♻️ Code Refactoring

* **shared:** JeonghwanAvatar svg 파일 사용 코드를 AuthorAvatar 컴포넌트로 대체 ([#177](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/177)) ([d04e552](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/d04e552637f500f1af7fad53be62bf7067932373))
* **shared:** ScrollFloatingActionButtonGroup 컴포넌트에 ButtonGroup 컴포넌트 활용 ([#185](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/185)) ([8eab0fd](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/8eab0fd1a0a2861c511a35dd18b0c720af890ccc))

### 🔧 Miscellaneous Chores

* **biome:** biome에 Tailwind CSS class 선언 순서 규칙 추가 ([#179](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/179)) ([2d104db](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/2d104db75db17a04b18a004231e7cb13169b3fc7))
* **core:** ESLint 설정 및 패키지 삭제 ([#173](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/173)) ([98f4cd7](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/98f4cd756c3cc6200358b7b70478ad566c53d5c9))
* **core:** ESLint, Prettier를 Biome으로 마이그레이션 ([#172](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/172)) ([dc19eda](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/dc19eda762ecbd1992e5e109dabbe17585133997))
* **core:** lint-staged에 gitleaks 확인 로직 추가 ([#171](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/171)) ([db3af37](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/db3af37a7175ca0f7076698672f5fc04e6a93f78))
* **core:** Tailwind CSS Class Function VSCode 설정 추가 ([#174](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/174)) ([a68c653](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/a68c653d9ad906eb354dc8405610f3502fc0d43b))
* **github:** generate-label 스크립트의 import 경로 오타 수정 ([#181](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/181)) ([eb44c3d](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/eb44c3dbc1d864445c147995238df30a553a774e))
* **github:** generate-labels 스크립트의 labeler 생성 로직 수정 ([#183](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/183)) ([1d4daf2](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/1d4daf28d2238ebdc1ac139276a238b6497f2b9b))
* **label:** labels.config.mjs 업데이트에 따라 관련 파일 자동 동기화 ([e34483b](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/e34483b9b349aff1a5f80c593757373446a6947b))
* **label:** labels.config.mjs 업데이트에 따라 관련 파일 자동 동기화 ([a08e563](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/a08e56351e9f87e9bccc8411102744f7a96cc88d))
* **lint-staged:** lint-staged 설정에 CI 환경 시 스킵 로직 추가 ([#182](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/182)) ([15dcdd6](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/15dcdd6504ceb14b3e8b37f6816b75eb13a0a6a6))
* **tsconfig:** public 폴더 alias path 변경 ([#176](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/176)) ([518a709](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/518a709a7008507ec7fd86f0bb3ad760503b8de3))

### 👷 CI

* **core:** CI Workflow 추가 ([#175](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/175)) ([0185598](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/018559867246f1600e216cddeb47f5293f89315d))

## [1.5.1](https://github.com/JeongHwan-dev/jeonghwan-blog/compare/v1.5.0...v1.5.1) (2026-01-18)

### 📝 Documentation

* **core:** AI Skills 문서 추가 ([#169](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/169)) ([91f4634](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/91f463445297c21c4635a6bf58346cb1aa61e7a9))

### 🔧 Miscellaneous Chores

* **core:** 보안 취약 패키지 업데이트 ([#168](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/168)) ([d230808](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/d2308084cb572645ed1c29d1fe0f07095406f6fc))

## [1.5.0](https://github.com/JeongHwan-dev/jeonghwan-blog/compare/v1.4.0...v1.5.0) (2026-01-11)

### ✨ Features

* **article:** 아티클 조희 시 status 옵션에 Pre-Published 상태 로직 추가 ([#165](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/165)) ([cf24191](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/cf241911ba01761b01114d77d19aefc3cdc929e7))

### 🔧 Miscellaneous Chores

* **github:** main 브랜치 PR에 release 라벨 자동 적용 미동작 이슈 수정 ([#166](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/166)) ([f6ad7fb](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/f6ad7fbc80825ba991bd7498108da4aa785b949b))

## [1.4.0](https://github.com/JeongHwan-dev/jeonghwan-blog/compare/v1.3.1...v1.4.0) (2026-01-11)

### ✨ Features

* **author:** ProfileCard 웹 접근성 요소 개선 ([#163](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/163)) ([4d67aa5](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/4d67aa5bae05cab36a6b8a060a3f3795ae1a1f4e))

## [1.3.1](https://github.com/JeongHwan-dev/jeonghwan-blog/compare/v1.3.0...v1.3.1) (2026-01-11)

### ⚡️ Performance Improvements

* **article:** 아티클 목록 페이지의 무한 스크롤 prefetch 시점 개선 ([#160](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/160)) ([cb6426b](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/cb6426b44dd56f085d1ff3f91f3a00c808922ae6))

## [1.3.0](https://github.com/JeongHwan-dev/jeonghwan-blog/compare/v1.2.0...v1.3.0) (2026-01-11)

### ✨ Features

* **article:** ArticleCard 컴포넌트 웹 접근성 요소 개선 ([#157](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/157)) ([05f3ecd](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/05f3ecd8675f64bcc28bd89e41da25092ca9b3f2))
* **article:** 아티클 상세 페이지 웹 접근성 개선 ([#158](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/158)) ([2185e48](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/2185e48ecd45da7622258df7486200511651216d))

### 💄 Styles

* **article:** TableOfContentsLink 컴포넌트의 className 선언 형식 변경 ([#154](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/154)) ([31579ed](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/31579ed6d82beefd55c4dfc9682c000d975d2783))

### ♻️ Code Refactoring

* **author:** ProfileCard 컴포넌트 코드 개선 ([#155](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/155)) ([f20d430](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/f20d430c656c148e6cb46e819556564e9a324faa))

### 🔧 Miscellaneous Chores

* **package:** Node.js 요구 버전을 24로 업데이트 ([#156](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/156)) ([2b71fca](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/2b71fcad5059beb624a5795b0fa5227437dafbb0))

## [1.2.0](https://github.com/JeongHwan-dev/jeonghwan-blog/compare/v1.1.0...v1.2.0) (2026-01-04)

### ✨ Features

* **article:** TagFilterListSkeleton의 아이템 개수 변경 ([#152](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/152)) ([a91fae0](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/a91fae0fe997c0690d39ab97ad18a806b1588dfc))
* **article:** 블로그 글 상세 페이지 revalidate 타임 1시간으로 변경 ([#150](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/150)) ([dbbdb9a](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/dbbdb9a2da1726b4d8f767ed75274a7e0136024c))

### ♻️ Code Refactoring

* **article:** SortSelect 컴포넌트의 중복 코드 개선 ([#141](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/141)) ([713c2e8](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/713c2e850e394874ee0eae953de92871f71d390d))
* **article:** 무한스크롤 로직을 useInfiniteScroll 훅으로 추상화 ([#148](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/148)) ([04af3ee](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/04af3ee55473e66f8f946ba2be021a843e7709c5))
* **next.config:** compact 함수를 활용한 코드 개선 ([#151](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/151)) ([26445d1](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/26445d1e5d5f67aa9fd9d44319c57d38c587edbf))
* **repeat:** es-toolkit을 활용한 Repeat 컴포넌트 코드 개선 ([#149](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/149)) ([b4c40ae](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/b4c40ae0a1dbe718f2341ead8964f1434fc05f43))
* **shared:** renderTimes 유틸 함수를 Repeat 컴포넌트로 대체 ([#147](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/147)) ([16c5474](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/16c5474e68730e26da6a4cdd26156b90576bf10e))

### 🔧 Miscellaneous Chores

* **github:** 라벨 관련 파일을 .github/labels 폴더로 이동 ([#146](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/146)) ([c86ee72](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/c86ee72b4ef4180d64c179e6c6b8239a27ca5871))
* **label:** label 동기화 설정 ([#142](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/142)) ([bf6d71b](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/bf6d71b899af40749f84ea1fbdeee07291b59063))
* **package:** lint-staged 설정에 .mjs, .json, .md 파일 포맷팅 추가 ([#144](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/144)) ([3e5afa0](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/3e5afa0f140b361dc449c5dc70b5da1b8a20db84))
* **releaserc:** 배포 완료 라벨을 🏷️ released로 변경 ([#143](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/143)) ([a743ef6](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/a743ef6e893ece1a8abd12994b2b1861f0b6816d))
* **workflows:** PR 관련 workflow 파일명을 auto-pr- 패턴으로 통일 ([#145](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/145)) ([060a909](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/060a909e2855bd1f2bf31e7a3a886c606db53c8f))

## [1.1.0](https://github.com/JeongHwan-dev/jeonghwan-blog/compare/v1.0.15...v1.1.0) (2025-12-29)

### ✨ Features

* ArticleCardSkeleton 컴포넌트 스타일 수정 ([#129](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/129)) ([0a32366](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/0a32366b8e06b854631b1259dde431e42d0f72a8))

### 📝 Documentation

* Cursor Rules 파일 정리 및 최적화 ([#137](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/137)) ([16934e1](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/16934e166d0cc692f87cb173d3c765906bd82915))

### 💄 Styles

* JSX props 정렬 순서를 커스텀 그룹으로 개선 ([#134](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/134)) ([853dd14](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/853dd145a849531fd0d176d12fededc52ff30073))

### ♻️ Code Refactoring

* barrel export를 명시적 named export로 변경 ([#133](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/133)) ([e5601ee](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/e5601eed72f057818e655296122e9b7368d7cfbc))
* Tailwind CSS h-*, w-* 유틸리티를 size-*로 통합 ([#130](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/130)) ([4bfb07c](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/4bfb07c5d40ec8106a76a8547b9aea2887c86472))
* 디렉터리 구조 개선 ([#135](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/135)) ([e9d61aa](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/e9d61aa68dad77f3076689155aa03c50286bfb4d))

### 🔧 Miscellaneous Chores

* @next/bundle-analyzer 추가 ([#132](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/132)) ([11319c5](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/11319c5a2207103691aed66de2b206fa66f8a014))
* **commitizen:** commit 템플릿에 scope, description 항목 추가 ([#139](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/139)) ([5e4b6fb](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/5e4b6fb77c006a164474adfe1cf7599d586826b3))
* labeler에 breaking, release 옵션 추가 ([#131](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/131)) ([0d094f3](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/0d094f336ac4ca13f122e922678f389862408c07))
* Prettier 관련 scripts, lint-staged 설정 변경 ([#136](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/136)) ([a5056d7](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/a5056d770fdc24911008c93192941a33de27402d))
* releaserc 설정 변경 ([#138](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/138)) ([c4ef922](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/c4ef922501fcc0d9b0bfb01c8fa7edcaaec1ce0e))

## [1.0.15](https://github.com/JeongHwan-dev/jeonghwan-blog/compare/v1.0.14...v1.0.15) (2025-12-28)

### 🔧 Miscellaneous Chores

* semantic-release 호환성을 위한 Node.js 버전 설정 ([#127](https://github.com/JeongHwan-dev/jeonghwan-blog/issues/127)) ([a2d3b4e](https://github.com/JeongHwan-dev/jeonghwan-blog/commit/a2d3b4ebce0bc49f90e54bc582a052d27cfe1a19))

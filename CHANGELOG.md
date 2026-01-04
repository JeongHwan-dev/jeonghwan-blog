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

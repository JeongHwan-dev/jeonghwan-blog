---
'jeonghwan-blog': patch
---

perf(article): 글 목록 Notion 조회 결과를 1시간 캐시해 요청마다 Notion을 호출하지 않도록 개선

홈은 tag, sort 쿼리 때문에 요청마다 렌더링되는데 캐시가 없어 방문할 때마다 Notion API를 호출했어요.
getPublishedArticleList를 unstable_cache로 감싸 인자 조합별로 결과를 1시간 재사용해요.
홈 목록, /api/articles 무한 스크롤, 태그 필터, sitemap이 모두 이 캐시를 거쳐요.
Pre-Published 글이 프로덕션 캐시에 섞이지 않도록 환경 구분을 캐시 키에 포함해요.

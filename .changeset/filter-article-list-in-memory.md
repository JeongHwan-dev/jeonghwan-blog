---
'jeonghwan-blog': patch
---

perf(article): 태그 필터·정렬을 캐시된 전체 글 목록에서 처리해 조합마다 Notion을 호출하지 않도록 개선

글 목록 캐시가 tag, sort 조합마다 따로 생겨 처음 누르는 조합은 매번 Notion을 호출했어요.
전체 글 목록 하나만 1시간 캐시하고 필터, 정렬, 페이지 나누기는 메모리에서 처리해요.
nextCursor는 Notion 커서 대신 오프셋 문자열로 바뀌어요.

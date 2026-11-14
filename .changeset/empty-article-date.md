---
'jeonghwan-blog': patch
---

fix(article): 날짜가 비어 있는 글이 있으면 sitemap 빌드가 실패하던 문제 수정

Notion Date가 비어 있으면 빈 문자열을 반환해 sitemap의 undefined 체크를 통과하지 못하고
new Date("").toISOString()에서 RangeError가 발생했어요. 글 상세의 formatDate도 같은 값으로 실패해요.
비어 있는 날짜는 타입 선언대로 undefined를 반환해 모든 사용처의 기존 분기가 동작하게 해요.

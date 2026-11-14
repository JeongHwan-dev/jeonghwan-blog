---
'jeonghwan-blog': patch
---

fix(shared): 헤더의 GitHub·LinkedIn 아이콘이 잘려서 렌더링되던 문제 수정

SVGR의 SVGO preset-default가 viewBox를 제거해, 24px 기준 아이콘이
Button의 size-4(16px)로 줄어들 때 확대되지 않고 잘려 보였어요.
removeViewBox를 비활성화해 viewBox를 유지해요.

---
'jeonghwan-blog': patch
---

fix(article): 다크모드에서 Giscus 댓글이 light 테마로 첫 렌더링되던 문제 수정

theme 대신 resolvedTheme을 사용해 system 설정을 실제 테마로 해석하고,
클라이언트 마운트 후에만 Giscus를 렌더링해 첫 iframe이 올바른 테마로 로드되게 해요.
giscus 위젯은 iframe 로드 전의 테마 변경을 전달하지 않아 SSR 기본값(light)이 노출됐어요.

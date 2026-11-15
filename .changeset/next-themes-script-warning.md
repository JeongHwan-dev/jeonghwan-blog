---
'jeonghwan-blog': patch
---

fix(shared): next-themes 테마 스크립트로 인한 React script 태그 경고 제거

React 19는 클라이언트에서 렌더되는 script 태그에 경고를 띄워요.
테마 스크립트는 서버 HTML에서만 실행되면 되므로, 클라이언트에서는 type을 application/json으로 바꿔 경고를 없애요.

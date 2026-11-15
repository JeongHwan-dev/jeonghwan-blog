interface Talk {
  date: string;
  description: string;
  event: string;
  retrospectiveSlug?: string;
  title: string;
  videoId: string;
}

export const TALK_LIST: Talk[] = [
  {
    date: '2025-12-06',
    description: 'React 19의 새 기능들이 어떤 문제를 풀기 위해 등장했는지 살펴봐요.',
    event: 'TEO Conf 2025',
    title: 'React 19가 풀고자 한 문제들',
    videoId: '1743c72otzo',
  },
  {
    date: '2025-09-24',
    description: 'AI 에이전트를 동료로 삼아 일하는 프론트엔드 개발 워크플로를 소개해요.',
    event: 'LG SDC 2025',
    retrospectiveSlug: 'lg-sdc-2025',
    title: 'AI 동료를 얻은 프론트엔드 개발자의 Workflow',
    videoId: 'VNzEPbjGT80',
  },
  {
    date: '2024-01-20',
    description: 'PWA가 무엇이고 웹 경험을 어떻게 바꿔 가는지 이야기해요.',
    event: '엘리스트랙 2024 홈커밍데이',
    retrospectiveSlug: '2024-elice-track-homecoming-day',
    title: '진화하는 웹, PWA가 만들어가는 다음 웹 경험',
    videoId: 'yPCgYi3qVNg',
  },
];

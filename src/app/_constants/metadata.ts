import type { Metadata } from 'next';

import { PROFILE } from '@/constants';

const BLOG = {
  description:
    '웹 개발 지식과 실무 경험을 나누는 기술 블로그입니다. 개발 과정에서 얻은 인사이트와 최신 웹 기술 트렌드 등을 공유합니다.',
  title: `Jeonghwan's Blog`,
} as const;

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  authors: [
    {
      name: PROFILE.koreanName,
      url: PROFILE.linkedInUrl,
    },
  ],
  creator: PROFILE.koreanName,
  description: BLOG.description,
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  keywords: [
    '개발 블로그',
    '프론트엔드',
    '개발자',
    '웹 개발',
    'Tech Blog',
    'Frontend',
    'Developer',
    'Web Development',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  openGraph: {
    description: BLOG.description,
    images: [
      {
        alt: BLOG.title,
        height: 1024,
        url: '/images/img-default-og.png',
        width: 1536,
      },
    ],
    title: BLOG.title,
    type: 'website',
    url: '/',
  },
  publisher: PROFILE.koreanName,
  title: {
    default: BLOG.title,
    template: `%s | ${BLOG.title}`,
  },
};

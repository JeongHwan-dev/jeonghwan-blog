import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';

import localFont from 'next/font/local';

import { Footer, Header, ScrollFloatingActionButtonGroup } from '@/components';
import { PROFILE } from '@/constants';

import { Providers } from './providers';

interface RootLayoutProps {
  children: ReactNode;
}

const BLOG_TITLE = `Jeonghwan's Blog`;

const pretendard = localFont({
  display: 'swap',
  src: '../../public/fonts/pretendard-variable.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
});

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
  description:
    '웹 개발 지식과 실무 경험을 나누는 테크 블로그입니다. 개발 과정에서 얻은 인사이트와 최신 웹 기술 트렌드 등을 공유합니다.',
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
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
  publisher: PROFILE.koreanName,
  title: {
    default: BLOG_TITLE,
    template: `%s | ${BLOG_TITLE}`,
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link crossOrigin="anonymous" href="https://cdn.jsdelivr.net" rel="preconnect" />
        <link
          href="https://cdn.jsdelivr.net/gh/toss/tossface/dist/tossface.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className={`${pretendard.variable} antialiased`}>
        <Providers>
          <Header />
          <main className="container flex min-h-[calc(100vh-var(--header-height)-var(--footer-height))] flex-col py-7 md:py-8">
            {children}
          </main>
          <Footer />
          <ScrollFloatingActionButtonGroup className="fixed right-6 bottom-6 z-20 xl:right-[calc((100vw-1280px)/2+24px)]" />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import localFont from 'next/font/local';

import './globals.css';

import { Footer, Header } from '@/components';

import { Providers } from './providers';

interface RootLayoutProps {
  children: ReactNode;
}

const pretendard = localFont({
  display: 'swap',
  src: '../../public/fonts/pretendard-variable.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
});

export const metadata: Metadata = {
  description:
    '웹 개발 지식과 실무 경험을 나누는 테크 블로그입니다. 개발 과정에서 얻은 인사이트와 최신 웹 기술 트렌드 등을 공유합니다.',
  title: `Jeonghwan's Blog`,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
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
          <main className="container flex min-h-[calc(100vh-var(--header-height)-var(--footer-height))] flex-col py-7 lg:py-8">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import localFont from 'next/font/local';

import './globals.css';

import { Header } from '@/components';

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
      <body className={`${pretendard.variable} antialiased`}>
        <Header />
        <main className="container flex min-h-screen flex-col border-x-1 border-dashed">
          {children}
        </main>
      </body>
    </html>
  );
}

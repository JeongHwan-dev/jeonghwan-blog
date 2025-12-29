import type { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';

import { Footer, Header, ScrollFloatingActionButtonGroup } from '@/shared/components';
import { metadata } from '@/shared/constants';

import { Providers } from './providers';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

const pretendard = localFont({
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  src: '../../public/fonts/pretendard-variable.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
});

export { metadata };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link href="https://cdn.jsdelivr.net" rel="preconnect" crossOrigin="anonymous" />
        <link
          href="https://cdn.jsdelivr.net/gh/toss/tossface/dist/tossface.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className={`${pretendard.className} ${pretendard.variable} antialiased`}>
        <Providers>
          <Header />
          <main className="container flex min-h-[calc(100vh-var(--header-height)-var(--footer-height))] flex-col py-7 md:py-8">
            {children}
          </main>
          <Footer />
          <ScrollFloatingActionButtonGroup className="fixed right-6 bottom-6 z-20 xl:right-[calc((100vw-1280px)/2+24px)]" />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

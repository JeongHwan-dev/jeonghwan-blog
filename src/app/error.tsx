'use client';

import type { Metadata } from 'next';

import { RotateCcw } from 'lucide-react';

import { Button } from '@/shared/components';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: VoidFunction;
}

const TITLE = '오류가 발생했어요';

const DESCRIPTION = '잠시 후 다시 시도해 주세요';

export const metadata: Metadata = {
  description: DESCRIPTION,
  robots: {
    follow: false,
    index: false,
  },
  title: TITLE,
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="h-main-full flex flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center md:gap-3">
          <div className="tossface text-muted-foreground text-6xl font-bold md:text-7xl">
            🚫 500
          </div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{TITLE}</h1>
          <p className="text-muted-foreground md:text-lg">{DESCRIPTION}</p>
        </div>
        <Button aria-label="페이지 다시 로드하기" onClick={reset}>
          <RotateCcw />
          다시 시도하기
        </Button>
      </div>
    </div>
  );
}

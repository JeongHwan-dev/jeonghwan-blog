import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components';

export default function ArticleNotFoundPage() {
  return (
    <div className="h-main-full tossface flex flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center md:gap-3">
          <div className="text-muted-foreground text-6xl font-bold md:text-7xl">⚠️ 404</div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            페이지를 찾지 못했어요
          </h1>
          <p className="text-muted-foreground md:text-lg">페이지 주소가 정확한지 확인해 주세요</p>
        </div>
        <Button asChild>
          <Link href="/">
            <ArrowLeft />
            홈으로 가기
          </Link>
        </Button>
      </div>
    </div>
  );
}

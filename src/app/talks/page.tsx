import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { YouTubePlayer } from '@/domains/article/components';
import { TALK_LIST } from '@/domains/author/constants';
import { Badge } from '@/shared/components';
import { PROFILE } from '@/shared/constants';
import { cn, formatDate } from '@/shared/utils';

export const metadata: Metadata = {
  alternates: {
    canonical: '/talks',
  },
  description: `${PROFILE.koreanName}의 컨퍼런스 발표 영상을 모았어요.`,
  title: 'Talks',
};

export default function TalksPage() {
  return (
    <div className="max-w-article mx-auto w-full">
      <h1 className="motion-safe:animate-fade-in mb-10 text-3xl font-bold tracking-tight md:text-4xl">
        발표
      </h1>
      <ul className="divide-y">
        {TALK_LIST.map(({ date, description, event, retrospectiveSlug, title, videoId }, index) => (
          <li
            key={videoId}
            className={cn(
              'flex flex-col gap-4 py-6 first:pt-0 md:gap-5 md:py-8',
              index === 0 ? 'motion-safe:animate-fade-in' : 'reveal-on-scroll',
            )}
          >
            <YouTubePlayer videoId={videoId} className="my-0 rounded-xl" />
            <div className="space-y-2">
              <Badge>{event}</Badge>
              <h2 className="text-xl font-bold tracking-tight break-keep md:text-2xl">{title}</h2>
              <p className="text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
              <time dateTime={date} className="text-muted-foreground block text-sm">
                {formatDate(date)}
              </time>
              {retrospectiveSlug && (
                <Link
                  href={`/articles/${retrospectiveSlug}`}
                  className="text-link inline-flex items-center gap-1 pt-1 text-sm font-medium hover:underline"
                >
                  발표 회고 읽기
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

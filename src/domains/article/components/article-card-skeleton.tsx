import type { ComponentProps } from 'react';

import { Skeleton, SkeletonText } from '@/shared/components';
import { ArticleCardLayout } from './article-card-layout';

type ArticleCardSkeletonProps = ComponentProps<'div'>;

function ArticleCardSkeleton(props: ArticleCardSkeletonProps) {
  return (
    <ArticleCardLayout thumbnail={<Skeleton className="aspect-video rounded-lg" />} {...props}>
      <Skeleton className="h-5.5 w-14 rounded-sm" />
      <div className="text-xl md:text-2xl">
        <SkeletonText className="md:w-1/2" />
        <SkeletonText className="w-1/2 md:hidden" />
      </div>
      <div className="leading-relaxed">
        <SkeletonText className="md:w-4/5" />
        <SkeletonText className="w-2/3 md:hidden" />
      </div>
      <SkeletonText className="w-40 text-sm" />
    </ArticleCardLayout>
  );
}

export { ArticleCardSkeleton };

import type { ComponentProps } from 'react';

import { Card, Skeleton } from '@/components';
import { cn } from '@/utils';

type ArticleCardSkeletonProps = ComponentProps<'div'>;

function ArticleCardSkeleton({ className, ...rest }: ArticleCardSkeletonProps) {
  return (
    <Card
      className={cn(
        'bg-card/50 border-border w-full gap-0 overflow-hidden border p-0 shadow-none',
        className,
      )}
      {...rest}
    >
      <div className="aspect-[16/9]">
        <Skeleton className="size-full rounded-none" />
      </div>
      <div className="flex flex-grow flex-col justify-between p-4 md:p-5">
        <div>
          <Skeleton className="mb-3 h-5.5 w-18 md:mb-4" />
          <Skeleton className="mb-2 h-7 w-full" />
          <Skeleton className="h-5.5 w-full md:h-6.5" />
        </div>
        <Skeleton className="mt-3 h-5 w-30 md:mt-4" />
      </div>
    </Card>
  );
}

export { ArticleCardSkeleton };

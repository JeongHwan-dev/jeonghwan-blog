import type * as React from 'react';

import { cn } from '@/shared/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

function SkeletonText({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex h-lh items-center', className)} {...props}>
      <Skeleton className="h-[0.7em] w-full" />
    </div>
  );
}

export { Skeleton, SkeletonText };

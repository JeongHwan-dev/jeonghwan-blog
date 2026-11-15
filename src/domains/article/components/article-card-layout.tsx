import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/shared/utils';

interface ArticleCardLayoutProps extends ComponentProps<'div'> {
  thumbnail?: ReactNode;
}

function ArticleCardLayout({ children, className, thumbnail, ...rest }: ArticleCardLayoutProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-4 py-6 md:flex-row md:items-center md:gap-8 md:py-8',
        className,
      )}
      {...rest}
    >
      <div className="min-w-0 space-y-2 md:flex-1">{children}</div>
      {thumbnail && (
        <div className="order-first w-full shrink-0 md:order-none md:w-[217px]">{thumbnail}</div>
      )}
    </div>
  );
}

export { ArticleCardLayout };

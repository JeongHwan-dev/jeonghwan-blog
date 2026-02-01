import type { ComponentProps } from 'react';

import { Badge } from '@/shared/components';
import { cn } from '@/shared/utils';

interface ArticleTagBadgeProps extends ComponentProps<'span'> {
  tag: string;
}

function ArticleTagBadge({ className, tag, ...rest }: ArticleTagBadgeProps) {
  return (
    <Badge className={cn('bg-primary/10 font-medium text-primary', className)} {...rest}>
      {`#${tag}`}
    </Badge>
  );
}

export { ArticleTagBadge };

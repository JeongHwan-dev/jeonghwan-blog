import type { ComponentProps } from 'react';

import { Badge } from '@/shared/components';

interface ArticleTagBadgeProps extends ComponentProps<'span'> {
  tag: string;
}

function ArticleTagBadge({ className, tag, ...rest }: ArticleTagBadgeProps) {
  return (
    <Badge variant="secondary" className={className} {...rest}>
      {`#${tag}`}
    </Badge>
  );
}

export { ArticleTagBadge };

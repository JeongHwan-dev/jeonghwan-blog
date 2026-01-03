import { Repeat } from '@/shared/components';

import { ArticleCardSkeleton } from './article-card-skeleton';

function ArticleListSkeleton() {
  return (
    <Repeat as="ul" times={6} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <li>
        <ArticleCardSkeleton />
      </li>
    </Repeat>
  );
}

export { ArticleListSkeleton };

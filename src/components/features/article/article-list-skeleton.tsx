import { renderTimes } from '@/lib/utils';

import { ArticleCardSkeleton } from './article-card-skeleton';

const ARTICLE_CARD_SKELETON_COUNT = 6;

function ArticleListSkeleton() {
  return (
    <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {renderTimes(ARTICLE_CARD_SKELETON_COUNT, (index) => (
        <li key={`article-card-skeleton-${index}`}>
          <ArticleCardSkeleton />
        </li>
      ))}
    </ul>
  );
}

export { ArticleListSkeleton };

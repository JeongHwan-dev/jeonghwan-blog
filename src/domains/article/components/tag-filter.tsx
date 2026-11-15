import { Suspense } from 'react';

import { getArticleTagFilterList } from '@/domains/article/services';
import { TagFilterList } from './tag-filter-list';
import { TagFilterListSkeleton } from './tag-filter-list-skeleton';

interface TagFilterProps {
  className?: string;
  selectedTag: string;
}

function TagFilter({ className, selectedTag }: TagFilterProps) {
  const articleTagFilterList = getArticleTagFilterList();

  return (
    <nav aria-label="태그 목록" className={className}>
      <Suspense fallback={<TagFilterListSkeleton />}>
        <TagFilterList selectedTag={selectedTag} tagFilterList={articleTagFilterList} />
      </Suspense>
    </nav>
  );
}

export { TagFilter };

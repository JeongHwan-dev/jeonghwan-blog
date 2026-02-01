import { Suspense } from 'react';

import { getArticleTagFilterList } from '@/domains/article/services';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components';
import { TagFilterList } from './tag-filter-list';
import { TagFilterListSkeleton } from './tag-filter-list-skeleton';

interface TagFilterCardProps {
  selectedTag: string;
}

const TAG_FILTER_CARD_TITLE = '태그 목록';

function TagFilterCard({ selectedTag }: TagFilterCardProps) {
  const articleTagFilterList = getArticleTagFilterList();

  return (
    <Card className="gap-4 px-2 shadow-none">
      <CardHeader className="flex px-3 py-2">
        <CardTitle>{TAG_FILTER_CARD_TITLE}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <nav aria-label={TAG_FILTER_CARD_TITLE}>
          <Suspense fallback={<TagFilterListSkeleton />}>
            <TagFilterList selectedTag={selectedTag} tagFilterList={articleTagFilterList} />
          </Suspense>
        </nav>
      </CardContent>
    </Card>
  );
}

export { TagFilterCard };

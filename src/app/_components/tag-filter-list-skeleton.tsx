import { Skeleton } from '@/components';
import { renderTimes } from '@/lib/utils';

const TAG_FILTER_SKELETON_COUNT = 5;

function TagFilterListSkeleton() {
  return (
    <ul className="flex flex-col gap-3">
      {renderTimes(TAG_FILTER_SKELETON_COUNT, (index) => (
        <li key={`tag-filter-skeleton-${index}`}>
          <Skeleton className="h-9 w-full" />
        </li>
      ))}
    </ul>
  );
}

export { TagFilterListSkeleton };

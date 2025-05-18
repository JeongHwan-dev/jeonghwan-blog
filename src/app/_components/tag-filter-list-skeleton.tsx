import { Skeleton } from '@/components';

function TagFilterListSkeleton() {
  const skeletonList = Array.from({ length: 5 }, (_, index) => index);

  return (
    <ul className="flex flex-col gap-3">
      {skeletonList.map((id) => (
        <li key={id}>
          <Skeleton className="h-9 w-full" />
        </li>
      ))}
    </ul>
  );
}

export { TagFilterListSkeleton };

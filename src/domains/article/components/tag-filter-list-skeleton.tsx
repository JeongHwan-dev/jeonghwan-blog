import { Skeleton } from '@/shared/components';

function TagFilterListSkeleton() {
  return (
    <ul className="flex flex-col gap-3">
      {Array.from({ length: 8 }, (_, index) => (
        <li key={index}>
          <Skeleton className="h-9 w-full" />
        </li>
      ))}
    </ul>
  );
}

export { TagFilterListSkeleton };

import { Repeat, Skeleton } from '@/shared/components';

function TagFilterListSkeleton() {
  return (
    <Repeat as="ul" times={8} className="flex flex-col gap-3">
      <li>
        <Skeleton className="h-9 w-full" />
      </li>
    </Repeat>
  );
}

export { TagFilterListSkeleton };

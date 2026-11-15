import { Skeleton } from '@/shared/components';
import { cn } from '@/shared/utils';

const CHIP_WIDTH_LIST = [
  'w-18',
  'w-26',
  'w-15',
  'w-31',
  'w-31',
  'w-29',
  'w-18',
  'w-27',
  'w-34',
  'w-18',
];

const TAG_FILTER_RAIL_CLASS_NAME =
  'flex gap-2 pr-6 [mask-image:linear-gradient(to_right,black_calc(100%-1.5rem),transparent)]';

function TagFilterListSkeleton() {
  return (
    <ul className={cn(TAG_FILTER_RAIL_CLASS_NAME, 'overflow-hidden')}>
      {Array.from(CHIP_WIDTH_LIST, (width, index) => (
        <li key={index} className="shrink-0">
          <Skeleton className={cn('h-9 rounded-full', width)} />
        </li>
      ))}
    </ul>
  );
}

export { TAG_FILTER_RAIL_CLASS_NAME, TagFilterListSkeleton };
